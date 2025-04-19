import express from "express";
import {
	getAdmin,
	createEvent,
	getAllEvents,
	getEventById,
	addEventReport,
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	getSubmissionById
} from "../controllers/adminControllers.js";

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Temp directory setup
const tmpDir = path.join(__dirname, '..', 'tmp');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

// 🔥 Change this to your actual running Flask ngrok URL
const FLASK_NGROK_URL = "https://f087-115-243-167-82.ngrok-free.app/generate-report";

// Other routes
router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.post("/events/:id/submit", addEventReport);
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/create/employee", createEmployee);
router.get("/submission/:submissionId", getSubmissionById);
router.get("/", getAdmin);  // Still used internally here

// 🧠 Unified GET route that auto-fetches, POSTs to Flask, and returns PDF
router.get("/generate-report", async (req, res) => {
	try {
		// Step 1: Get JSON data from own backend
		const adminData = await getAdmin();

		// Step 2: Post JSON to Flask server
		const response = await axios.post(FLASK_NGROK_URL, adminData, {
			responseType: 'arraybuffer', // We expect binary (PDF)
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/pdf'
			}
		});

		// Step 3: Save the PDF temporarily
		const pdfFileName = `report_${uuidv4()}.pdf`;
		const pdfPath = path.join(tmpDir, pdfFileName);
		fs.writeFileSync(pdfPath, response.data);

		// Step 4: Send the PDF to the client
		res.download(pdfPath, 'report.pdf', () => {
			fs.unlinkSync(pdfPath); // Clean up after download
		});

	} catch (error) {
		console.error("Error in /generate-report:", error.message || error);
		if (error.response && error.response.data) {
			console.error("Flask response:", error.response.data.toString());
		}
		res.status(500).send("Failed to generate PDF report");
	}
});

export default router;