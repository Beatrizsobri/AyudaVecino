import './navbar.scss';
import { ROUTES } from '../../constants/routes';

const NavbarUnlog = () => {

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <img src={require('../../assets/logocolortitle.png')} alt="Ayuda Vecino Logo" className="h-28 w-auto" />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <a href={ROUTES.SIGN_IN} className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 transition duration-150 btn-hover">
                        Entrar
                    </a>
                    <a href={ROUTES.SIGN_UP} className="px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 transition duration-150 btn-hover">
                        Crear cuenta
                    </a>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default NavbarUnlog;
