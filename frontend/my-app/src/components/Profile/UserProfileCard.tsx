import { useUser } from '../../contexts/UserContext';

const UserProfileCard = () => {
  const { user } = useUser();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex flex-col items-center space-y-5">
        {/* User Photo */}
        <div className="relative">
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden ring-2 ring-gray-100">
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
          <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white rounded-full px-3 py-1 text-sm font-medium">
            {user?.points || 0} pts
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <button 
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            onClick={() => {/* TODO: Implement pedir favor */}}
          >
            Pedir un favor
          </button>
          <button 
            className="w-full bg-white text-indigo-600 py-2.5 rounded-lg font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors"
            onClick={() => {/* TODO: Implement ver historial */}}
          >
            Ver mi historial de puntos
          </button>
          <button 
            className="w-full bg-white text-indigo-600 py-2.5 rounded-lg font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors"
            onClick={() => {/* TODO: Implement ver favores */}}
          >
            Ver Favores disponibles
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard; 