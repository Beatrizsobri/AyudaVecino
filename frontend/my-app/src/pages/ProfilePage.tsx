import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { User } from '../types/favor';
import EditProfileModal from '../components/Profile/EditProfileModal';
import StatsCards from '../components/Profile/StatsCards';
import ContactInfo from '../components/Profile/ContactInfo';

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
                  src={user.profile_picture} 
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
          <StatsCards user={user} />
        </div>
      </div>

      <ContactInfo user={user} />

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