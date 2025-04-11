import React from 'react';
import { User } from '../../types/favor';

interface StatsCardsProps {
  user: User;
}

const StatsCards: React.FC<StatsCardsProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto h-32 items-center">
      <div className="stats-card bg-white rounded-xl shadow-sm p-6 transition duration-150 hover:shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <i className="fas fa-hand-holding-heart text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Favores Dados</p>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
          </div>
        </div>
      </div>
      <div className="stats-card bg-white rounded-xl shadow-sm p-6 transition duration-150 hover:shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <i className="fas fa-hands-helping text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Favores Recibidos</p>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
          </div>
        </div>
      </div>
      <div className="stats-card bg-white rounded-xl shadow-sm p-6 transition duration-150 hover:shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <i className="fas fa-coins text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Puntos Actuales</p>
            <h3 className="text-2xl font-bold text-gray-900">{user.points}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards; 