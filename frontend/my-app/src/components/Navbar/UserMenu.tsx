import { useState } from "react";
import { logout } from "../../api/auth";
import { ROUTES } from '../../constants/routes';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const UserMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className="ml-3 relative">
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="sr-only">Abrir menú de usuario</span>
        <img
          className="h-8 w-8 rounded-full"
          src={user?.profile_picture}
          alt="User"
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <a
            href={ROUTES.PROFILE}
            className={`block px-4 py-2 text-sm ${
              isActiveRoute(ROUTES.PROFILE)
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
  );
};

export default UserMenu;
