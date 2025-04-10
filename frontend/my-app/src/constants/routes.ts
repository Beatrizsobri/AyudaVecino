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
} as const;

// Tipo para las rutas públicas
export type PublicRoute = typeof ROUTES.HOME | typeof ROUTES.SIGN_UP | typeof ROUTES.SIGN_IN;

// Tipo para las rutas protegidas
export type ProtectedRoute = typeof ROUTES.TRANSACTIONS | typeof ROUTES.MY_FAVORS | typeof ROUTES.BOARD | typeof ROUTES.CREATE_FAVOR | typeof ROUTES.PROFILE;

// Tipo para todas las rutas
export type AppRoute = PublicRoute | ProtectedRoute; 