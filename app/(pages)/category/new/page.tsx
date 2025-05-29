"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { instance } from '@/app/lib/axios'

const page = () => {

    const [name, setName] = useState("")
    const [shownName, setShownName] = useState("")
    const [url, setUrl] = useState("")

    async function createCategory(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const response = await instance.post('/category', {
                name: name,
                shownName: shownName,
                url: url
            }
        );
                    if(response.status = 200){
              alert("Categoría creada con éxito")
              window.close()
            }
    }

  return (
    <form onSubmit={createCategory} className='h-fit items-center flex flex-wrap p-4 gap-2 justify-between'>
        {/* Nombre */}
      <input
        className="rounded-md outline-none border-2 border-blue-400 p-2 max-w-[100px]"
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}      
    />
      {/* ShownName */}
      <input
        className="rounded-md outline-none border-2 border-blue-400 p-2"
        type="text"
        placeholder="Nombre para mostrar"
        value={shownName}
        onChange={(e) => setShownName(e.target.value)}
      />
      {/* Url */}
            <input
        className="rounded-md outline-none border-2 border-blue-400 p-2"
        type="text"
        placeholder="URL icono"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />


      <button  type={"submit"}
      className='min-w-[200px] p-4 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white text-black flex items-center gap-1 justify-center'>
        Añadir
        </button>
    </form>
  );
}

export default page
