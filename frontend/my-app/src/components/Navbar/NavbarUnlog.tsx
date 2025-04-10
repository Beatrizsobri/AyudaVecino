import './navbar.scss';

const NavbarUnlog = () => {

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <i className="fas fa-handshake text-indigo-600 text-2xl mr-2"></i>
                        <span className="text-xl font-bold text-indigo-600">AyudaVecino</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <a href="/signin" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 transition duration-150 btn-hover">
                        Entrar
                    </a>
                    <a href="/signup" className="px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 transition duration-150 btn-hover">
                        Crear cuenta
                    </a>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default NavbarUnlog;
