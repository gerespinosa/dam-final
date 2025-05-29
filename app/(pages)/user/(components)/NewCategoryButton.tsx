"use client"
import React from 'react'
import { GoPlusCircle } from 'react-icons/go'

const NewCategoryButton = () => {
  function handleOpening() {
    const left = (window.screen.width / 2) - (600 / 2);
    const top = (window.screen.height / 2) - (800 / 2);
    window.open(`/category/new`, "_blank", `width=400,height=400,left=${left},top=${top}`)
  }

  return (
    <button  className='min-w-[200px] p-4 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white text-black flex items-center gap-1'
      onClick={handleOpening}>
      <GoPlusCircle className="text-xl" />
      NUEVA CATEGORÍA
    </button>
  )
}

export default NewCategoryButton
