import React from 'react';

const CentroAyuda = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Centro de Ayuda</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">¿Cómo me registro?</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">¿Cómo funcionan los puntos?</h3>
              <p className="text-gray-700">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">¿Cómo puedo reportar un problema?</h3>
              <p className="text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Soporte por Email</h3>
              <p className="text-gray-700 mb-2">soporte@ayudavecino.com</p>
              <p className="text-sm text-gray-500">Respuesta en 24-48 horas</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Chat en Vivo</h3>
              <p className="text-gray-700 mb-2">Disponible 9:00 - 18:00</p>
              <p className="text-sm text-gray-500">Lunes a Viernes</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#" className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
              <h3 className="text-lg font-medium mb-2">Guía de Inicio</h3>
              <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet</p>
            </a>
            <a href="#" className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors">
              <h3 className="text-lg font-medium mb-2">Tutoriales</h3>
              <p className="text-sm text-gray-600">Consectetur adipiscing elit</p>
            </a>
            <a href="#" className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors">
              <h3 className="text-lg font-medium mb-2">FAQ</h3>
              <p className="text-sm text-gray-600">Sed do eiusmod tempor</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CentroAyuda; 