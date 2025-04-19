import { useState } from 'react';
import { acceptFavor } from '../../api/favor';

interface AcceptFavorProps {
  favorId: number;
  onAccept: () => void;
}

const AcceptFavor = ({ favorId, onAccept }: AcceptFavorProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      await acceptFavor(favorId);
      onAccept();
    } catch (error) {
      console.error('Error al aceptar el favor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAccept}
      disabled={isLoading}
      className="text-sm bg-indigo-600 text-white px-4 py-1 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Aceptando...' : 'Aceptar'}
    </button>
  );
};

export default AcceptFavor; 