import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
	employeeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		required: true,
	},
	employeeName: {
		type: String,
		required: true,
	},
	report: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		required: true,
	},
});

const eventSchema = new mongoose.Schema({
	eventName: {
		type: String,
		required: true,
	},
	eventDate: {
		type: Date,
		required: true,
	},
	eventDescription: {
		type: String,
		required: true,
	},
	eventImage: {
		type: String,
		required: true,
	},
	eventLocation: {
		type: String,
		required: true,
	},
	eventCoins: {
		type: Number,
		required: true,
	},
	eventCategory: {
		type: String,
		enum: [
			"education",
			"healthcare",
			"vocational_training",
			"environment",
			"women_empowerment",
			"rural_development",
			"support_differently_abled",
			"disaster_relief",
			"art_culture_heritage",
			"social_welfare",
		],
		required: true,
	},
	eventSummary: {
		type: String,
		required: true,
	},
	submissions: [submissionSchema],
});

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	logoUrl: {
		type: String,
		required: true,
	},
	vision: {
		type: String,
		required: true,
	},
	mission: {
		type: String,
		required: true,
	},
	objectives: {
		type: [String],
		required: true,
	},
	csrPhilsophy: {
		type: String,
		required: true,
	},
	adminName: {
		type: String,
		required: true,
	},
	adminEmail: {
		type: String,
		required: true,
	},
	events: [eventSchema],
});

export const Admin =
	mongoose.models.Admin || mongoose.model("Admin", adminSchema);
