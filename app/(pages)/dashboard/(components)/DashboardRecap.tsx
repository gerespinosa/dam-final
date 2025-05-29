import React from 'react'
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

type DashboardRecapProps = {
  userId?: string;
  transactions?: Transaction[]
};

const DashboardRecap = ({userId, transactions}: DashboardRecapProps) => {

  // Filtramos por aquellas transacciones que sean gasto o no gasto y luego conseguimos los totales
  const totalExpenses : number = transactions?.filter((transaction: Transaction) => transaction.isExpense === true).reduce((acc, transaction) => acc + transaction.amount, 0) ?? 0
  const totalIncome : number = transactions?.filter((transaction: Transaction) => transaction.isExpense === false).reduce((acc, transaction) => acc + transaction.amount, 0) ?? 0
  const totalSavings : number = totalIncome + totalExpenses

  // Normalizar las barras
  const maxValue = Math.max(
    Math.abs(totalIncome),
    Math.abs(totalExpenses),
    Math.abs(totalSavings)
  );

  return (
    <div className='flex-col gap-2 w-[30%] border-blue-400 min-h-fit border-2 p-4 rounded-md'>
      {/* Title */}
    <h3 className='text-right md:text-xl font-semibold'>Recap</h3>

    <div className="flex items-center justify-between gap-2 mb-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#4ade80' }} />
        <p>Total Ingresos: {Math.abs(totalIncome)}€</p>
      </div>
      <div className="h-4 rounded-sm" style={{ width: `${(Math.abs(totalIncome) / maxValue) * 100}%`, backgroundColor: '#4ade80' }} />
    </div>
    <div className="flex items-center justify-between gap-2 mb-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#f87171' }} />
        <p>Total Gastos: {Math.abs(totalExpenses)}€</p>
      </div>
      <div className="h-4 rounded-sm" style={{ width: `${(Math.abs(totalExpenses) / maxValue) * 100}%`, backgroundColor: '#f87171' }} />
    </div>
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#60a5fa' }} />
        <p>Ahorrado: {Math.abs(totalSavings)}€</p>
      </div>
      <div className="h-4 rounded-sm" style={{ width: `${(Math.abs(totalSavings) / maxValue) * 100}%`, backgroundColor: '#60a5fa' }} />
    </div>

    </div>
  )
} // Fin del componente

export default DashboardRecap
