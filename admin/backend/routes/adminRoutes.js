import express from "express";
import {
	createEvent,
	getAllEvents,
	getEventById,
	addEventReport,
	getAllEmployees,
	getEmployeeById,
	createEmployee
} from "../controllers/adminControllers.js";

const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.post("/events/:id/submit", addEventReport);
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/create/employee", createEmployee);

export default router;
