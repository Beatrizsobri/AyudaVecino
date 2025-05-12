import React from 'react';

const PoliticaPrivacidad = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Información que Recopilamos</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Información Personal</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Información de Uso</h3>
              <p className="text-gray-700">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Uso de la Información</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Propósitos</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lorem ipsum dolor sit amet</li>
                <li>• Consectetur adipiscing elit</li>
                <li>• Sed do eiusmod tempor</li>
                <li>• Ut enim ad minim veniam</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Compartir Información</h3>
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
          <h2 className="text-2xl font-semibold mb-4">Derechos del Usuario</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Acceso a Datos</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Rectificación</h3>
              <p className="text-gray-700">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Eliminación</h3>
              <p className="text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              Para cualquier consulta sobre nuestra política de privacidad, por favor contacta a:
            </p>
            <div className="mt-4">
              <p className="text-gray-700">Email: privacidad@ayudavecino.com</p>
              <p className="text-gray-700">Teléfono: +34 XXX XXX XXX</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad; 