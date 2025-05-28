import React from 'react'

type DashboardRecapProps = {
  userId?: string;
  transactions?: Transaction[]
};

const DashboardRecap = ({userId, transactions}: DashboardRecapProps) => {

  // Filtramos por aquellas transacciones que sean gasto o no gasto y luego conseguimos los totales
  const totalExpenses : number = transactions?.filter((transaction: Transaction) => transaction.isExpense === true).reduce((acc, transaction) => acc + transaction.amount, 0) ?? 0
  const totalIncome : number = transactions?.filter((transaction: Transaction) => transaction.isExpense === false).reduce((acc, transaction) => acc + transaction.amount, 0) ?? 0
  const totalSavings : number = totalIncome - totalExpenses
  console.log(totalIncome, totalExpenses, totalSavings)


  return (
    <div className='flex-col gap-2 w-[30%] border-blue-400 min-h-[30vh] border-2 p-4 rounded-md'>
      {/* Title */}
    <h3 className='text-right md:text-xl font-semibold'>Recap</h3>

    {/* Charts */}
    <p>Total Ingresos: {totalIncome}€</p>
    <p>Total Gastos: {totalExpenses}€</p>
    <p>Ahorrado: {totalSavings}€</p>

    </div>
  )
} // Fin del componente

export default DashboardRecap
