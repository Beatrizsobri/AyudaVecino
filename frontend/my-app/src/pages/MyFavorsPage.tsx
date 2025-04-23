import { useState, useEffect } from 'react';
import Tabs from "../components/Tab/Tab";
import Hero from '../components/Hero/Hero';
import FavorList from '../components/FavorList/FavorList';
import StatusSelector from '../components/StatusSelector/StatusSelector';
import { Pagination } from '../components/Pagination/Pagination';
import { Favor } from '../types/favor';
import { getCreatedFavors, getAcceptedFavors } from '../api/favor';

// const EmptyFavor = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-12 text-center">
//       <div className="mx-auto max-w-md">
//         <i className="fas fa-hand-holding-heart text-5xl text-indigo-200 mb-4"></i>
//         <h2 className="text-lg font-medium text-gray-900 mb-2">Aún no tienes favores</h2>
//         <p className="text-gray-500 mb-6">Aun no has solicitado ningún favor.</p>
//         <div className="flex justify-center space-x-3">
//           <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">
//               Pedir un Favor
//           </button>
//           <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50">
//               Ver favores disponibles
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// const RequestedFavors = ({ favors, loading }: FavorListProps) => {
//   if (loading) return <LoadingState />;
  
//   const safeFavors = Array.isArray(favors) ? favors : [];
//   if (safeFavors.length === 0) return <EmptyFavor />;

//   const activeFavors = safeFavors.filter((favor: FavorProps) => favor.status !== 'Completed');
//   const completedFavors = safeFavors.filter((favor: FavorProps) => favor.status === 'Completed');

//   return (
//     <div id="requested-tab" className="tab-content">
//       {activeFavors.length > 0 && (
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">Mis Solicitudes Activas</h2>
//           {activeFavors.map(favor => (
//             <Favor key={favor.id} {...favor} />
//           ))}
//         </div>
//       )}
      
//       {completedFavors.length > 0 && (
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">Mis Solicitudes Completadas</h2>
//           {completedFavors.map(favor => (
//             <Favor key={favor.id} {...favor} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const AcceptedFavors = ({ favors, loading }: FavorListProps) => {
//   if (loading) return <LoadingState />;
  
//   const safeFavors = Array.isArray(favors) ? favors : [];
//   if (safeFavors.length === 0) return <EmptyFavor />;

//   const activeFavors = safeFavors.filter((favor: FavorProps) => favor.status !== 'Completed');
//   const pendingFavors = safeFavors.filter((favor: FavorProps) => favor.status !== 'Pending');
//   const completedFavors = safeFavors.filter((favor: FavorProps) => favor.status === 'Completed');

//   return (
//     <div id="accepted-tab" className="tab-content">
//       {activeFavors.length > 0 && (
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">Favores que Estoy Ayudando</h2>
//           {activeFavors.map(favor => (
//             <Favor key={favor.id} {...favor} />
//           ))}
//         </div>
//       )}
      
//       {completedFavors.length > 0 && (
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">Favores Completados</h2>
//           {completedFavors.map(favor => (
//             <Favor key={favor.id} {...favor} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const PendingFavors = ({ favors, loading }: FavorListProps) => {
//   if (loading) return <LoadingState />;
  
//   const safeFavors = Array.isArray(favors) ? favors : [];
//   if (safeFavors.length === 0) return <EmptyFavor />;

//   const pendingFavors = safeFavors.filter((favor: FavorProps) => favor.status === 'Pending');

//   return (
//     <div id="pending-tab" className="tab-content">
//       {pendingFavors.length > 0 && (
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">Favores Pendientes</h2>
//           {pendingFavors.map(favor => (
//             <Favor key={favor.id} {...favor} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export const MyFavorsPage = () => {
  const [favors, setFavors] = useState<Favor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requested');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchFavors = async () => {
      try {
        setLoading(true);
        let response;
        if (activeTab === 'requested') {
          response = await getCreatedFavors(currentPage, selectedStatus);
        } else {
          response = await getAcceptedFavors(currentPage, selectedStatus);
        }
        
        console.log('API Response:', response);
        setFavors(response.results);
        setTotalItems(response.count);
        const calculatedPages = Math.ceil(response.count / 6);
        console.log('Total Items:', response.count, 'Calculated Pages:', calculatedPages);
        setTotalPages(calculatedPages);
      } catch (error) {
        console.error('Error fetching favors:', error);
        setFavors([]);
        setTotalItems(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchFavors();
  }, [activeTab, currentPage, selectedStatus]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSubmit = async (data: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
  }) => {
    try {
      const response = await getCreatedFavors(currentPage, selectedStatus);
      setFavors(response.results);
      setTotalItems(response.count);
      setTotalPages(Math.ceil(response.count / 6));
    } catch (error) {
      console.error('Error creating favor:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Hero 
        title="Mis Favores"
        text="Sigue los favores solicitados y los favores en los que estás ayudando"
        buttonText="Solicitar un Favor"
        isModalButton
        onModalSubmit={handleSubmit}
      />
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <Tabs onTabChange={handleTabChange} activeTab={activeTab} />
          <div className="w-64">
            <StatusSelector onStatusChange={handleStatusChange} />
          </div>
        </div>
        <FavorList favors={favors} loading={loading} />
        {!loading && totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorsPage;