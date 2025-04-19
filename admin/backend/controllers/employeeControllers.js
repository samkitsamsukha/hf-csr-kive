import { Admin } from "../models/adminModel.js";
import { Employee } from "../models/employeeModel.js";

export const submitEventReport = async (req, res) => {
	try {
		const { employeeId, employeeName, report, picture, eventId } = req.body;

		// Find employee
		const employee = await Employee.findById(employeeId);
		if (!employee) {
			return res.status(404).json({ error: "Employee not found" });
		}

		// Find admin with the event
		const admin = await Admin.findOne({ "events._id": eventId });
		if (!admin) {
			return res.status(404).json({ error: "Event not found" });
		}

		// Find the specific event inside admin
		const event = admin.events.id(eventId);
		if (!event) {
			return res.status(404).json({ error: "Event not found in admin" });
		}

		// Push report to event.submissions
		event.submissions.push({
			employeeId,
			employeeName,
			report,
			picture,
		});

		// Add event to employee.events if not already there
		const alreadyParticipated = employee.events.some(
			(e) =>
				e.eventName === event.eventName &&
				e.eventDate.getTime() === event.eventDate.getTime()
		);

		if (!alreadyParticipated) {
			employee.events.push({
				eventName: event.eventName,
				eventDate: event.eventDate,
				eventDescription: event.eventDescription,
				eventImage: event.eventImage,
				eventLocation: event.eventLocation,
				eventCoins: event.eventCoins,
				eventCategory: event.eventCategory,
			});
		}

		// Save both
		await admin.save();
		await employee.save();

		res.json({ message: "Report submitted successfully" });
	} catch (err) {
		console.error(err);
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
