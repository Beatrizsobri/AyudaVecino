export const MADRID_DISTRICTS = [
  { id: 'centro', name: 'Centro' },
  { id: 'arganzuela', name: 'Arganzuela' },
  { id: 'retiro', name: 'Retiro' },
  { id: 'salamanca', name: 'Salamanca' },
  { id: 'chamartin', name: 'Chamartín' },
  { id: 'tetuan', name: 'Tetuán' },
  { id: 'chamberi', name: 'Chamberí' },
  { id: 'fuencarral', name: 'Fuencarral-El Pardo' },
  { id: 'moncloa', name: 'Moncloa-Aravaca' },
  { id: 'latina', name: 'Latina' },
  { id: 'carabanchel', name: 'Carabanchel' },
  { id: 'usera', name: 'Usera' },
  { id: 'puente-vallecas', name: 'Puente de Vallecas' },
  { id: 'moratalaz', name: 'Moratalaz' },
  { id: 'ciudad-lineal', name: 'Ciudad Lineal' },
  { id: 'hortaleza', name: 'Hortaleza' },
  { id: 'villaverde', name: 'Villaverde' },
  { id: 'villa-vallecas', name: 'Villa de Vallecas' },
  { id: 'vicalvaro', name: 'Vicálvaro' },
  { id: 'san-blas', name: 'San Blas-Canillejas' },
  { id: 'barajas', name: 'Barajas' }
] as const;

export type MadridDistrict = typeof MADRID_DISTRICTS[number]['id']; 