import { useState } from 'react';

interface StatusSelectorProps {
  onStatusChange: (status: string) => void;
}

const StatusSelector = ({ onStatusChange }: StatusSelectorProps) => {
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [isOpen, setIsOpen] = useState(false);

  const statuses = [
    { id: 'ALL', label: 'Todos los estados' },
    { id: 'PENDING', label: 'Pendientes' },
    { id: 'ACCEPTED', label: 'Aceptados' },
    { id: 'CANCELLED', label: 'Cancelados' }
  ];

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    onStatusChange(status);
    setIsOpen(false);
  };

  const currentStatus = statuses.find(status => status.id === selectedStatus)?.label || 'Todos los estados';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <div className="flex items-center justify-between">
          <span>{currentStatus}</span>
          <i className={`fas fa-chevron-down text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}></i>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="py-1">
            {statuses.map(status => (
              <button
                key={status.id}
                onClick={() => handleStatusClick(status.id)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  selectedStatus === status.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSelector; 