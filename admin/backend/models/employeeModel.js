import mongoose from "mongoose";

const employeeEventSchema = new mongoose.Schema({
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
			"elderly_support",
			"support_differently_abled",
			"disaster_relief",
			"animal_welfare",
		],
		required: true,
	},
	submissions: [
		{
			// Change this from 'submission' to 'submissions' and make it an array.
			eventReport: {
				type: String,
			},
			picture: {
				type: String,
			},
		},
	],
});

const employeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	organisation: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	events: [employeeEventSchema],
	categories: {
		type: [String],
	},
});

export const Employee =
	mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
