import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Navigation: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link to={ROUTES.MY_FAVORS} className="text-gray-700 hover:text-gray-900">
          Mis Favores
        </Link>
        <Link to={ROUTES.BOARD} className="text-gray-700 hover:text-gray-900">
          Tablón de Favores
        </Link>
        <Link to={ROUTES.TRANSACTIONS} className="text-gray-700 hover:text-gray-900">
          Transacciones
        </Link>
      </div>
    </div>
  );
};

export default Navigation; 