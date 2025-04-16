import React from 'react';
import { getFavorById } from '../api/favor';

interface FavorDetailsModalProps {
  favorId: number;
  onClose: () => void;
}

interface FavorDetails {
  id: number;
  title: string;
  description: string;
  points: number;
  publication_date: string;
  user: {
    email: string;
    username: string;
  };
  distance: string;
}

const FavorDetailsModal: React.FC<FavorDetailsModalProps> = ({ favorId, onClose }) => {
  const [favor, setFavor] = React.useState<FavorDetails | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFavorDetails = async () => {
      try {
        const data = await getFavorById(favorId);
        setFavor(data);
      } catch (error) {
        console.error('Error fetching favor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorDetails();
  }, [favorId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!favor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{favor.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 font-semibold">
              {favor.user?.username?.[0] || favor.user?.email?.[0]}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-800">{favor.user?.username || favor.user?.email}</p>
            <p className="text-sm text-gray-500">{favor.distance}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
          <p className="text-gray-600">{favor.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Puntos</p>
            <p className="text-xl font-semibold text-indigo-600">{favor.points}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Fecha de publicación</p>
            <p className="text-lg font-medium text-gray-800">
              {new Date(favor.publication_date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Aceptar favor
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Contactar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavorDetailsModal; 