import { useState, useEffect } from 'react';
import Hero from "../components/Hero/Hero";
import transactionsApi from '../api/transactions';
import { Pagination } from '../components/Pagination/Pagination';
import { useUser } from '../contexts/UserContext';
import TransactionsList from '../components/TransactionsList/TransactionsList';
import { Transaction } from '../types/transaction';

interface FiltersSectionProps {
  totalEarned: number;
  totalSpent: number;
  completedFavors: number;
  currentFilter: string | undefined;
  onFilterChange: (filter: string | undefined) => void;
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

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totals, setTotals] = useState({
    total_earned: 0,
    total_spent: 0,
    total_favors: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsResponse, totalsResponse] = await Promise.all([
          transactionsApi.getAllTransactions(currentFilter, currentPage),
          transactionsApi.getTotals()
        ]);
        
        setTransactions(transactionsResponse.data.results);
        setTotalPages(Math.ceil(transactionsResponse.data.count / 5));
        setTotals(totalsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las transacciones');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentFilter, currentPage]);
  const user = useUser();

  if (loading) return <div>Cargando transacciones...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Hero 
        title="Historial de Puntos"
        text="Realiza un seguimiento de tus ganancias y gastos de puntos de favor"
        points={user.user?.points}
      />
      <FiltersSection 
        totalEarned={totals.total_earned}
        totalSpent={totals.total_spent}
        completedFavors={totals.total_favors}
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <TransactionsList transactions={transactions} />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default TransactionsPage;
