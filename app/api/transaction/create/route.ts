import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../models/Transaction";
import { db } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, transaction } = body;

  try {
    console.log("Lo que llega", userId, transaction)
    await db()
const newTransaction = new Transaction({
  userId,
  amount: transaction.amount,
  isExpense: transaction.isExpense,
  desc: transaction.desc,
  category: transaction.category,
  notes: transaction.notes
});
    console.log("la nueva", newTransaction)

    const saved = await newTransaction.save();
    console.log(saved)
    return NextResponse.json({
      newTransaction,
    });
  } catch (error: any) {
    return NextResponse.json({
      error,
    });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { transactionId, updates } = body;

  try {
    await db();
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      updates,
      { new: true }
    );

    if (!updatedTransaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ updatedTransaction });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
