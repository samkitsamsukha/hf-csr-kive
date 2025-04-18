import mongoose from "mongoose";
import { Admin } from "../models/adminModel.js";
import dotenv from "dotenv";

dotenv.config();

export const initializeAdmin = async () => {
	try {
		const adminData = {
			name: "GreenEarth Foundation",
			logoUrl: "https://example.com/logo.png",
			vision: "A greener, cleaner planet for future generations.",
			mission: "To promote sustainability and empower communities.",
			objectives: [
				"Tree plantation drives",
				"Clean water accessibility",
				"Empowering rural youth through education"
			],
			csrPhilsophy: "CSR is not charity, but a responsibility to give back to society.",
			adminName: "Aarav Mehta",
			adminEmail: "aarav@greenearth.org"
		};

		const existingAdmin = await Admin.findOne({ adminEmail: adminData.adminEmail });

		if (existingAdmin) {
			console.log("Admin already exists.");
		} else {
			await Admin.create(adminData);
			console.log("Admin initialized successfully.");
		}
	} catch (err) {
		console.error("DB initialization failed:", err);
		process.exit(1);
	}
};