import { useState } from "react";

interface TabsProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const Tabs = ({ onTabChange, activeTab }: TabsProps) => {
  const handleTabClick = (tab: string) => {
    onTabChange(tab);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'requested'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => handleTabClick('requested')}
          >
            Favores que he pedido
          </button>
          <button
            className={`${
              activeTab === 'accepted'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => handleTabClick('accepted')}
          >
            Favores que he ayudado
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Tabs;