/** @format */

import mongoose, { Schema, models, model } from "mongoose";

// mongoose.deleteModel("Client")

const ClientSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		type: {
			type: String,
			required: true,
		},
		ICE: {
			type: String,
			required: false,
			unique: false,
		},
		enterprise_name: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: false,
			unique: false,
		},
		phone: {
			type: String,
			required: false,
			unique: false,
		},
		address: {
			type: String,
			required: false,
			unique: false,
		},
		website: {
			type: String,
			required: false,
			unique: true,
		},
		holder_id: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

export default models.Client || model("Client", ClientSchema);
