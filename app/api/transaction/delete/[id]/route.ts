import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../../models/Transaction";
import { db } from "@/app/lib/db";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const transactionId = params?.id;
  if (!transactionId) {
    return NextResponse.json({ error: "No transaction id provided" }, { status: 400 });
  }
  try {
    await db();
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: `${transaction.id} eliminada con éxito`,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || error,
    }, { status: 500 });
  }
}
