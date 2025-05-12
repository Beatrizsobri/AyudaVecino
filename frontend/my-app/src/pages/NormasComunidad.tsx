import React from 'react';

const NormasComunidad = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Normas de la Comunidad</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Principios Fundamentales</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Reglas de Conducta</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Respeto Mutuo</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Comunicación Clara</h3>
              <p className="text-gray-700">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Honestidad</h3>
              <p className="text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Prohibiciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3 text-red-700">No Permitido</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lorem ipsum dolor sit amet</li>
                <li>• Consectetur adipiscing elit</li>
                <li>• Sed do eiusmod tempor</li>
                <li>• Ut enim ad minim veniam</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3 text-green-700">Recomendado</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lorem ipsum dolor sit amet</li>
                <li>• Consectetur adipiscing elit</li>
                <li>• Sed do eiusmod tempor</li>
                <li>• Ut enim ad minim veniam</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Sanciones</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-gray-700">Primera infracción: Advertencia</p>
              </div>
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-gray-700">Segunda infracción: Suspensión temporal</p>
              </div>
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-gray-700">Tercera infracción: Baneo permanente</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NormasComunidad; 