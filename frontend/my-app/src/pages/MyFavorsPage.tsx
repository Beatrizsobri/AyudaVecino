import { useState } from 'react';
import Tabs from "../components/Tab/Tab";
import Hero from '../components/Hero/Hero';
import FavorList from '../components/FavorList/FavorList';
import { Favor } from '../types/favor';

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
  const [activeTab, setActiveTab] = useState('requested');
  const [favors, setFavors] = useState<Favor[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (data: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
  }) => {
    try {
      // You might want to refresh the favors list here
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
      <Tabs onTabChange={handleTabChange}/>
      {activeTab === 'requested' && <FavorList favors={favors} loading={loading} />}
      {activeTab === 'pending' && <FavorList favors={favors} loading={loading} />}
      {activeTab === 'accepted' && <FavorList favors={favors} loading={loading} />}
    </div>
  );
};