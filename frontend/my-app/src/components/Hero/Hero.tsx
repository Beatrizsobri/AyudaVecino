import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FavorRequestForm } from '../Favor/FavorRequestForm';

interface HeroProps {
  title: string;
  text: string;
  buttonText?: string;
  buttonRoute?: string;
  points?: number;
  isModalButton?: boolean;
  onModalSubmit?: (data: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
  }) => void;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  text, 
  buttonText, 
  buttonRoute, 
  points,
  isModalButton,
  onModalSubmit 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: {
    title: string;
    deadline: string;
    description: string;
    type: string;
    points: string;
  }) => {
    try {
      setIsModalOpen(false);
      onModalSubmit?.(data);
    } catch (error) {
      console.error('Error creating favor:', error);
    }
  };

  const renderButton = () => {
    if (!buttonText) return null;

    if (isModalButton) {
      return (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-150 flex items-center"
        >
          <i className="fas fa-plus-circle mr-2"></i> {buttonText}
        </button>
      );
    }

    if (buttonRoute) {
      return (
        <Link 
          to={buttonRoute} 
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-150 flex items-center"
        >
          <i className="fas fa-plus-circle mr-2"></i> {buttonText}
        </Link>
      );
    }

    return null;
  };

  return (
    <>
      <div className="gradient-bg rounded-xl text-white p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
            <p className="text-indigo-100">{text}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {points !== undefined && (
              <div className="bg-indigo-700 px-6 py-3 rounded-lg">
                <div className="text-xs text-indigo-200">Balance Actual</div>
                <div className="text-2xl font-bold flex items-center">
                  <i className="fas fa-coins mr-2"></i> {points} pts
                </div>
              </div>
            )}
            {renderButton()}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <FavorRequestForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Hero; 