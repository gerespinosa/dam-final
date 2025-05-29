"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

const SidebarBottom = () => {

  const { data: session } = useSession();

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
  {session?.user?.imgUrl ? (
    <AvatarImage src={session.user.imgUrl} />
  ) : (
    <AvatarFallback>{session?.user?.name?.[0] ?? "?"}</AvatarFallback>
  )}
</Avatar>
    </ul>
  );
};

export default SidebarBottom;
