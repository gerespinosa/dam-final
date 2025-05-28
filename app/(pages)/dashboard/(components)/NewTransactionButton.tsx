import { useSession } from 'next-auth/react';
import React from 'react'
import { GoPlusCircle } from 'react-icons/go'

const NewTransactionButton = () => {

    const {data: session} = useSession()


const left = (window.screen.width / 2) - (600 / 2);
const top = (window.screen.height / 2) - (800 / 2);

    function handleOpening() {
        window.open(`/transaction/new`, "_blank", `width=400,height=400,left=${left},top=${top}`)
    }   


  return (
      <button  className='min-w-[200px] p-4 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white text-black flex items-center gap-1'
      onClick={handleOpening}>
        <GoPlusCircle className="text-xl" />
        NUEVA OPERACIÓN
        </button>
  )
}

export default NewTransactionButton
