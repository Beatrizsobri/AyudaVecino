import React from 'react';
import { User } from '../../types/favor';

interface ContactInfoProps {
  user: User;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <i className="fas fa-envelope text-lg"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900">{user.email || 'Email no especificado'}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <i className="fas fa-phone text-lg"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="text-gray-900">{user.phone_number || 'Teléfono no especificado'}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <i className="fas fa-map-marker-alt text-lg"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Distrito</p>
            <p className="text-gray-900">{user.district?.name || 'Distrito no especificado'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 