import mongoose from "mongoose";
import { Admin } from "../models/adminModel.js";
import dotenv from "dotenv";

dotenv.config();

export const initializeAdmin = async () => {
	try {
		const adminData = {
			name: "Silverman Sachs",
			logoUrl: "https://github.com/samkitsamsukha/csr-kive/blob/main/assets/logo.png",
			vision: "At Silverman Sachs, we envision a future where financial empowerment and technological innovation go hand in hand. Our goal is to democratize access to sophisticated financial tools and insights, enabling individuals and businesses worldwide to make smarter, data-driven decisions that drive growth, security, and long-term value.",
			mission: "Our mission is to redefine the financial landscape through cutting-edge technology, ethical practices, and client-centric solutions. We strive to deliver seamless digital platforms, intelligent investment strategies, and fintech services that adapt to the evolving needs of our global clientele while fostering transparency, inclusion, and sustainability.",
			objectives: [
				"Develop and deploy next-gen financial technologies, including AI-powered analytics, blockchain integration, and secure cloud-based solutions.",
				"Provide accessible, user-friendly tools and expert guidance to help individuals and organizations optimize financial performance.",
				"Uphold the highest standards of corporate governance, data privacy, and ethical investment to build lasting trust and positive societal impact."
			],
			csrPhilsophy: "At Silverman Sachs, we believe that true success extends beyond financial performance — it encompasses our responsibility to people, communities, and the planet. Our CSR philosophy is rooted in the idea that innovation and impact must go hand in hand. We are committed to creating sustainable value by integrating ethical practices, environmental stewardship, and social equity into every aspect of our business. Whether through financial literacy initiatives, tech-driven sustainability solutions, or inclusive workplace culture, we aim to be a catalyst for positive change. Our approach to CSR is not a checkbox — it is a core pillar of our identity, guiding how we operate, whom we partner with, and the legacy we strive to leave behind.",
			adminName: "Thomas Augustine",
			adminEmail: "admin@silvermansachs.com"
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