import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { MADRID_DISTRICTS } from '../constants/districts';
import { getDistricts } from '../api/district';
import { getFavors } from '../api/favor';
import Hero from '../components/Hero/Hero';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import { Favor } from '../types/favor';

const TYPE_CHOICES: Record<string, string> = {
  'HOME': 'Hogar',
  'TRANSPORT': 'Transporte',
  'PETS': 'Mascotas',
  'TECH': 'Tecnología',
  'CLASS': 'Clases',
  'COOKING': 'Cocina',
  'PLUMBING': 'Fontanería',
  'CARPENTRY': 'Carpintería',
  'ERRANDS': 'Recados',
  'SHOPPING': 'Compra',
};

const Board: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [districts, setDistricts] = useState<Array<{ id: number; name: string }>>([]);
  const [favors, setFavors] = useState<Favor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const districtsData = await getDistricts();
        setDistricts(districtsData?.results || []);
      } catch (error) {
        console.error('Error fetching districts:', error);
        setDistricts([]); // Ensure districts is always an array even on error
      }
    };

    fetchDistricts();
  }, []);

  useEffect(() => {
    const fetchFavors = async () => {
      setLoading(true);
      try {
        const filters: any = {};
        if (selectedDistrict) filters.district_id = selectedDistrict;
        if (selectedType) filters.type = selectedType;
        
        // Solo añadir fechas si tenemos un rango válido
        if (startDate && endDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          filters.start_date = start.toLocaleDateString('en-CA');
          
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          filters.end_date = end.toLocaleDateString('en-CA');
        }
        
        const favorsData = await getFavors(filters);
        setFavors(favorsData?.results || []);
      } catch (error) {
        console.error('Error fetching favors:', error);
        setFavors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavors();
  }, [selectedDistrict, startDate, endDate, selectedType]);

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

  const getFavorTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hogar':
        return 'fa-home text-blue-500';
      case 'transporte':
        return 'fa-car text-green-500';
      case 'mascotas':
        return 'fa-paw text-purple-500';
      case 'tecnología':
        return 'fa-laptop-code text-red-500';
      case 'clases':
        return 'fa-book text-yellow-500';
      case 'cocina':
        return 'fa-utensils text-pink-500';
      case 'fontanería':
        return 'fa-wrench text-blue-500';
      case 'carpintería':
        return 'fa-hammer text-brown-500';
      case 'recados':
        return 'fa-shopping-bag text-purple-500';
      case 'compra':
        return 'fa-shopping-cart text-green-500';
      default:
        return 'fa-question-circle text-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero 
        title="Favores Disponibles"
        text="Encuentra favores en los que puedas ayudar y gana puntos"
        buttonText="Solicitar un Favor"
        isModalButton
        onModalSubmit={handleSubmit}
      />

      {/* Filters and map */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando favores...</p>
          </div>
        ) : favors.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">No hay favores disponibles en este momento</p>
          </div>
        ) : (
          favors.map((favor) => (
            <div key={favor.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative z-0">
                <img 
                  src={favor.img || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"} 
                  alt={favor.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i> {favor.district.name}
                </div>
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <i className={`fas ${getFavorTypeIcon(TYPE_CHOICES[favor.type])} mr-1`}></i> {TYPE_CHOICES[favor.type]}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{favor.title}</h3>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  {new Date(favor.deadline).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <p className="text-gray-600 text-sm mb-4">{favor.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img 
                      src={favor.creator?.profile_image || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"} 
                      alt={favor.creator?.username || 'Usuario'} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-sm font-medium">{favor.creator?.username || 'Anónimo'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">+{favor.points} pts</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-150">
                    Aceptar Favor
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i className="fas fa-ellipsis-h text-gray-500"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Board; 