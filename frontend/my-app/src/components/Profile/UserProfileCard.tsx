import { useUser } from '../../contexts/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { FavorRequestForm } from '../Favor/FavorRequestForm';

const UserProfileCard = () => {
  const { user, refreshUser } = useUser();
  const navigate = useNavigate();
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex flex-col items-center space-y-5">
        {/* User Photo */}
        <div className="relative">
          <div className="w-36 h-36 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden ring-2 ring-gray-100">
            <img 
              src={user?.profile_image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"}
              alt="User profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-indigo-600 px-3 py-1 rounded-full">
            <span className="font-medium text-white">{user?.points || 0} pts</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <button 
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            onClick={() => setIsRequestFormOpen(true)}
          >
            Pedir un favor
          </button>
          <button 
            className="w-full bg-white text-indigo-600 py-2.5 rounded-lg font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors"
            onClick={() => navigate(ROUTES.TRANSACTIONS)}
          >
            Ver mi historial de puntos
          </button>
          <button 
            className="w-full bg-white text-indigo-600 py-2.5 rounded-lg font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors"
            onClick={() => navigate(ROUTES.BOARD)}
          >
            Ver Favores disponibles
          </button>
        </div>
      </div>

      {/* Favor Request Modal */}
      {isRequestFormOpen && (
        <FavorRequestForm
          onClose={() => setIsRequestFormOpen(false)}
          onSubmit={async () => {
            setIsRequestFormOpen(false);
            await refreshUser();
          }}
        />
      )}
    </div>
  );
};

export default UserProfileCard; 