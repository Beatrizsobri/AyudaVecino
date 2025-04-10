import { useState } from "react";

interface TabsProps {
  onTabChange: (tab: string) => void;
}

const Tabs = ({ onTabChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState('requested');

  const handleTabClick = (tab:string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`tab-button ${activeTab === 'requested' ? 'active' : ''} py-4 px-1 text-sm font-medium`}
            onClick={() => handleTabClick('requested')}
          >
            Pedidos
          </button>
          <button
            className={`tab-button ${activeTab === 'pending' ? 'active' : ''} py-4 px-1 text-sm font-medium`}
            onClick={() => handleTabClick('pending')}
          >
            Pendientes
          </button>
          <button
            className={`tab-button ${activeTab === 'accepted' ? 'active' : ''} py-4 px-1 text-sm font-medium`}
            onClick={() => handleTabClick('accepted')}
          >
            Aceptados
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Tabs;