import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../models/Transaction";
import { db } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, transaction } = body;

  try {
    await db()
    const newTransaction = new Transaction({
      user: userId,
      ...transaction,
    });

    await newTransaction.save();
    return NextResponse.json({
      newTransaction,
    });
  } catch (error: any) {
    return NextResponse.json({
      error,
    });
  }
}
