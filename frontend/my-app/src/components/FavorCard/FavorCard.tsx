import React from 'react';
import { Favor } from '../../types/favor';
import { getFavorTypeIcon } from '../../utils/favorUtils';
import { TYPE_CHOICES } from '../../types/favorTypes';

interface FavorCardProps {
  favor: Favor;
}

const FavorCard: React.FC<FavorCardProps> = ({ favor }) => {
  const typeLabel = TYPE_CHOICES[favor.type];
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
  );
};

export default FavorCard; 