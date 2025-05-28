"use client"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

const page = () => {

    const [amount, setAmount] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("")

    const {data: session} = useSession()

    async function createOperation(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const isExpense = amount < 0
        
        const response = await fetch('/api/transaction/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId : session?.user?.id,
                transaction: {
                    isExpense,
                    amount,
                    category:{
                        name: category,
                        img: ""
                    },
                    desc,
                }
            })
        })
    }

  return (
    <form onSubmit={createOperation} className='h-fit items-center flex flex-wrap p-4 gap-2 justify-between'>
        {/* Cantidad */}
      <input
        className="rounded-md outline-none border-2 border-blue-400 p-2 max-w-[100px]"
        type="number"
        placeholder="Cantidad"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}      
    />
      {/* Concepto */}
      <input
        className="rounded-md outline-none border-2 border-blue-400 p-2"
        type="text"
        placeholder="Concepto"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      {/* Categoría */}
      <select
        className="rounded-md outline-none border-2 border-blue-400 p-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="rent">Alquiler / Hipoteca</option>
        <option value="food">Alimentación</option>
        <option value="restaurants">Restaurantes y cafés</option>
        <option value="transport">Transporte</option>
        <option value="fuel">Combustible</option>
        <option value="education">Educación</option>
        <option value="health">Salud y farmacia</option>
        <option value="entertainment">Entretenimiento</option>
        <option value="shopping">Compras / Ropa</option>
        <option value="travel">Viajes</option>
        <option value="utilities">Teléfono / Internet</option>
        <option value="bills">Electricidad / Agua / Gas</option>
        <option value="pets">Mascotas</option>
        <option value="home_maintenance">Mantenimiento del hogar</option>
        <option value="technology">Tecnología</option>
        <option value="sports">Gimnasio / Deportes</option>
        <option value="donations">Donaciones</option>
        <option value="insurance">Seguros</option>
        <option value="taxes">Impuestos</option>
        <option value="savings">Ahorros</option>
        <option value="investments">Inversiones</option>
        <option value="income">Ingresos</option>
        <option value="freelance">Freelance</option>
        <option value="gifts">Regalos</option>
        <option value="subscriptions">Suscripciones</option>
        <option value="childcare">Cuidado infantil</option>
        <option value="beauty">Belleza</option>
        <option value="events">Eventos / Celebraciones</option>
        <option value="cleaning">Limpieza</option>
        <option value="other">Otros</option>
      </select>

      <button  type={"submit"}
      className='min-w-[200px] p-4 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white text-black flex items-center gap-1 justify-center'>
        Añadir
        </button>
    </form>
  );
}

export default page
