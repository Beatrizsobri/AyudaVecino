export const MADRID_NEIGHBORHOODS = [
  { id: 'arganzuela', name: 'Arganzuela' },
  { id: 'barajas', name: 'Barajas' },
  { id: 'carabanchel', name: 'Carabanchel' },
  { id: 'centro', name: 'Centro' },
  { id: 'chamartin', name: 'Chamartín' },
  { id: 'chamberi', name: 'Chamberí' },
  { id: 'ciudad-lineal', name: 'Ciudad Lineal' },
  { id: 'fuencarral-el-pardo', name: 'Fuencarral-El Pardo' },
  { id: 'hortaleza', name: 'Hortaleza' },
  { id: 'latina', name: 'Latina' },
  { id: 'moncloa-aravaca', name: 'Moncloa-Aravaca' },
  { id: 'moratalaz', name: 'Moratalaz' },
  { id: 'puente-de-vallecas', name: 'Puente de Vallecas' },
  { id: 'retiro', name: 'Retiro' },
  { id: 'salamanca', name: 'Salamanca' },
  { id: 'san-blas-canillejas', name: 'San Blas-Canillejas' },
  { id: 'tetuan', name: 'Tetuán' },
  { id: 'usera', name: 'Usera' },
  { id: 'vicalvaro', name: 'Vicálvaro' },
  { id: 'villa-de-vallecas', name: 'Villa de Vallecas' },
  { id: 'villaverde', name: 'Villaverde' }
] as const;

export type MadridNeighborhood = typeof MADRID_NEIGHBORHOODS[number]['id']; 