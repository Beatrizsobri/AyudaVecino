import { useState, useEffect } from 'react';
import Hero from "../components/Hero/Hero";
import transactionsApi from '../api/transactions';

interface Transaction {
  id: number;
  transaction_type: string;
  amount: number;
  date_created: string;
  user: number;
  favor: number;
}

interface FiltersSectionProps {
  totalEarned: number;
  totalSpent: number;
  completedFavors: number;
  currentFilter: string | undefined;
  onFilterChange: (filter: string | undefined) => void;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const FiltersSection = ({ 
  totalEarned, 
  totalSpent, 
  completedFavors,
  currentFilter,
  onFilterChange 
}: FiltersSectionProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h2 className="text-lg font-semibold mb-4 md:mb-0">Transacciones</h2>
    <div className="flex flex-wrap gap-2 mb-6">
      <button 
        className={`filter-pill px-4 py-1 rounded-full border ${!currentFilter ? 'border-indigo-500 text-indigo-500' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} text-sm`}
        onClick={() => onFilterChange(undefined)}
      >
        Todo
      </button>
      <button 
        className={`filter-pill px-4 py-1 rounded-full border ${currentFilter === 'EARN' ? 'border-indigo-500 text-indigo-500' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} text-sm`}
        onClick={() => onFilterChange('EARN')}
      >
        <i className="fas fa-plus text-green-500 mr-1"></i> Ganados
      </button>
      <button 
        className={`filter-pill px-4 py-1 rounded-full border ${currentFilter === 'SPEND' ? 'border-indigo-500 text-indigo-500' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} text-sm`}
        onClick={() => onFilterChange('SPEND')}
      >
        <i className="fas fa-minus text-red-500 mr-1"></i> Gastados
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-green-600">Total Ganado</p>
            <p className="text-xl font-bold text-green-800">{totalEarned} pts</p>
          </div>
          <i className="fas fa-arrow-up text-green-500 text-xl"></i>
        </div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-red-600">Total Gastado</p>
            <p className="text-xl font-bold text-red-800">{totalSpent} pts</p>
          </div>
          <i className="fas fa-arrow-down text-red-500 text-xl"></i>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-blue-600">Total Favores</p>
            <p className="text-xl font-bold text-blue-800">{completedFavors}</p>
          </div>
          <i className="fas fa-check-circle text-blue-500 text-xl"></i>
        </div>
      </div>
    </div>
  </div>
);

const TransactionsList = ({ transactions }: TransactionsListProps) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-200 px-6 py-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Transacciones Recientes</h3>
    </div>

    {transactions.map((transaction) => {
      const isSpend = transaction.transaction_type === 'SPEND';
      return (
        <div key={transaction.id} className="p-4 border-b border-gray-200 transaction-card hover:bg-gray-50 transition duration-150">
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
    })}
  </div>
);

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionsApi.getAllTransactions(currentFilter);
        setTransactions(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las transacciones');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentFilter]);

  const totalEarned = transactions
    .filter(t => t.transaction_type === 'EARN')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = transactions
    .filter(t => t.transaction_type === 'SPEND')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFavors = transactions.length;

  if (loading) return <div>Cargando transacciones...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Hero 
        title="Historial de Puntos"
        text="Realiza un seguimiento de tus ganancias y gastos de puntos de favor"
        points={totalEarned - totalSpent}
      />
      <FiltersSection 
        totalEarned={totalEarned}
        totalSpent={totalSpent}
        completedFavors={totalFavors}
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <TransactionsList transactions={transactions} />
    </main>
  );
};

export default Transactions;
