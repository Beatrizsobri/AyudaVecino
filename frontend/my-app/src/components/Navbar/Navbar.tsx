import { useState } from "react";
import './navbar.scss';
import { logout } from "../../api/auth";
import { ROUTES } from '../../constants/routes';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

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
                { name: "Favores en mi barrio", 
                  url: ROUTES.BOARD,
                },
                { name: "Transacciones", 
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
                <span className="font-medium text-indigo-600">125 pts</span>
              </div>
              <button className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <i className="fas fa-bell text-xl"></i>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <div className="ml-3 relative">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Abrir menú de usuario</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a
                        href={ROUTES.HOME}
                        className={`block px-4 py-2 text-sm ${
                          isActiveRoute(ROUTES.HOME)
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Mi perfil
                      </a>
                      <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Salir
                        </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
