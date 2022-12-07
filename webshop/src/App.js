
import './App.css';
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Shops from "./pages/Shops";
import SingleProduct from "./pages/SingleProduct";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminHome from "./pages/admin/AdminHome";
import MaintainCategories from "./pages/admin/MaintainCategories";
import MaintainProducts from "./pages/admin/MaintainProducts";
import MaintainShops from "./pages/admin/MaintainShops";
import { Navigate, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/global/NavigationBar';
import Footer from "./components/global/Footer";
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useTranslation } from 'react-i18next';

function App() {
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className="App">
      
      <NavigationBar />

      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path={t("url.cart")} element={ <Cart /> } />
        <Route path={t("url.shops")} element={ <Shops /> } />
        <Route path="product" element={ <SingleProduct /> } />
        <Route path="contact" element={ <Contact /> } />
        { authContext.loggedIn === false &&
           <>
            <Route path="login" element={ <Login /> } />
            <Route path="signup" element={ <Signup /> } />
           </>
           }
        { authContext.loggedIn === true &&
          <>
            <Route path="login" element={ <Navigate to="/admin" /> } />
            <Route path="signup" element={ <Navigate to="/admin" /> } />
          </>}
        { authContext.loggedIn === true &&
         <>
          <Route path={t("url.admin")} element={ <AdminHome /> } />
          <Route path="admin/add-product" element={ <AddProduct /> } />
          <Route path="admin/edit-product/:id" element={ <EditProduct /> } />
          <Route path="admin/maintain-products" element={ <MaintainProducts /> } />
          <Route path="admin/maintain-categories" element={ <MaintainCategories /> } />
          <Route path="admin/maintain-shops" element={ <MaintainShops /> } />
        </>}
        { authContext.loggedIn === false &&
             <Route path="admin/*" element={ <Navigate to="/login" /> } /> }
      </Routes>

      <Footer />
      
    </div>
  );
}

export default App;

// Firebase-i sisselogimine ja registreerumine+++
// Firebase-i piltide üles laadimine+++
// Karusell-galerii
// Wordpressi backendiks + leheküljed + infinite scroll
// Kujundus

// 24.11 - Nortali proovitöö + Karusell-galerii + Wordpressi alustamine
// 29.11 - Wordpress - igal ajal proovitöö osas ehk mingi tõstatus
// 01.12 - Wordpress - igal ajal proovitöö osas ehk mingi tõstatus
// 06.12 - pisike arutelu iseseisva projekti osas + Wordpress - igal ajal proovitöö osas ehk mingi tõstatus

// R 16.12 --> 3ak/h 14.30-16.45 lõpuprojekti esitlus
// ainuke nõue on, et see oleks tehtud Reactis
// näitate veebilehte ja põgusalt ka koodi