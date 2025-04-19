import { Admin } from "../models/adminModel.js";
import { Employee } from "../models/employeeModel.js";

// CREATE EVENT BY ADMIN
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

// FETCH EVENTS BY ADMIN
export const getAllEvents = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    res.json(admin.events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// FETCH EVENT BY ID FOR ADMINS
export const getEventById = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    const event = admin.events.id(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN REPORT ADDITION
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

// FETCH ALL EMPLOYEES
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// FETCH EMPLOYEE BY ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE EMPLOYEE
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

export const getSubmissionById = async (req, res) => {
  try {
      const { submissionId } = req.params;

      // Fetch the admin that contains the events with submissions
      const admin = await Admin.findOne({ 'events.submissions._id': submissionId });
      
      if (!admin) {
          return res.status(404).json({ message: "Admin or Submission not found" });
      }

      // Loop through the events and find the submission by ID
      let submission = null;
      for (const event of admin.events) {
          submission = event.submissions.id(submissionId);
          if (submission) {
              break;  // Exit loop once we find the submission
          }
      }

      if (!submission) {
          return res.status(404).json({ message: "Submission not found" });
      }

      res.status(200).json(submission);  // Respond with the found submission
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}