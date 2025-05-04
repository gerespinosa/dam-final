import React from 'react'
import Image from 'next/image'

const SidebarLogo = () => {
  return (
    <Image src={"/logo.png"} 
    alt="logo"
    width={26}
    height={26}/>
  )
}

export default SidebarLogo
