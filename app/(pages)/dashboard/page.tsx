"use client";
import React, { useEffect, useState } from "react";
import DashboardRecap from "./(components)/DashboardRecap";
import { useSession } from "next-auth/react";
import { getUserTransactions } from "@/app/services/getUserTransactions";
import NewTransactionButton from "./(components)/NewTransactionButton";

const page = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Buscamos las transacciones del usuario
  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      try {
        const data: Transaction[] = await getUserTransactions(userId);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [userId]);

  if (!userId) return <p>Cargando sesión...</p>;

  return (
    <section className="flex flex-col p-2 space-y-4">
      <div className="w-full flex justify-between">
        <h2 className="sm:text-3xl">
          Hola {session?.user?.username ?? session?.user?.name ?? "Cargando"}
        </h2>
        {/* Nueva operación */}
        <NewTransactionButton />
      </div>

      {/* Recap */}
      <DashboardRecap userId={userId} transactions={transactions} />
    </section>
  );
};

export default page;
