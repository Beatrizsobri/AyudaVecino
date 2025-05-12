import React from 'react';

const Seguridad = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Seguridad en AyudaVecino</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Protección de Datos</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Medidas de Seguridad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Verificación de Usuarios</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Encriptación de Datos</h3>
              <p className="text-gray-700">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Consejos de Seguridad</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <div>
                <h3 className="text-lg font-medium">Verifica la Identidad</h3>
                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <div>
                <h3 className="text-lg font-medium">Comunica por la Plataforma</h3>
                <p className="text-gray-700">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <div>
                <h3 className="text-lg font-medium">Reporta Comportamientos Sospechosos</h3>
                <p className="text-gray-700">Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Seguridad; 