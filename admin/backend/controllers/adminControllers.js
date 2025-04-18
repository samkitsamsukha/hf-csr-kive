import { Admin } from "../models/adminModel.js";
import { Employee } from "../models/employeeModel.js";

export const createEvent = async (req, res) => {
  try {
    const { adminId, eventData } = req.body;
    const admin = await Admin.findById(adminId);
    admin.events.push(eventData);
    await admin.save();
    res.status(201).json({ message: "Event created successfully" });
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

export const addEventReport = async (req, res) => {
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

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEmployee = async(req, res) => {
    try {
        const { name, organisation, email } = req.body;
        const newEmployee = new Employee({ name, organisation, email });
        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}