import React from 'react';
import { Favor } from '../../types/favor';
import FavorCard from '../FavorCard/FavorCard';

interface FavorListProps {
  favors: Favor[];
  loading: boolean;
  onAccept?: () => void;
}

const FavorList: React.FC<FavorListProps> = ({ favors, loading, onAccept }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        <div className="col-span-full text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando favores...</p>
        </div>
      ) : favors.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-600">No hay favores disponibles en este momento</p>
        </div>
      ) : (
        favors.map((favor) => (
          <FavorCard 
            key={favor.id}
            favor={favor}
            onAccept={onAccept}
          />
        ))
      )}
    </div>
  );
};

export default FavorList; 