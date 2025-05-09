import { useState, useEffect } from 'react';
import { getAcceptedFavors, getCreatedFavors } from '../../api/favor';
import { Favor } from '../../types/favor';
import Hero from '../../components/Hero/Hero';
import { useUser } from '../../contexts/UserContext';
import FavorListLimited from '../../components/FavorList/FavorListLimited';
import FavorDetailsModal from '../../components/Favor/FavorDetailsModal';
import UserProfileCard from '../../components/Profile/UserProfileCard';

const HomeLoginPage = () => {
  const { user } = useUser();
  const [acceptedFavors, setAcceptedFavors] = useState<Favor[]>([]);
  const [createdFavors, setCreatedFavors] = useState<Favor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFavorId, setSelectedFavorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const [acceptedFavors, createdFavors] = await Promise.all([
          getAcceptedFavors(1, 'ACCEPTED', today),
          getCreatedFavors(1, 'ACCEPTED', today)
        ]);
        setAcceptedFavors(acceptedFavors.results);
        setCreatedFavors(createdFavors.results);
      } catch (error) {
        console.error('Error fetching favors:', error);
      }
    };

    fetchData();
  }, []);

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
            {/* Favor Feed */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Voy a ayudar próximamente</h3>
              </div>
              <FavorListLimited
                favors={acceptedFavors}
                loading={loading}
              />
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Me van a ayudar próximamente</h3>
              </div>
              <FavorListLimited
                favors={createdFavors}
                loading={loading}
              />
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:w-1/3">
            <UserProfileCard />
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

