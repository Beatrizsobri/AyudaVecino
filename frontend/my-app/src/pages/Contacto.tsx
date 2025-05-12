import React from 'react';

const Contacto = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-blue-500 mr-3">📍</span>
                <div>
                  <h3 className="text-lg font-medium">Dirección</h3>
                  <p className="text-gray-700">Calle Principal 123, Madrid, España</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-3">📞</span>
                <div>
                  <h3 className="text-lg font-medium">Teléfono</h3>
                  <p className="text-gray-700">+34 XXX XXX XXX</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-3">✉️</span>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-gray-700">contacto@ayudavecino.com</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Horario de Atención</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-2 text-gray-700">
                <li>Lunes - Viernes: 9:00 - 18:00</li>
                <li>Sábado: 10:00 - 14:00</li>
                <li>Domingo: Cerrado</li>
              </ul>
            </div>
          </section>
        </div>

        <div>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Formulario de Contacto</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="asunto"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Asunto de tu mensaje"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tu mensaje"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 