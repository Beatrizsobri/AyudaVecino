import { useState, useEffect } from 'react';
import Tabs from "../components/Tab/Tab";
import Hero from '../components/Hero/Hero';
import StatusSelector from '../components/StatusSelector/StatusSelector';
import { Pagination } from '../components/Pagination/Pagination';
import { Favor } from '../types/favor';
import { getCreatedFavors, getAcceptedFavors } from '../api/favor';
import FavorCard from '../components/FavorCard/FavorCard';

export const MyFavorsPage = () => {
  const [favors, setFavors] = useState<Favor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requested');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchFavors = async () => {
    try {
      setLoading(true);
      let response;
      if (activeTab === 'requested') {
        response = await getCreatedFavors(currentPage, selectedStatus);
      } else {
        response = await getAcceptedFavors(currentPage, selectedStatus);
      }
      
      console.log('API Response:', response);
      setFavors(response.results);
      setTotalItems(response.count);
      const calculatedPages = Math.ceil(response.count / 6);
      console.log('Total Items:', response.count, 'Calculated Pages:', calculatedPages);
      setTotalPages(calculatedPages);
    } catch (error) {
      console.error('Error fetching favors:', error);
      setFavors([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavors();
  }, [activeTab, currentPage, selectedStatus]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSubmit = async (data: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
  }) => {
    try {
      const response = await getCreatedFavors(currentPage, selectedStatus);
      setFavors(response.results);
      setTotalItems(response.count);
      setTotalPages(Math.ceil(response.count / 6));
    } catch (error) {
      console.error('Error creating favor:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Hero 
        title="Mis Favores"
        text="Sigue los favores solicitados y los favores en los que estás ayudando"
        buttonText="Solicitar un Favor"
        isModalButton
        onModalSubmit={handleSubmit}
      />
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <Tabs onTabChange={handleTabChange} activeTab={activeTab} />
          <div className="w-64">
            <StatusSelector onStatusChange={handleStatusChange} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favors.map((favor) => (
            <FavorCard 
              key={favor.id}
              favor={favor}
              onFavorChange={fetchFavors}
            />
          ))}
        </div>
        {!loading && totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorsPage;