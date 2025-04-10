import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomeLoginPage from "./pages/Home/HomeLoginPage";
import HomeUnlogPage from "./pages/Home/HomeUnlog";
import Transactions from "./pages/Transactions";
import { MyFavors } from "./pages/MyFavors";
import { isUserLoggedIn } from "./api/auth";
import NavbarUnlog from "./components/Navbar/NavbarUnlog";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isUserLoggedIn());
  }, []);

  return (
    <>
      { isAuthenticated ? <Navbar /> : <NavbarUnlog/>}
        <Router>
          <Routes>
            <Route path="/" element={ isAuthenticated ? <HomeLoginPage/> : <HomeUnlogPage/>} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm/>} />
            <Route path="/transactions" element={<Transactions/>}/>
            <Route path="/myfavors" element={<MyFavors/>}/>
          </Routes>
        </Router>
      <Footer/>
    </>
  );
}

export default App;
