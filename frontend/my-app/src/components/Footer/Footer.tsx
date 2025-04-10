
const Footer = () => {

  return (
    <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">AyudaVecino</h3>
                    <p className="text-gray-400 text-sm">Intercambia favores con tus vecinos usando nuestro sistema de puntos.</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Sobre nosotros</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white text-sm">Como funciona</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white text-sm">Sistema de puntos</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white text-sm">Seguridad</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white text-sm">Historias de éxito</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white text-sm">Help Center</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white text-sm">Community Guidelines</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
                <p>© 2023 AyudaVecino, Inc. All rights reserved.</p>
            </div>
        </div>
    </footer>

  );
};

export default Footer;
