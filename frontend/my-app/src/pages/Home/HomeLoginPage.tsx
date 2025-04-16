import { useState, useEffect } from 'react';
import { getDistricts } from '../../api/district';
import { getFavorsByDistrict } from '../../api/favor';
import FavorDetailsModal from '../../components/FavorDetailsModal';
import FavorList from '../../components/FavorList';
import { Favor } from '../../types/favor';
import Hero from '../../components/Hero/Hero';
import { useUser } from '../../contexts/UserContext';

interface District {
  id: number;
  name: string;
  postal_code: string;
}

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
          title="Bienvenid@, Bea!"
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
            {/* My Active Favors */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">Mis favores activos</h2>
              <div className="space-y-4">
                {[
                  { title: "Dog walking", status: "Pending acceptance", points: 25 },
                  { title: "Furniture assembly", status: "In progress", points: 40 },
                ].map((favor, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{favor.title}</p>
                        <p className="text-sm text-gray-500">{favor.status}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full points-badge text-xs">{favor.points} pts</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-500">Publicado hace un día</span>
                      <button className="text-indigo-600 hover:text-indigo-800">Ver</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Points Summary */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Resumen de puntos</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Puntos disponibles</span>
                  <span className="font-medium">125</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700">
                Ver el historial completo
              </button>
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
