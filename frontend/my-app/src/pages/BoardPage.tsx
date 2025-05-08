import React, { useState, useEffect } from 'react';
import { getDistricts } from '../api/district';
import { getFavors } from '../api/favor';
import Hero from '../components/Hero/Hero';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import { Favor, TYPE_CHOICES } from '../types/favor';
import { Pagination } from '../components/Pagination/Pagination';
import FavorList from '../components/FavorList/FavorList';
import { getFavorTypeIcon } from '../utils/favorUtils';
import { useUser } from '../contexts/UserContext';

const Board: React.FC = () => {
  const { refreshUser } = useUser();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [districts, setDistricts] = useState<Array<{ id: number; name: string }>>([]);
  const [favors, setFavors] = useState<Favor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const districtsData = await getDistricts();
        setDistricts(districtsData?.results || []);
      } catch (error) {
        console.error('Error fetching districts:', error);
        setDistricts([]);
      }
    };

    fetchDistricts();
  }, []);

  const fetchFavors = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (selectedDistrict) filters.district_id = selectedDistrict;
      if (selectedType) filters.type = selectedType;
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        filters.start_date = start.toLocaleDateString('en-CA');
        
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filters.end_date = end.toLocaleDateString('en-CA');
      }
      
      const response = await getFavors(filters, currentPage);
      setFavors(response.results || []);
      setTotalPages(Math.ceil(response.count / 6));
    } catch (error) {
      console.error('Error fetching favors:', error);
      setFavors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavors();
  }, [currentPage, selectedDistrict, selectedType, startDate, endDate]);

  const handleAcceptFavor = async () => {
    await fetchFavors();
    await refreshUser();
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Hero 
        title="Favores Disponibles"
        text="Encuentra favores en los que puedas ayudar y gana puntos"
        buttonText="Solicitar un Favor"
        isModalButton
        onModalSubmit={handleSubmit}
      />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-semibold mb-4 md:mb-0">Favores Cercanos</h2>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <select 
                className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={selectedDistrict || ''}
                onChange={(e) => setSelectedDistrict(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Selecciona el distrito</option>
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
            
            <div className="relative">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                locale={es}
                dateFormat="dd/MM/yyyy"
                className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full"
                placeholderText="Selecciona rango de fechas"
                isClearable={true}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="fas fa-calendar text-xs"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            className={`category-pill px-4 py-1 rounded-full border text-sm ${!selectedType ? 'border-indigo-500 text-indigo-500' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setSelectedType(null)}
          >
            Todos
          </button>
          {Object.entries(TYPE_CHOICES).map(([key, value]) => (
            <button 
              key={key}
              className={`category-pill px-4 py-1 rounded-full border text-sm ${selectedType === key ? 'border-indigo-500 text-indigo-500' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setSelectedType(key)}
            >
              <i className={`fas ${getFavorTypeIcon(value)} mr-1`}></i> {value}
            </button>
          ))}
        </div>
      </div>
      
      {/* Favors grid */}
      <FavorList 
        favors={favors}
        loading={loading}
        onAccept={handleAcceptFavor}
      />

      {/* Add Pagination */}
      {!loading && favors.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Board; 