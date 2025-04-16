import { Pagination } from "../components/Pagination/Pagination";
import Hero from "../components/Hero/Hero";

const FiltersSection = () => (
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h2 className="text-lg font-semibold mb-4 md:mb-0">Transacciones</h2>
    <div className="flex flex-wrap gap-2 mb-6">
      <button className="filter-pill active px-4 py-1 rounded-full border border-indigo-500 text-indigo-500 text-sm">
        Todo
      </button>
      <button className="filter-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
        <i className="fas fa-plus text-green-500 mr-1"></i> Ganados
      </button>
      <button className="filter-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
        <i className="fas fa-minus text-red-500 mr-1"></i> Gastados
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-green-600">Total Ganado</p>
            <p className="text-xl font-bold text-green-800">375 pts</p>
          </div>
          <i className="fas fa-arrow-up text-green-500 text-xl"></i>
        </div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-red-600">Total Gastado</p>
            <p className="text-xl font-bold text-red-800">250 pts</p>
          </div>
          <i className="fas fa-arrow-down text-red-500 text-xl"></i>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-blue-600">Favores Completados</p>
            <p className="text-xl font-bold text-blue-800">14</p>
          </div>
          <i className="fas fa-check-circle text-blue-500 text-xl"></i>
        </div>
      </div>
    </div>
  </div>
);

const TransactionsList = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-200 px-6 py-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Transacciones Recientes</h3>
    </div>

    {/* Transaction 1 */}
    <div className="p-4 border-b border-gray-200 transaction-card hover:bg-gray-50 transition duration-150">
      <div className="flex items-start">
        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
          <i className="fas fa-check-circle text-lg"></i>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Favor completado para Sarah</h4>
            <span className="text-green-600 font-semibold">+25 pts</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Paseo de perro - Completado</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Hace 2 horas</span>
            <button className="text-xs text-indigo-600 hover:text-indigo-800">Ver detalles</button>
          </div>
        </div>
      </div>
    </div>

    {/* Transaction 2 */}
    <div className="p-4 border-b border-gray-200 transaction-card hover:bg-gray-50 transition duration-150">
      <div className="flex items-start">
        <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
          <i className="fas fa-shopping-cart text-lg"></i>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Pedido de recogida de víveres</h4>
            <span className="text-red-600 font-semibold">-30 pts</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Recogida de víveres - Pendiente</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Ayer</span>
            <button className="text-xs text-indigo-600 hover:text-indigo-800">Ver detalles</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Transactions = () => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Hero 
      title="Historial de Puntos"
      text="Realiza un seguimiento de tus ganancias y gastos de puntos de favor"
      points={125}
    />
    <FiltersSection />
    <TransactionsList />
    <Pagination />
  </main>
);

export default Transactions;
