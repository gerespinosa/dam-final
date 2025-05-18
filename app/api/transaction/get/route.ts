import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../models/Transaction";
import { db } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;

  try {
    await db()
    const transactions = await Transaction.find({
      user: userId
    });
    return NextResponse.json({
      transactions,
    });
  } catch (error: any) {
    return NextResponse.json({
      error,
    });
  }
}
