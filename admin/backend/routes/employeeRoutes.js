import express from "express";
import {
	submitEventReport,
	getAllEvents,
	getEventById,
	updateCoins,
} from "../controllers/employeeControllers.js";

const router = express.Router();

router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.post("/events/:id/submit", submitEventReport);
router.patch("/update-coins/:id", updateCoins);

export default router;
