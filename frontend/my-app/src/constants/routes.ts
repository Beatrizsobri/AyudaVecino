export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  SIGN_UP: '/signup',
  SIGN_IN: '/signin',
  
  // Rutas protegidas
  TRANSACTIONS: '/transactions',
  MY_FAVORS: '/myfavors',
} as const;

// Tipo para las rutas públicas
export type PublicRoute = typeof ROUTES.HOME | typeof ROUTES.SIGN_UP | typeof ROUTES.SIGN_IN;

// Tipo para las rutas protegidas
export type ProtectedRoute = typeof ROUTES.TRANSACTIONS | typeof ROUTES.MY_FAVORS;

// Tipo para todas las rutas
export type AppRoute = PublicRoute | ProtectedRoute; 