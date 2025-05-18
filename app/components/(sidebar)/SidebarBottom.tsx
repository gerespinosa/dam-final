"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SidebarBottom = () => {

  //Manejamos el logout
  async function handleLogout() {
    const confirmacion = confirm("Quieres salir?");
    if (confirmacion === true) {
      await signOut({ callbackUrl: "/" });
    } else {
      return;
    }
  }

  return (
    <ul className="flex flex-col items-center gap-4">

    {/* Log Out */}
      <li onClick={handleLogout}>
        <BiLogOutCircle className="fill-white" />
      </li>

    {/* Avatar */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </ul>
  );
};

export default SidebarBottom;
