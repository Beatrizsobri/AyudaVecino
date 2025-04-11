import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { User } from '../types/favor';
import EditProfileModal from '../components/EditProfileModal';

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!user) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="gradient-bg h-40 relative">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-50 flex items-center shadow-sm z-10"
          >
            <i className="fas fa-edit mr-2"></i> Editar Perfil
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end -mt-16">
              <div className="relative">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg" 
                  src={user.profile_picture || `https://www.gravatar.com/avatar/${user.email}?d=identicon&s=150`} 
                  alt="User profile"
                />
              </div>
              <div className="ml-8 mb-4">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user.first_name && user.last_name 
                    ? `${user.first_name} ${user.last_name}`
                    : user.username || 'Usuario sin nombre'}
                </h1>
                <p className="text-white text-lg">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {user.district?.name || 'Distrito no especificado'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 pb-8 relative z-10">
          {/* Stats Cards */}
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
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <i className="fas fa-envelope text-lg"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{user.email || 'Email no especificado'}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <i className="fas fa-phone text-lg"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-gray-900">{user.phone_number || 'Teléfono no especificado'}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <i className="fas fa-map-marker-alt text-lg"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Distrito</p>
              <p className="text-gray-900">{user.district?.name || 'Distrito no especificado'}</p>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onUpdate={(updatedUser) => {
          // El contexto ya maneja la actualización
          setIsEditModalOpen(false);
        }}
      />
    </main>
  );
};

export default ProfilePage; 