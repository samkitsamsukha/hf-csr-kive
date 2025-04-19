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

const router = express.Router();

// Other routes
router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.post("/events/:id/submit", addEventReport);
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/create/employee", createEmployee);
router.get("/submission/:submissionId", getSubmissionById);
router.get("/", getAdmin);


export default router;