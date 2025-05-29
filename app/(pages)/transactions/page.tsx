'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { getUserTransactions } from '@/app/services/getUserTransactions'
import TransactionsTable from './(components)/TransactionsTable'
import NewTransactionButton from '../dashboard/(components)/NewTransactionButton'

const Page = () => {
  const { data: session } = useSession()
  const userId = (session?.user as { id?: string })?.id;

  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Buscamos las transacciones del usuario
  useEffect(() => {

    if (!userId) return

    const fetchTransactions = async () => {
      try {
        // const data : Transaction[]= await getUserTransactions(userId)
        const data = await getUserTransactions(userId)
        setTransactions(data ?? [])
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchTransactions()
  }, [userId])

  if (!userId) return <p>Cargando sesión...</p>

  return (
    <div className='h-fit max-h-[100vh] w-full flex flex-col items-start p-4 space-y-2'>
      <NewTransactionButton />
    <TransactionsTable transactions={transactions} />
    </div>
  )
}

export default Page