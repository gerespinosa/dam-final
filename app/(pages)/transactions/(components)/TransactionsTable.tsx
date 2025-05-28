import { categoryAdapter } from '@/app/adapters/categoryAdapter'
import React from 'react'
import { MdDelete } from "react-icons/md";

type TransactionsTableProps = {
  transactions: Transaction[]
}

async function handleDelete(transactionId: string) {
  try{
    const response = await fetch(`/api/transaction/delete/${transactionId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })

    console.log(response)

    window.location.reload();

  }catch(error: any){
    console.log("Imposible borrar la transacción")
  }
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <table className='w-full table-fixed'>
      <thead>
        <tr className='text-left'>
          <th className="w-[25%]">ID</th>
          <th className="w-[10%]">Importe</th>
          <th className="w-[25%]">Concepto</th>
          <th className="w-[20%]">Categoría</th>
          <th className="w-[10%]">Notas</th>
          <th className="w-[10%]">Eliminar</th>
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
                  {categoryAdapter(transaction.category.name)}
              </td>
              <td>
                  {transaction.notes?.map((note) => note)}
              </td>
              <td>
                  <MdDelete onClick={() => handleDelete(transaction._id)} />
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionsTable