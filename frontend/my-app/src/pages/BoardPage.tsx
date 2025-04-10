import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { MADRID_DISTRICTS } from '../constants/districts';

const Board: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <div className="gradient-bg rounded-xl text-white p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Favores Disponibles</h1>
            <p className="text-indigo-100">Encuentra favores en los que puedas ayudar y gana puntos</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to={ROUTES.CREATE_FAVOR} className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-150 flex items-center">
              <i className="fas fa-plus-circle mr-2"></i> Solicitar un Favor
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and map */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-semibold mb-4 md:mb-0">Favores Cercanos</h2>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                <option>Selecciona el distrito</option>
                {MADRID_DISTRICTS.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
            
            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                <option>Todas las categorías</option>
                <option>Servicios del Hogar</option>
                <option>Transporte</option>
                <option>Cuidado de Mascotas</option>
                <option>Ayuda Tecnológica</option>
                <option>Clases</option>
                <option>Cocina</option>
                <option>Fontanería</option>
                <option>Carpintería</option>
                <option>Recados</option>
                <option>Compra</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="category-pill active px-4 py-1 rounded-full border border-indigo-500 text-indigo-500 text-sm">
            Todos
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-home text-blue-500 mr-1"></i> Hogar
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-car text-green-500 mr-1"></i> Transporte
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-paw text-purple-500 mr-1"></i> Mascotas
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-laptop-code text-red-500 mr-1"></i> Tecnología
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-book text-yellow-500 mr-1"></i> Clases
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-utensils text-pink-500 mr-1"></i> Cocina
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-wrench text-blue-500 mr-1"></i> Fontanería
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-hammer text-brown-500 mr-1"></i> Carpintería
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-shopping-bag text-purple-500 mr-1"></i> Recados
          </button>
          <button className="category-pill px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
            <i className="fas fa-shopping-cart text-green-500 mr-1"></i> Compra
          </button>
        </div>
      </div>
      
      {/* Favors grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Favor Card 1 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden favor-card transition duration-300">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Limpieza de casa" className="w-full h-48 object-cover"/>
            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <i className="fas fa-home text-blue-500 mr-1"></i> Hogar
            </div>
            <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i> 1.2 km
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">Ayuda con la Limpieza</h3>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                <i className="fas fa-bolt mr-1"></i> Tarea Rápida
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Necesito ayuda con la limpieza básica - aspirar, quitar el polvo y limpiar la cocina de un pequeño apartamento.</p>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Usuario" className="w-8 h-8 rounded-full mr-2"/>
                <div>
                  <p className="text-sm font-medium">Sarah J.</p>
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    <span className="text-xs text-gray-500 ml-1">4.8 (32)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Publicado hace 2h</p>
                <p className="font-bold text-indigo-600">+35 pts</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-150">
                Aceptar Favor
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                <i className="fas fa-ellipsis-h text-gray-500"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Favor Card 2 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden favor-card transition duration-300">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Paseo de perros" className="w-full h-48 object-cover"/>
            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <i className="fas fa-paw text-purple-500 mr-1"></i> Mascotas
            </div>
            <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i> 0.8 km
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">Paseo de Perros - Golden Retriever</h3>
              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                <i className="fas fa-clock mr-1"></i> Recurrente
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Necesito a alguien que pasee a Max durante 30 minutos diarios a las 5pm mientras estoy en el trabajo esta semana.</p>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Usuario" className="w-8 h-8 rounded-full mr-2"/>
                <div>
                  <p className="text-sm font-medium">Michael T.</p>
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    <span className="text-xs text-gray-500 ml-1">4.9 (45)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Publicado hace 5h</p>
                <p className="font-bold text-indigo-600">+20 pts/día</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-150">
                Aceptar Favor
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                <i className="fas fa-ellipsis-h text-gray-500"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board; 