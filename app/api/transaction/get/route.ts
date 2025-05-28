import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../models/Transaction";
import { db } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;

  try {
    await db()
    console.log("hola",userId)
    const transactions = await Transaction.find({
      userId: userId
    });
    console.log(transactions)
    return NextResponse.json({
      transactions,
    });
  } catch (error: any) {
    return NextResponse.json({
      error,
    });
  }
}
