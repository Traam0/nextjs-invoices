/** @format */

import mongoose, { Schema, models, model } from "mongoose";

// mongoose.deleteModel("User")
const ExpenseSchema = new Schema(
  {
    owner_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    cost: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default models.Expense || model("Expense", ExpenseSchema);
