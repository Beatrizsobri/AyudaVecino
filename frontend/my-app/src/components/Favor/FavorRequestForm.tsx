import { useState, useEffect } from 'react';
import { createFavor, updateFavor } from '../../api/favor';
import { useUser } from '../../contexts/UserContext';
import { getDistricts } from '../../api/district';

interface FavorRequestFormProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
    district: string;
  }) => void;
  initialData?: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
    district: string;
  };
  favorId?: number;
}

export const FavorRequestForm = ({ onClose, onSubmit, initialData, favorId }: FavorRequestFormProps) => {
  const { refreshUser } = useUser();
  
  // Función para formatear la fecha al formato YYYY-MM-DD
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    deadline: initialData ? formatDateForInput(initialData.deadline) : '',
    description: initialData?.description || '',
    type: initialData?.type || '',
    points: initialData?.points || '',
    district: initialData?.district || ''
  });
  const [error, setError] = useState<string | null>(null);
  const [districts, setDistricts] = useState<Array<{ id: number; name: string }>>([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const districtsData = await getDistricts();
        setDistricts(districtsData?.results || []);
      } catch (error) {
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate points are not negative
    if (parseInt(formData.points) < 0) {
      setError('Los puntos no pueden ser negativos');
      return;
    }

    // Validate deadline is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.deadline);
    
    if (selectedDate < today) {
      setError('La fecha límite no puede ser anterior al día de hoy');
      return;
    }

    if (!formData.district) {
      setError('Debes seleccionar un distrito');
      return;
    }

    try {
      if (initialData && favorId) {
        // Editing mode
        await updateFavor(favorId, { ...formData, district_id: formData.district });
      } else {
        // Creation mode
        await createFavor({ ...formData, district_id: formData.district });
      }
      await refreshUser();
      onSubmit(formData);
      onClose();
    } catch (error: any) {
      console.error('Error al crear/modificar el favor:', error);
      if (error.response?.status === 400) {
        setError(error.response.data.error);
      } else {
        setError('Ha ocurrido un error al crear/modificar el favor');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'points') {
      if (parseInt(value) < 0) {
        setError('Los puntos no pueden ser negativos');
        return;
      } else {
        setError(null);
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999999]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative z-[1000000]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Pedir Favor</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Favor
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="HOME">Hogar</option>
                  <option value="TRANSPORT">Transporte</option>
                  <option value="PETS">Mascotas</option>
                  <option value="TECH">Tecnología</option>
                  <option value="CLASS">Clases</option>
                  <option value="COOKING">Cocina</option>
                  <option value="PLUMBING">Fontanería</option>
                  <option value="CARPENTRY">Carpintería</option>
                  <option value="ERRANDS">Recados</option>
                  <option value="SHOPPING">Compra</option>
                </select>
              </div>

              <div>
                <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                  Puntos
                </label>
                <input
                  type="number"
                  id="points"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  Distrito
                </label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Selecciona un distrito</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition duration-150"
              >
                {initialData ? 'Modificar' : 'Pedir'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 