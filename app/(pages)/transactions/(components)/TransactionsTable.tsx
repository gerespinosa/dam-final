'use client'
import { dateAdapter } from '@/app/adapters/dateAdapter';
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";

type TransactionsTableProps = {
  transactions: Transaction[]
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState('');

  async function handleDelete(transactionId: string) {
    try {
      const response = await fetch(`/api/transaction/delete/${transactionId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(response)
      window.location.reload();
    } catch (error: any) {
      console.log("Imposible borrar la transacción")
    }
  }

  async function handleAddNote(transactionId: string) {
    const note = prompt("Escribe la nueva nota:");
    if (!note) return;

    try {
      const response = await fetch('/api/transaction/create', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          transactionId,
          updates: { $push: { notes: note } }
        })
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error al añadir la nota", error);
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const values = [
      transaction._id,
      transaction.amount.toString(),
      transaction.desc,
      transaction.category?.shownName,
      transaction.notes?.join(' ')
    ].join(' ').toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <input
        type="text"
        placeholder="Buscar..."
        className="mb-4 p-2 border rounded-md w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className='w-full h-[300px] table-fixed'>
        <thead>
          <tr className='text-left'>
            <th className="w-[15%]">ID</th>
            <th className="w-[5%]">Importe</th>
            <th className="w-[15%]">Concepto</th>
            <th className="w-[10%]">Fecha</th>
            <th className="w-[15%]">Categoría</th>
            <th className="w-[10%]">Notas</th>
            <th className="w-[5%]">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction : Transaction) => (
            <tr key={transaction._id} className='border-b-1'>
                <td>
                    {transaction._id}
                </td>
                <td>
                    {transaction.amount}€
                </td>
                <td>
                    {transaction.desc}
                </td>
                <td>
                {/* Fecha formateada */}
                <DateCell date={transaction.createdAt?.toString() ?? ''} />
                </td>
                <td>
                  <div className='flex gap-2 items-center'>
                    {transaction.category.shownName}
                    <img src={transaction.category.url }alt="icono" className='w-8 h-8' />
                  </div>
                </td>
                <td>
                                      <button onClick={() => handleAddNote(transaction._id)} className='text-blue-400'>
                      Añadir Nota
                    </button><br />
                    {transaction.notes?.map((note) => note)}
                </td>
                <td>
                    <MdDelete onClick={() => handleDelete(transaction._id)} />

                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

// Componente auxiliar para mostrar la fecha formateada
function DateCell({ date }: { date: string }) {
  if (!date) return <span>—</span>;
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return <span>Fecha inválida</span>;

  const formatted = dateAdapter(parsedDate);
  return <span>{formatted}</span>;
}

export default TransactionsTable