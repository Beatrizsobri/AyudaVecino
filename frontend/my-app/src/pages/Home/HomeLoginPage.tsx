import { useState, useEffect } from 'react';
import { getDistricts } from '../../api/district';
import { getFavorsByDistrict } from '../../api/favor';
import { Favor } from '../../types/favor';
import Hero from '../../components/Hero/Hero';
import { useUser } from '../../contexts/UserContext';
import { District } from '../../types/district';
import FavorList from '../../components/Favor/FavorList';
import FavorDetailsModal from '../../components/Favor/FavorDetailsModal';

const HomeLoginPage = () => {
  const { user } = useUser();
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState(1);
  const [favors, setFavors] = useState<Favor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFavorId, setSelectedFavorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const data = await getDistricts();
        setDistricts(data.results);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    const fetchFavors = async () => {
      setLoading(true);
      try {
        const data = await getFavorsByDistrict(selectedDistrict);
        setFavors(data.results || []);
      } catch (error) {
        console.error('Error fetching favors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavors();
  }, [selectedDistrict]);

  const handleFavorClick = (favorId: number) => {
    setSelectedFavorId(favorId);
  };

  const handleAccept = async () => {
    // Refresh the favors list after accepting a favor
    const data = await getFavorsByDistrict(selectedDistrict);
    setFavors(data.results || []);
  };

  const handleSubmit = async (data: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
  }) => {
    try {
      // You might want to refresh the favors list here
    } catch (error) {
      console.error('Error creating favor:', error);
    }
  };

  return (
    <div className="relative">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero 
          title={`Bienvenid@, ${user?.first_name}!`}
          text={`Tienes ${user?.points || 0} pts disponibles para pedir favores`}
          buttonText="Solicitar un Favor"
          isModalButton
          onModalSubmit={handleSubmit}
        />

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3">
            {/* District Selector */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Seleccionar Distrito</h2>
                <div className="relative">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(Number(e.target.value))}
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Favor Feed */}
            <FavorList
              favors={favors}
              loading={loading}
              onFavorClick={handleFavorClick}
              onAccept={handleAccept}
            />
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:w-1/3">
            {/* Points Summary */}
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
          </div>
        </div>
      </main>
      {selectedFavorId && (
        <div className="fixed inset-0 z-[9999]">
          <FavorDetailsModal
            favorId={selectedFavorId}
            onClose={() => setSelectedFavorId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default HomeLoginPage;
