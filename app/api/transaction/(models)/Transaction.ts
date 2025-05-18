import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  }
}, { _id: false });

const transactionSchema = new Schema({
  user: {
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
    type: Schema.Types.Mixed
  },
  notes: [{
    type: String
  }]
}, { timestamps: true });

const Transaction = models.Transaction || model("Transaction", transactionSchema);
export default Transaction;