interface FavorTypeIconProps {
  type: string;
  className?: string;
}

const FavorTypeIcon = ({ type, className = "" }: FavorTypeIconProps) => {
  const getIconClass = (type: string): string => {
    switch (type.toUpperCase()) {
      case 'COOKING':
        return 'fa-utensils';
      case 'MASONRY':
        return 'fa-hammer';
      default:
        return 'fa-hand-holding-heart';
    }
  };

  return (
    <i className={`fas ${getIconClass(type)} ${className}`} />
  );
};

export default FavorTypeIcon; 