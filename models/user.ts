/** @format */

import mongoose, { Schema, models, model } from "mongoose";

// mongoose.deleteModel("User")
const UserSchema = new Schema(
	{
		first_name: {
			type: String,
			lowercase: true,
			required: true,
		},
		last_name: {
			type: String,
			lowercase: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: true,
		},
		verified: {
			type: Boolean,
			required: true,
			default: false,
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		gender: {
			type: String,
			required: true,
		},

		role: {
			type: Number,
			required: true,
			default: 513,
		},

	},
	{
		timestamps: true,
	}
);

export default models.User || model("User", UserSchema);
