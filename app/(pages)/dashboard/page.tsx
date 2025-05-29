"use client";
import React, { useEffect, useState } from "react";
import DashboardRecap from "./(components)/DashboardRecap";
import { useSession } from "next-auth/react";
import { getUserTransactions } from "@/app/services/getUserTransactions";
import NewTransactionButton from "./(components)/NewTransactionButton";
import TransactionsRecap from "./(components)/TransactionsRecap";
import TransactionsGraph from "./(components)/TransactionGraph";

const page = () => {
  const { data: session } = useSession();
  // Type assertion simplified
  const userId = (session?.user as { id?: string })?.id;

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Buscamos las transacciones del usuario
  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      try {
        const data = await getUserTransactions(userId);
        setTransactions(data ?? []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [userId]);

  if (!userId) return <p>Cargando sesión...</p>;

  return (
    <section className="h-full flex flex-col p-2 space-y-4 justify-between">
      <div className="w-full flex justify-between">
        <h2 className="sm:text-3xl">
          Hola {(session?.user as { username?: string; name?: string })?.username ?? session?.user?.name ?? "Cargando"}
        </h2>
        {/* Nueva operación */}
        <NewTransactionButton />
      </div>

      <div className="flex justify-between items-center">
        {/* Recap */}
        <DashboardRecap userId={userId} transactions={transactions} />

        {/* TransactionsRecap */}
        <TransactionsRecap userId={userId} transactions={transactions} />
      </div>

      {/* TransactionsGraph */}
      <TransactionsGraph userId={userId} transactions={transactions} />
    </section>
  );
};

export default page;
