import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUpForm, SignInForm, HomeLoginPage, HomeUnlogPage, TransactionsPage, MyFavorsPage, ComoFunciona, SistemaPuntos, Seguridad, HistoriasExito, CentroAyuda, NormasComunidad, PoliticaPrivacidad, Contacto } from "./pages";
import BoardPage from "./pages/BoardPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { isUserLoggedIn } from "./api/auth";
import NavbarUnlog from "./components/Navbar/NavbarUnlog";
import { useEffect, useState } from "react";
import { ROUTES } from "./constants/routes";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificamos el estado de autenticación al montar el componente
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(isUserLoggedIn());
    };
    
    checkAuth();
    
    // También verificamos cuando cambia la ruta
    const handleRouteChange = () => {
      checkAuth();
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <UserProvider>
      <Router>
        <>
          { isAuthenticated ? <Navbar /> : <NavbarUnlog/>}
          <Routes>
            {/* Rutas públicas */}
            <Route path={ROUTES.HOME} element={isAuthenticated ? <HomeLoginPage/> : <HomeUnlogPage/>} />
            <Route path={ROUTES.SIGN_UP} element={<SignUpForm />} />
            <Route path={ROUTES.SIGN_IN} element={<SignInForm/>} />
            
            {/* Rutas protegidas */}
            <Route path={ROUTES.TRANSACTIONS} element={
              <ProtectedRoute>
                <TransactionsPage/>
              </ProtectedRoute>
            }/>
            <Route path={ROUTES.MY_FAVORS} element={
              <ProtectedRoute>
                <MyFavorsPage/>
              </ProtectedRoute>
            }/>
            <Route path={ROUTES.BOARD} element={
              <ProtectedRoute>
                <BoardPage/>
              </ProtectedRoute>
            }/>
            <Route path={ROUTES.PROFILE} element={
              <ProtectedRoute>
                <ProfilePage/>
              </ProtectedRoute>
            }/>

            {/* Rutas estáticas */}
            <Route path={ROUTES.COMO_FUNCIONA} element={<ComoFunciona />} />
            <Route path={ROUTES.SISTEMA_PUNTOS} element={<SistemaPuntos />} />
            <Route path={ROUTES.SEGURIDAD} element={<Seguridad />} />
            <Route path={ROUTES.HISTORIAS_EXITO} element={<HistoriasExito />} />
            <Route path={ROUTES.CENTRO_AYUDA} element={<CentroAyuda />} />
            <Route path={ROUTES.NORMAS_COMUNIDAD} element={<NormasComunidad />} />
            <Route path={ROUTES.POLITICA_PRIVACIDAD} element={<PoliticaPrivacidad />} />
            <Route path={ROUTES.CONTACTO} element={<Contacto />} />
          </Routes>
          <Footer/>
        </>
      </Router>
    </UserProvider>
  );
}

export default App;
