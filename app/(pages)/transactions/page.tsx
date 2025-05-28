'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { getUserTransactions } from '@/app/services/getUserTransactions'
import TransactionsTable from './(components)/TransactionsTable'

const Page = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Buscamos las transacciones del usuario
  useEffect(() => {

    if (!userId) return

    const fetchTransactions = async () => {
      try {
        // const data : Transaction[]= await getUserTransactions(userId)
        const data : any[] = await getUserTransactions(userId)
        console.log("Data", data)
        setTransactions(data)
        console.log("Transacciones", transactions)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchTransactions()
  }, [userId])

  if (!userId) return <p>Cargando sesión...</p>

  if (transactions.length === 0) return <p>No hay transacciones</p>

  return (
    <div className='h-[100vh] p-4'>
      <TransactionsTable transactions={transactions} />
    </div>
  )
}

export default Page