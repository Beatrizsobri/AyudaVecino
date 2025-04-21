import { useState } from "react";
import './navbar.scss';
import { ROUTES } from '../../constants/routes';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import UserMenu from './UserMenu';

const Navbar = () => {
  const location = useLocation();
  const { user } = useUser();

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Main Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-handshake text-indigo-600 text-2xl mr-2"></i>
              <span className="text-xl font-bold text-indigo-600">AyudaVecino</span>
            </div>
            <div className="sm:ml-6 flex space-x-8">
              {[{name:"Home", 
                url: ROUTES.HOME}, 
                { name: "Mis favores", 
                  url: ROUTES.MY_FAVORS,
                }, 
                { name: "Favores por barrio", 
                  url: ROUTES.BOARD,
                },
                { name: "Historial de puntos", 
                  url: ROUTES.TRANSACTIONS
                }].map(
                  (item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActiveRoute(item.url)
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      {item.name}
                    </a>
                  )
              )}
            </div>
          </div>

          {/* User Navigation */}
          <div className="flex items-center">
            <div className="ml-4 flex items-center space-x-4">
              <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
                <i className="fas fa-coins text-indigo-600 mr-2"></i>
                <span className="font-medium text-indigo-600">{user?.points || 0} pts</span>
              </div>
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
