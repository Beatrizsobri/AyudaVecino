import React from 'react';
import { Transaction } from '../../types/transaction';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const isSpend = transaction.transaction_type === 'SPEND';
  
  return (
    <div className="p-4 border-b border-gray-200 transaction-card hover:bg-gray-50 transition duration-150">
      <div className="flex items-start">
        <div className={`p-3 rounded-full ${isSpend ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} mr-4`}>
          <i className={`fas ${isSpend ? 'fa-shopping-cart' : 'fa-check-circle'} text-lg`}></i>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{transaction.transaction_type}</h4>
            <span className={`${isSpend ? 'text-red-600' : 'text-green-600'} font-semibold`}>
              {isSpend ? '-' : '+'}{Math.abs(transaction.amount)} pts
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">{transaction.favor} - {transaction.date_created}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{transaction.date_created}</span>
            <button className="text-xs text-indigo-600 hover:text-indigo-800">Ver detalles</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard; 