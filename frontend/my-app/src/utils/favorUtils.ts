export const getFavorTypeIcon = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'hogar':
      return 'fa-home text-blue-500';
    case 'transporte':
      return 'fa-car text-green-500';
    case 'mascotas':
      return 'fa-paw text-purple-500';
    case 'tecnología':
      return 'fa-laptop-code text-red-500';
    case 'clases':
      return 'fa-book text-yellow-500';
    case 'cocina':
      return 'fa-utensils text-pink-500';
    case 'fontanería':
      return 'fa-wrench text-blue-500';
    case 'carpintería':
      return 'fa-hammer text-brown-500';
    case 'recados':
      return 'fa-shopping-bag text-purple-500';
    case 'compra':
      return 'fa-shopping-cart text-green-500';
    default:
      return 'fa-question-circle text-gray-500';
  }
};

type FavorType = 'hogar' | 'transporte' | 'mascotas' | 'tecnología' | 'clases' | 'cocina' | 'fontanería' | 'carpintería' | 'recados' | 'compra';

const FAVOR_IMAGES: Record<FavorType, string> = {
  'hogar': 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&brightness=0.8&contrast=0.9&saturation=0.9',
  'transporte': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&brightness=0.8&contrast=0.9&saturation=0.9',
  'mascotas': 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&brightness=0.8&contrast=0.9&saturation=0.9',
  'tecnología': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&brightness=0.8&contrast=0.9&saturation=0.9',
  'clases': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&brightness=0.8&contrast=0.9&saturation=0.9',
  'cocina': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&brightness=0.8&contrast=0.9&saturation=0.9',
  'fontanería': 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&brightness=0.8&contrast=0.9&saturation=0.9',
  'carpintería': 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&brightness=0.8&contrast=0.9&saturation=0.9',
  'recados': 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&brightness=0.8&contrast=0.9&saturation=0.9',
  'compra': 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80&brightness=0.8&contrast=0.9&saturation=0.9'
};

export const getFavorTypeImage = (type: string): string => {
  const defaultImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
  const key = type.toLowerCase() as FavorType;
  return FAVOR_IMAGES[key] || defaultImage;
};
