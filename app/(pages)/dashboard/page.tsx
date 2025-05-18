"use client";
import React from "react";
import DashboardRecap from "./(components)/DashboardRecap";
import { useSession } from "next-auth/react";

const page = () => {

  const { data: session } = useSession();

  const userId = session?.user.id

  return (
    <section className="flex flex-col p-2 space-y-4">
      <h2 className="sm:text-3xl">Hola {session?.user?.username ?? "Cargando"}</h2>
      <DashboardRecap userId={userId} />
    </section>
  );
};

export default page;
