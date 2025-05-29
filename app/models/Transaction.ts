import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shownName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  }
}, { _id: false });

const transactionSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  isExpense: {
    type: Boolean,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  category: {
    type: categorySchema,
    required: true
  },
  receipt: {
    type: String,
    required: false
  },
  notes: [{
    type: String
  }]
}, { timestamps: true });

const Transaction = models.Transaction || model("Transaction", transactionSchema);
export default Transaction;