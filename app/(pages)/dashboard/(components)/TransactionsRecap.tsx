import React from 'react'

type TransactionsRecapProps = {
  userId?: string;
  transactions?: Transaction[]
};

const TransactionsRecap = ({ userId, transactions = [] }: TransactionsRecapProps) => {
  type CategoryGroups = {
    [categoryName: string]: Transaction[];
  };

  const categoryGroups: CategoryGroups = {};

  for (const transaction of transactions) {
    const categoryName = transaction.category.name;
    const categoryShown = transaction.category.shownName
    if (!categoryGroups[categoryName]) {
      categoryGroups[categoryName] = [];
    }
    categoryGroups[categoryName].push(transaction);
  }

  return (
    <div className='flex gap-2 flex-wrap w-1/2 justify-between'>
      {Object.entries(categoryGroups).map(([categoryName, transactions]) => {
        // Tomamos el shownName de la primera transacción del grupo
        const categoryShown = transactions[0]?.category.shownName;
        return (
          <div key={categoryName} className='rounded-md border-2 border-blue-400 p-4 min-w-[250px] max-w-[350px]'>
            <h3>{categoryShown}</h3>
            <ul>
              <li>
                Total: {transactions.reduce((acc, t) => acc + t.amount, 0)} €
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsRecap
