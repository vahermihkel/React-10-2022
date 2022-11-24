import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import CartSumContext from "../../store/CartSumContext";

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const cartSumCtx = useContext(CartSumContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  // const changeLangEST = () => {
  //   i18n.changeLanguage("est");
  //   localStorage.setItem("language", "est");
  // }

  // const changeLangENG = () => {
  //   i18n.changeLanguage("eng");
  //   localStorage.setItem("language", "eng");
  // }

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    // window.location.reload();
    navigate("/");
    // navigate("/" + t("url." + window.location.href.split("localhost:3000/")[1]));
  }

  const logout = () => {
    authCtx.logout();
  }

  return ( 
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
        <Nav className="me-auto">
          { authCtx.loggedIn === true && <Nav.Link as={Link} to={"/" + t("url.admin")}>{t('nav.admin')}</Nav.Link>}
          <Nav.Link as={Link} to={"/" + t("url.shops")}>{t('nav.shops')}</Nav.Link>
          <Nav.Link as={Link} to={"/" + t("url.cart")}>{t('nav.cart')}</Nav.Link>
          { authCtx.loggedIn === false && 
            <>
              <Nav.Link as={Link} to="/login">Logi sisse</Nav.Link>
              <Nav.Link as={Link} to="/signup">Registreeru</Nav.Link>
            </>  
          }
          { authCtx.loggedIn === true && <Nav.Link onClick={logout}>Logi välja</Nav.Link>}
        </Nav>
        <div style={{"color": "white"}}>{cartSumCtx.cartSum || "0.00"} €</div>
        <img className="lang" onClick={() => changeLang("est")} src={require("../../images/estonia.png")} alt="" />
        <img className="lang" onClick={() => changeLang("eng")} src={require("../../images/uk.png")} alt="" />
      </Container>
    </Navbar>
   );
}

export default NavigationBar;