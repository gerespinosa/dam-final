import React from "react";
import SidebarMenu from "./SidebarMenu";
import SidebarBottom from "./SidebarBottom";
import SidebarLogo from "./SidebarLogo";

const Sidebar = () => {
  return (
    <div className="h-full w-[5vw] bg-blue-400 hidden md:flex flex-col justify-between items-center py-4">
      {/* Logo */}
      <SidebarLogo />

      {/* Menú del sidebar */}

      <SidebarMenu />

      <SidebarBottom />
    </div>
  );
};

export default Sidebar;
