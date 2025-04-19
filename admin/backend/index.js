import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./utils/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import { initializeAdmin } from "./utils/initAdmin.js";
import axios from "axios";

const app = express();
dotenv.config();

connectDb();
app.use(express.json());

app.use(
	cors({
		origin: "*",
	})
);

app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

app.get("/send-report", async (req, res) => {
	try {
		// Step 1: Fetch admin data from your local Node.js API
		const localResponse = await axios.get("http://localhost:4000/api/admin");
		const adminData = localResponse.data;

		// Step 2: Send that data to the Flask app
		const flaskUrl = "http://cf6f-117-236-190-193.ngrok-free.app";
		const flaskResponse = await axios.post(flaskUrl, adminData);

		// Step 3: Return the response from the Flask app to the client
		return res.status(200).json({
			message: "Report sent successfully to Python app",
			response: flaskResponse.data,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Error during report generation",
			error: error.message,
		});
	}
});

initializeAdmin();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
