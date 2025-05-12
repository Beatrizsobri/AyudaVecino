export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  SIGN_UP: '/signup',
  SIGN_IN: '/signin',
  
  // Rutas protegidas
  TRANSACTIONS: '/transactions',
  MY_FAVORS: '/myfavors',
  BOARD: '/board',
  CREATE_FAVOR: '/create-favor',
  PROFILE: '/profile',

  // Rutas estáticas
  COMO_FUNCIONA: '/como-funciona',
  SISTEMA_PUNTOS: '/sistema-puntos',
  SEGURIDAD: '/seguridad',
  HISTORIAS_EXITO: '/historias-exito',
  CENTRO_AYUDA: '/centro-ayuda',
  NORMAS_COMUNIDAD: '/normas-comunidad',
  POLITICA_PRIVACIDAD: '/politica-privacidad',
  CONTACTO: '/contacto',
} as const;

// Tipo para las rutas públicas
export type PublicRoute = typeof ROUTES.HOME | typeof ROUTES.SIGN_UP | typeof ROUTES.SIGN_IN;

// Tipo para las rutas protegidas
export type ProtectedRoute = typeof ROUTES.TRANSACTIONS | typeof ROUTES.MY_FAVORS | typeof ROUTES.BOARD | typeof ROUTES.CREATE_FAVOR | typeof ROUTES.PROFILE;

// Tipo para las rutas estáticas
export type StaticRoute = typeof ROUTES.COMO_FUNCIONA | typeof ROUTES.SISTEMA_PUNTOS | typeof ROUTES.SEGURIDAD | typeof ROUTES.HISTORIAS_EXITO | typeof ROUTES.CENTRO_AYUDA | typeof ROUTES.NORMAS_COMUNIDAD | typeof ROUTES.POLITICA_PRIVACIDAD | typeof ROUTES.CONTACTO;

// Tipo para todas las rutas
export type AppRoute = PublicRoute | ProtectedRoute | StaticRoute; 