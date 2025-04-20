import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUpForm, SignInForm, HomeLoginPage, HomeUnlogPage, TransactionsPage, MyFavorsPage } from "./pages";
import BoardPage from "./pages/BoardPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { isUserLoggedIn } from "./api/auth";
import NavbarUnlog from "./components/Navbar/NavbarUnlog";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROUTES } from "./constants/routes";
import { UserProvider } from "./contexts/UserContext";

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
          </Routes>
          <Footer/>
        </>
      </Router>
    </UserProvider>
  );
}

export default App;
