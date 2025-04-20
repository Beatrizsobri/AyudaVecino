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
