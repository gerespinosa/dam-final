"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getCategories } from '@/app/services/getCategories'
import { instance } from '@/app/lib/axios'

const page = () => {

    const [amount, setAmount] = useState("");
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("")
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [notes, setNotes] = useState("")

// Obtenemos las categorías desde la base de datos
    useEffect(() => {
      async function fetchCategories() {
        const data = await getCategories();
        setCategoriesList(data);
      }

      fetchCategories();
    }, []);

    const {data: session} = useSession()

    async function createOperation(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const isExpense = parseFloat(amount) < 0
        const selectedCategory = categoriesList.find(cat => cat.name === category);
        if (!selectedCategory) return;
        const userId = (session?.user as { id?: string })?.id;
        
        const response = await instance.post('/transaction/create', {
          userId: userId,
            transaction: {
                isExpense,
                amount: parseFloat(amount),
                category: {
                    name: selectedCategory.name,
                    shownName: selectedCategory.shownName,
                    url: selectedCategory.url
                },
                desc,
                notes
            }
        });

        if(response.status === 200){
          alert('Operación creada cón éxito')
          window.close()
        }
    }




  return (
    <form onSubmit={createOperation} className='h-fit items-center flex flex-wrap p-4 gap-2 justify-between'>
        {/* Cantidad */}
      <input
        className="rounded-md outline-none border-2 border-blue-400 p-2 max-w-[100px]"
        type="number"
        placeholder="Cantidad"
        step="any"
        min="-999999"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}      
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
        {categoriesList.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.shownName}
          </option>
        ))}
      </select>
            {/* Concepto */}
      <input
        className="rounded-md outline-none border-2 border-blue-400 p-2"
        type="text"
        placeholder="Notas"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button  type={"submit"}
      className='min-w-[200px] p-4 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white text-black flex items-center gap-1 justify-center'>
        Añadir
        </button>
    </form>
  );
}

export default page
