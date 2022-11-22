import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CartSumContext from "../../store/CartSumContext";

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const cartSumCtx = useContext(CartSumContext);

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
  }

  return ( 
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/admin">{t('admin')}</Nav.Link>
          <Nav.Link as={Link} to="/shops">{t('shops')}</Nav.Link>
          <Nav.Link as={Link} to="/cart">{t('cart')}</Nav.Link>
        </Nav>
        <div style={{"color": "white"}}>{cartSumCtx.cartSum || "0.00"} €</div>
        <img className="lang" onClick={() => changeLang("est")} src={require("../../images/estonia.png")} alt="" />
        <img className="lang" onClick={() => changeLang("eng")} src={require("../../images/uk.png")} alt="" />
      </Container>
    </Navbar>
   );
}

export default NavigationBar;