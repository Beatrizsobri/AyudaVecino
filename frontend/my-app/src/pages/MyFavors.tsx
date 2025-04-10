import Tabs from "../components/Tab/Tab";
import { useState, useEffect } from 'react';
import { FavorRequestForm } from "../components/FavorRequestForm";
import { getFavors } from '../api/favor';

interface FavorProps {
  id: string;
  title: string;
  status: string;
  description: string;
  deadline: string;
  points: string;
  img: any;
  helper?: string;
  buttonText: string;
}

interface FavorListProps {
  favors: FavorProps[];
  loading: boolean;
}

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
  }) => {
    try {
      setIsModalOpen(false);
      // You might want to refresh the favors list here
    } catch (error) {
      console.error('Error creating favor:', error);
    }
  };

  return (
    <>
      <div className="gradient-bg rounded-xl text-white p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Mis Favores</h1>
            <p className="text-indigo-100">
              Sigue los favores solicitados y los favores en los que estás ayudando
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-150 flex items-center"
            >
              <i className="fas fa-plus-circle mr-2"></i> Solicitar un Favor
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <FavorRequestForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

const LoadingState = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

const EmptyFavor = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="mx-auto max-w-md">
        <i className="fas fa-hand-holding-heart text-5xl text-indigo-200 mb-4"></i>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Aún no tienes favores</h2>
        <p className="text-gray-500 mb-6">Aun no has solicitado ningún favor.</p>
        <div className="flex justify-center space-x-3">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">
              Pedir un Favor
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50">
              Ver favores disponibles
          </button>
        </div>
      </div>
    </div>
  )
}

const Favor = ({ title, status, description, deadline, points, img, helper, buttonText }: FavorProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition duration-150">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <h3 className="font-bold text-lg mr-3">{title}</h3>
            <span className={`status-badge ${status === 'Completed' ? 'bg-purple-100 text-purple-800' : status === 'In Progress' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} px-3 py-1 rounded-full text-sm`}>{status}</span>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
          {helper && (
            <div className="flex items-center mt-2">
              <img src={img} alt="Helper" className="w-6 h-6 rounded-full mr-2" />
              <span className="text-sm text-gray-600">{helper}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="text-right">
            <p className="text-xs text-gray-500">Publicado {deadline}</p>
            <p className="font-bold text-indigo-600">{points}</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200">
              {buttonText}
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
              Detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RequestedFavors = ({ favors, loading }: FavorListProps) => {
  if (loading) return <LoadingState />;
  
  const safeFavors = Array.isArray(favors) ? favors : [];
  if (safeFavors.length === 0) return <EmptyFavor />;

  const activeFavors = safeFavors.filter((favor: FavorProps) => favor.status !== 'Completed');
  const completedFavors = safeFavors.filter((favor: FavorProps) => favor.status === 'Completed');

  return (
    <div id="requested-tab" className="tab-content">
      {activeFavors.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Mis Solicitudes Activas</h2>
          {activeFavors.map(favor => (
            <Favor key={favor.id} {...favor} />
          ))}
        </div>
      )}
      
      {completedFavors.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Mis Solicitudes Completadas</h2>
          {completedFavors.map(favor => (
            <Favor key={favor.id} {...favor} />
          ))}
        </div>
      )}
    </div>
  );
};

const AcceptedFavors = ({ favors, loading }: FavorListProps) => {
  if (loading) return <LoadingState />;
  
  const safeFavors = Array.isArray(favors) ? favors : [];
  if (safeFavors.length === 0) return <EmptyFavor />;

  const activeFavors = safeFavors.filter((favor: FavorProps) => favor.status !== 'Completed');
  const pendingFavors = safeFavors.filter((favor: FavorProps) => favor.status !== 'Pending');
  const completedFavors = safeFavors.filter((favor: FavorProps) => favor.status === 'Completed');

  return (
    <div id="accepted-tab" className="tab-content">
      {activeFavors.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Favores que Estoy Ayudando</h2>
          {activeFavors.map(favor => (
            <Favor key={favor.id} {...favor} />
          ))}
        </div>
      )}
      
      {completedFavors.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Favores Completados</h2>
          {completedFavors.map(favor => (
            <Favor key={favor.id} {...favor} />
          ))}
        </div>
      )}
    </div>
  );
};

const PendingFavors = ({ favors, loading }: FavorListProps) => {
  if (loading) return <LoadingState />;
  
  const safeFavors = Array.isArray(favors) ? favors : [];
  if (safeFavors.length === 0) return <EmptyFavor />;

  const pendingFavors = safeFavors.filter((favor: FavorProps) => favor.status === 'Pending');

  return (
    <div id="pending-tab" className="tab-content">
      {pendingFavors.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Favores Pendientes</h2>
          {pendingFavors.map(favor => (
            <Favor key={favor.id} {...favor} />
          ))}
        </div>
      )}
    </div>
  );
};

export const MyFavors = () => {
  const [activeTab, setActiveTab] = useState('requested');
  const [favors, setFavors] = useState<FavorProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavors = async (type: string) => {
    try {
      setLoading(true);
      // Convertir el tipo de tab al estado correcto para la API
      const status = type === 'pending' ? 'PENDING' : type === 'accepted' ? 'ACCEPTED' : 'requested';
      const response = await getFavors(status);
      console.log('Raw API Response:', response);
      
      // Usar la propiedad results del objeto de respuesta
      const results = response.results || [];
      console.log('Raw Results:', results);
      
      // Transformar los datos de la API al formato que espera el componente Favor
      const transformedFavors = results.map((favor: any) => {
        console.log('Processing favor:', favor);
        return {
          id: favor.id || Math.random().toString(), // Si no hay id, generamos uno temporal
          title: favor.title || 'Sin título',
          status: type === 'pending' ? 'Pending' : type === 'accepted' ? 'Accepted' : favor.status || 'Pending',
          description: favor.description || '',
          deadline: new Date(favor.deadline).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          points: favor.points ? `${favor.points} pts` : '0 pts',
          img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', // Imagen por defecto
          buttonText: 'Ver Detalles'
        };
      });
      
      console.log('Transformed favors:', transformedFavors);
      setFavors(transformedFavors);
    } catch (error) {
      console.error('Error fetching favors:', error);
      setFavors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavors(activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header/>
      <Tabs onTabChange={handleTabChange}/>
      {activeTab === 'requested' && <RequestedFavors favors={favors} loading={loading} />}
      {activeTab === 'pending' && <PendingFavors favors={favors} loading={loading} />}
      {activeTab === 'accepted' && <AcceptedFavors favors={favors} loading={loading} />}
    </main>
  );
}