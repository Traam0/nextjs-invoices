/** @format */

import mongoose, { Schema, models, model } from "mongoose";

// mongoose.deleteModel("Invoice");
const InvoiceSchema = new Schema(
	{
		issuer: { type: String, required: true },
		client_id: { type: String, required: true },
		client_name: { type: String, required: true },
		client_type: { type: String, required: true },
		client_ice: { type: String },
		client_address: { type: String },
		client_phone: { type: String },
		client_website: { type: String },
		TVA: { type: Number, default: 0 },
		items: { type: Array, required: true },
		total: { type: Number, required: true },
		totalTTC: {
			type: Number,
			required: true,
			default: function () {
				const _t = this as any;
				return Number(_t.total + _t.total * _t.TVA).toFixed(2);
			},
		},
		avance: { type: Number, required: true, default: 0 },
		rest: {
			type: Number,
			required: false,
			default: function () {
				const _t = this as any;
				return Number(_t.totalTTC - _t.avance).toFixed(2);
			},
		},
		payed: { type: Boolean, required: false },
	},
	{
		timestamps: true,
	}
);

InvoiceSchema.pre("save", function () {
	this.payed =
		this.totalTTC - this.avance === 0 || this.rest === 0 ? true : false;
});

export default models.Invoice || model("Invoice", InvoiceSchema);
