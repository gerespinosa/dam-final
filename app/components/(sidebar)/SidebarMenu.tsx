import React from 'react'
import Link from 'next/link'
import { IoHome } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const SidebarMenu = () => {
  return (
    // Menú del sidebar
    <ul className='flex flex-col justify-center gap-8 items-center  h-1/3'>
        <Link href={"/dashboard"}><IoHome className='fill-white'/></Link>
        <Link href={"/user"}><FaUser className='fill-white' /></Link>
        <Link href={"/transactions"}><FaMoneyBillWave className='fill-white' /></Link>
    </ul>
  )
}

export default SidebarMenu
