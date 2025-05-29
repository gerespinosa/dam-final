import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react'

type TransactionsGraphProps = {
  userId?: string;
  transactions?: Transaction[]
};

const TransactionsGraph = ({ transactions = [] }: TransactionsGraphProps) => {
  const categoryGroups: { [key: string]: Transaction[] } = {};

  for (const transaction of transactions) {
    if (!transaction.category || !transaction.category.name) continue;
    const categoryName = transaction.category.name;
    if (!categoryGroups[categoryName]) {
      categoryGroups[categoryName] = [];
    }
    categoryGroups[categoryName].push(transaction);
  }

  const chartData = Object.entries(categoryGroups)
    .map(([categoryName, txs]) => {
      const negativeTxs = txs.filter(tx => tx.amount < 0);
      const total = negativeTxs.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
      return {
        icon: txs[0].category.shownName,
        total,
      };
    })
    .filter(entry => entry.total > 0);

  return (
    <div className='w-full h-64'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="icon" tick={({ x, y, payload }) => (
            <image
              href={payload.value}
              x={x - 12}
              y={y + 10}
              height={24}
              width={24}
            />
          )} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" className='fill-blue-400' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsGraph
