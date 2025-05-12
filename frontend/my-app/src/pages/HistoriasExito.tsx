import React from 'react';

const HistoriasExito = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Historias de Éxito</h1>
      
      <div className="space-y-12">
        <article className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <h2 className="text-xl font-semibold">María González</h2>
              <p className="text-gray-600">Madrid, España</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">⭐ 4.9</span>
            <span>50+ favores completados</span>
          </div>
        </article>

        <article className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <h2 className="text-xl font-semibold">Carlos Rodríguez</h2>
              <p className="text-gray-600">Barcelona, España</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">⭐ 5.0</span>
            <span>100+ favores completados</span>
          </div>
        </article>

        <article className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <h2 className="text-xl font-semibold">Ana Martínez</h2>
              <p className="text-gray-600">Valencia, España</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">⭐ 4.8</span>
            <span>75+ favores completados</span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default HistoriasExito; 