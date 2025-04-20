import React from 'react';
import { Transaction } from '../../types/transaction';
import TransactionCard from '../TransactionCard/TransactionCard';

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-200 px-6 py-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Transacciones Recientes</h3>
    </div>
    {transactions.map((transaction) => (
      <TransactionCard key={transaction.id} transaction={transaction} />
    ))}
  </div>
);

export default TransactionsList; 