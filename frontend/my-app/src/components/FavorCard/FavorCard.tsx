import React, { useState } from 'react';
import { Favor, TYPE_CHOICES } from '../../types/favor';
import { getFavorTypeIcon, getFavorTypeImage } from '../../utils/favorUtils';
import { acceptFavor, cancelFavor, updateFavor } from '../../api/favor';
import { useUser } from '../../contexts/UserContext';
import { FavorRequestForm } from '../Favor/FavorRequestForm';

interface FavorCardProps {
  favor: Favor;
  onAccept?: () => void;
  onFavorChange?: () => void;
}

const FavorCard: React.FC<FavorCardProps> = ({ favor, onAccept, onFavorChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const typeLabel = TYPE_CHOICES[favor.type];
  const { user, refreshUser } = useUser();
  const isMyFavor = user?.id === favor.creator?.id;
  
  const handleAcceptFavor = async () => {
    try {
      await acceptFavor(favor.id);
      await refreshUser();
      if (onAccept) {
        onAccept();
      }
      if (onFavorChange) {
        onFavorChange();
      }
    } catch (error) {
      console.error('Error accepting favor:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await cancelFavor(favor.id);
      await refreshUser();
      if (onFavorChange) {
        onFavorChange();
      }
    } catch (error) {
      console.error('Error canceling favor:', error);
    }
    setShowMenu(false);
  };

  const renderStatusButton = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const favorDate = new Date(favor.deadline);
    favorDate.setHours(0, 0, 0, 0);
    const isOldFavor = favorDate < today;
    const isMyFavor = user?.id === favor.creator?.id;

    switch (favor.status) {
      case 'PENDING':
        return (
          <button 
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition duration-150 ${
              isOldFavor || isMyFavor
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            onClick={handleAcceptFavor}
            disabled={isOldFavor || isMyFavor}
            title={isMyFavor ? "No puedes aceptar tu propio favor" : ""}
          >
            {isOldFavor ? 'Favor expirado' : 'Aceptar Favor'}
          </button>
        );
      case 'ACCEPTED':
        return (
          <div className="flex-1 flex items-center justify-center py-2 px-3 bg-green-100 text-green-800 rounded-lg text-xs font-medium">
            <span>Favor aceptado</span>
          </div>
        );
      case 'CANCELLED':
        return (
          <div className="flex-1 flex items-center justify-center py-2 px-3 bg-red-100 text-red-800 rounded-lg text-xs font-medium">
            <span>Favor cancelado</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
    setShowMenu(false);
  };

  const handleEditSubmit = async (formData: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
  }) => {
    try {
      await updateFavor(favor.id, formData);
      await refreshUser();
      if (onFavorChange) {
        onFavorChange();
      }
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating favor:', error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="relative z-0">
          <img 
            src={favor.img || getFavorTypeImage(typeLabel)} 
            alt={favor.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i> {favor.district.name}
          </div>
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <i className={`fas ${getFavorTypeIcon(typeLabel)} mr-1`}></i> {typeLabel}
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
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <img 
                  src={favor.creator?.profile_image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"} 
                  alt={favor.creator?.first_name || 'Usuario'} 
                  className="w-6 h-6 rounded-full mr-2"
                />
                <div>
                  <p className="text-xs font-medium">{favor.creator?.first_name || 'Anónimo'}</p>
                  <p className="text-[10px] text-gray-500">Creador</p>
                </div>
              </div>
              <div className="flex items-center">
                <img 
                  src={favor.assigned_user?.profile_image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"} 
                  alt={favor.assigned_user?.first_name || 'Usuario asignado'} 
                  className="w-6 h-6 rounded-full mr-2"
                />
                <div>
                  <p className={`text-xs font-medium ${favor.assigned_user ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {favor.assigned_user?.first_name || 'Sin asignar'}
                  </p>
                  <p className="text-[10px] text-gray-500">Asignado</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-indigo-600">+{favor.points} pts</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {renderStatusButton()}
            {isMyFavor && favor.status !== 'CANCELLED' && (
              <div className="relative">
                <button 
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <i className="fas fa-ellipsis-h text-gray-500"></i>
                </button>
                {showMenu && (
                  <div className="absolute right-0 bottom-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    {!favor.assigned_user && (
                      <button 
                        className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={handleEdit}
                      >
                        <i className="fas fa-edit mr-2"></i>
                        Modificar
                      </button>
                    )}
                    <button 
                      className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-gray-100 flex items-center"
                      onClick={handleDelete}
                    >
                      <i className="fas fa-trash-alt mr-2"></i>
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showEditForm && (
        <FavorRequestForm
          onClose={() => setShowEditForm(false)}
          onSubmit={handleEditSubmit}
          initialData={{
            title: favor.title,
            deadline: favor.deadline,
            description: favor.description,
            type: favor.type,
            points: favor.points.toString()
          }}
          favorId={favor.id}
        />
      )}
    </>
  );
};

export default FavorCard; 