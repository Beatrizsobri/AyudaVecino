import FavorTypeIcon from './FavorTypeIcon';
import { Favor } from '../../types/favor';
import AcceptFavor from './AcceptFavor';

interface FavorListProps {
  favors: Favor[];
  loading: boolean;
  onFavorClick: (favorId: number) => void;
  onAccept: () => void;
}

const FavorList = ({ favors, loading, onFavorClick, onAccept }: FavorListProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 text-center">
          <p className="text-gray-600">Cargando favores...</p>
        </div>
      </div>
    );
  }

  if (!favors || favors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 text-center">
          <p className="text-gray-600">No hay favores disponibles en este distrito</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-200">
        {favors.map((favor) => (
          <div key={favor.id} className="p-4">
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <FavorTypeIcon type={favor.type} className="text-indigo-600" />
                      <h4 className="font-medium text-lg">{favor.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      por <span className="font-medium">{favor.creator?.username || 'Anónimo'}</span>
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(favor.publication_date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  {favor.district?.name || 'Distrito no especificado'} · {favor.type.charAt(0) + favor.type.slice(1).toLowerCase()}
                </p>
                <p className="mt-2 mb-3 text-gray-700">{favor.description}</p>
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full points-badge text-sm">
                    {favor.points} puntos
                  </span>
                  <div className="flex space-x-2">
                    <AcceptFavor favorId={favor.id} onAccept={onAccept} />
                    <button 
                      onClick={() => onFavorClick(favor.id)}
                      className="text-sm border border-gray-300 px-4 py-1 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavorList; 