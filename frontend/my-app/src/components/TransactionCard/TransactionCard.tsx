import { useState } from 'react';
import { Transaction } from '../../types/transaction';
import FavorCard from '../FavorCard/FavorCard';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const [showModal, setShowModal] = useState(false);
  const isSpend = transaction.transaction_type === 'SPEND';
  const formattedDate = new Date(transaction.date_created).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <>
      <div className="p-4 border-b border-gray-200 transaction-card hover:bg-gray-50 transition duration-150">
        <div className="flex items-start">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${isSpend ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} mr-4`}>
            <i className={`fas ${isSpend ? 'fa-arrow-down' : 'fa-arrow-up'} text-base`}></i>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{transaction.favor.title}</h4>
              <span className={`${isSpend ? 'text-red-600' : 'text-green-600'} font-semibold`}>
                {isSpend ? '-' : '+'}{Math.abs(transaction.amount)} pts
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{transaction.favor.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{formattedDate}</span>
              <button 
                onClick={() => setShowModal(true)}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Detalles del favor</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-4">
              <FavorCard favor={transaction.favor} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionCard; 