'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { getUserTransactions } from '@/app/services/getUserTransactions'

const Page = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Buscamos las transacciones del usuario
  useEffect(() => {
    if (!userId) return

    const fetchTransactions = async () => {
      try {
        const data : Transaction[]= await getUserTransactions(userId)
        setTransactions(data)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchTransactions()
  }, [userId])

  if (!userId) return <p>Cargando sesión...</p>

  if (transactions.length === 0) return <p>No hay transacciones</p>

  return (
    <div>
        {transactions.map((transaction, index) => {
            return (
                <div key={index}>{transaction.desc}</div>
            )
        })}
    </div>
  )
}

export default Page