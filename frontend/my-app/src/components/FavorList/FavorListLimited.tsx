import React from 'react';
import { Favor } from '../../types/favor';
import FavorCard from '../FavorCard/FavorCard';

interface FavorListLimitedProps {
  favors: Favor[];
  loading: boolean;
}

const FavorListLimited: React.FC<FavorListLimitedProps> = ({ favors, loading }) => {
  // Tomar solo los primeros 2 favores
  const limitedFavors = favors.slice(0, 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading ? (
        <div className="col-span-full text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando favores...</p>
        </div>
      ) : limitedFavors.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-600">No hay favores disponibles en este momento</p>
        </div>
      ) : (
        limitedFavors.map((favor) => (
          <FavorCard 
            key={favor.id}
            favor={favor}
          />
        ))
      )}
    </div>
  );
};

export default FavorListLimited; 