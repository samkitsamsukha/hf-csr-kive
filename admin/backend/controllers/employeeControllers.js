import { Admin } from "../models/adminModel.js";
import { Employee } from "../models/employeeModel.js";

export const submitEventReport = async (req, res) => {
	try {
		const { employeeId, employeeName, report, picture } = req.body;
		const admin = await Admin.findOne();
		const event = admin.events.id(req.params.id);
		event.submissions.push({ employeeId, employeeName, report, picture });
		await admin.save();
		res.json({ message: "Report submitted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getAllEvents = async (req, res) => {
	try {
		const admin = await Admin.findOne();
		res.json(admin.events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getEventById = async (req, res) => {
	try {
		const admin = await Admin.findOne();
		const event = admin.events.id(req.params.id);
		res.json(event);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const updateCoins = async (req, res) => {
	try {
		const { coins } = req.body;
		const employee = await Employee.findById(req.params.id);
		if (!employee) return res.status(404).json({ error: "Employee not found" });
		employee.totalCoins = (employee.totalCoins || 0) + coins;
		await employee.save();
		res.json({ message: "Coins updated successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
