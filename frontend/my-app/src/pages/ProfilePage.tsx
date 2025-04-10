import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/user';
import { User } from '../types/favor';
import { ROUTES } from '../constants/routes';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('reviews');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (err) {
        setError('Error al cargar el perfil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="gradient-bg h-32 relative">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-50 flex items-center shadow-sm"
          >
            <i className="fas fa-edit mr-2"></i> Editar Perfil
          </button>
        </div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end">
            <div className="flex items-end -mt-16">
              <div className="relative">
                <img 
                  className="h-32 w-32 rounded-full border-4 border-white object-cover" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="User profile"
                />
                <span className="absolute bottom-0 right-0 block h-6 w-6 rounded-full bg-green-500 ring-2 ring-white"></span>
                <button className="hidden absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-1 hover:bg-indigo-700">
                  <i className="fas fa-camera text-xs"></i>
                </button>
              </div>
              <div className="ml-6 mb-4">
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{user.first_name} {user.last_name}</h1>
                </div>
                <div className="mb-2">
                  <p className="text-gray-600">{user.district?.name || 'Sin distrito especificado'}</p>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star-half-alt text-yellow-400"></i>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">4.7 (28 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Editar Perfil</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input 
                  type="text" 
                  id="modal-name" 
                  defaultValue={`${user.first_name} ${user.last_name}`}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="modal-location" className="block text-sm font-medium text-gray-700">Ubicación</label>
                <input 
                  type="text" 
                  id="modal-location" 
                  defaultValue={user.district?.name || ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="modal-bio" className="block text-sm font-medium text-gray-700">Biografía</label>
                <textarea 
                  id="modal-bio" 
                  rows={3}
                  defaultValue={user.bio || ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="" 
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <button type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cambiar
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                type="button" 
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Cerrar Sesión</h3>
              <button 
                onClick={() => setIsSignOutModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <p className="text-gray-600 mb-6">¿Estás seguro de que quieres cerrar la sesión de tu cuenta?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsSignOutModalOpen(false)}
                type="button" 
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stats-card bg-white rounded-xl shadow-sm p-6 transition duration-150">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <i className="fas fa-hand-holding-heart text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Favores Dados</p>
              <h3 className="text-2xl font-bold text-gray-900">47</h3>
            </div>
          </div>
        </div>
        <div className="stats-card bg-white rounded-xl shadow-sm p-6 transition duration-150">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <i className="fas fa-hands-helping text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Favores Recibidos</p>
              <h3 className="text-2xl font-bold text-gray-900">32</h3>
            </div>
          </div>
        </div>
        <div className="stats-card bg-white rounded-xl shadow-sm p-6 transition duration-150">
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

      {/* About and Skills Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* About Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Sobre mí</h2>
            <button 
              onClick={() => setIsEditingAbout(!isEditingAbout)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>
          <div>
            {isEditingAbout ? (
              <>
                <textarea 
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                  rows={5}
                  defaultValue={user.bio || ''}
                ></textarea>
                <div className="mt-2 flex justify-end space-x-2">
                  <button 
                    onClick={() => setIsEditingAbout(false)}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button className="px-3 py-1 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700">
                    Guardar
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-600 mb-6">
                {user.bio || 'No hay información biográfica disponible.'}
              </p>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Habilidades y Servicios</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {user.skills?.map((skill, index) => (
              <span key={index} className="skill-badge bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
            <button 
              onClick={() => setIsAddingSkill(!isAddingSkill)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <i className="fas fa-plus-circle"></i> Añadir Habilidad
            </button>
          </div>
          {isAddingSkill && (
            <div className="mb-4">
              <div className="flex items-center">
                <input 
                  type="text" 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Introduce una nueva habilidad" 
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="bg-indigo-600 text-white px-3 py-2 rounded-r-md hover:bg-indigo-700">
                  Añadir
                </button>
                <button 
                  onClick={() => setIsAddingSkill(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Disponibilidad</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <i className="fas fa-calendar-week text-indigo-500 mr-2"></i>
            <span>Días laborables: Tardes después de las 18:00</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-calendar-week text-indigo-500 mr-2"></i>
            <span>Fines de semana: Horario flexible</span>
          </div>
        </div>
        
        {/* Verification & Badges */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Verificación y Insignias</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                <i className="fas fa-check"></i>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Verificado</h4>
                <p className="text-xs text-gray-500">Verificado el {new Date(user.date_joined).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                <i className="fas fa-check"></i>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Teléfono Verificado</h4>
                <p className="text-xs text-gray-500">Verificado el {new Date(user.date_joined).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Insignias Ganadas</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mx-auto mb-1">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                  <p className="text-xs font-medium">Super Ayudante</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mx-auto mb-1">
                    <i className="fas fa-bolt text-xl"></i>
                  </div>
                  <p className="text-xs font-medium">Respuesta Rápida</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-1">
                    <i className="fas fa-star text-xl"></i>
                  </div>
                  <p className="text-xs font-medium">5 Estrellas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button 
              className={`tab-button py-4 px-1 text-sm font-medium ${
                activeTab === 'reviews' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reseñas
            </button>
            <button 
              className={`tab-button py-4 px-1 text-sm font-medium ${
                activeTab === 'favors' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('favors')}
            >
              Favores Recientes
            </button>
            <button 
              className={`tab-button py-4 px-1 text-sm font-medium ${
                activeTab === 'settings' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Configuración de Cuenta
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className={`${activeTab === 'reviews' ? 'block' : 'hidden'}`}>
        {/* Reviews content will go here */}
      </div>
      <div className={`${activeTab === 'favors' ? 'block' : 'hidden'}`}>
        {/* Favors content will go here */}
      </div>
      <div className={`${activeTab === 'settings' ? 'block' : 'hidden'}`}>
        {/* Settings content will go here */}
      </div>
    </main>
  );
};

export default ProfilePage; 