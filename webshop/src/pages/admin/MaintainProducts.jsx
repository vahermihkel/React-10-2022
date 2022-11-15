// import productsFromFile from "../../data/products.json";
import config from "../../data/config.json";
import Button from "react-bootstrap/Button";
import { useEffect,useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function MaintainProducts() {
  const [dbProducts, setDbProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const searchedProduct = useRef();

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
          setProducts(json || []);
          setDbProducts(json || []);
        });
  }, []);

  const search = () => {
    // proovige filterdada (leida) nime alusel toode üles
    const result = dbProducts.filter(element => 
      element.name.toLowerCase()
        .includes( searchedProduct.current.value.toLowerCase() ) );
    setProducts(result);
    // otsing ka ID ja kirjelduse seest
  }

  const deleteProduct = (productClicked) => {
    const productIndex = dbProducts.findIndex(element => element.id === productClicked.id);
    const updatedProducts = dbProducts.slice();
    updatedProducts.splice(productIndex, 1);
    // KUI VÄHENDAN OTSINGUMOOTORIS, SIIS JÄRJEKORRANUMBRID MUUTUVAD
    fetch(config.productsDbUrl, {"method": "PUT", "body": JSON.stringify(updatedProducts)})
      .then(() => {
        toast.success("Edukalt kustutatud!", {
          position: 'bottom-right',
          theme: 'dark'
        });
        dbProducts.splice(productIndex, 1);
        search();
      });
  }

  const changeProductActive = (productClicked) => {
    const productIndex = dbProducts.findIndex(element => element.id === productClicked.id);
    const updatedProducts = dbProducts.slice();
    // updatedProducts.splice(productIndex, 1);
    updatedProducts[productIndex].active = !updatedProducts[productIndex].active;
    // dbProducts[productIndex].active = !dbProducts[productIndex].active;
    fetch(config.productsDbUrl, {"method": "PUT", "body": JSON.stringify(dbProducts)})
      .then(() => {
        // dbProducts.splice(productIndex, 1);
        dbProducts[productIndex].active = updatedProducts[productIndex].active;
        // search();
        // setProducts(dbProducts);
        search();
      });
  }

  return ( 
    <div>
      <input ref={searchedProduct} onKeyUp={search} type="text" />
      <span>Tooteid kokku {products.length}</span>
       {products.map((element) => 
        <div className={ element.active === true ? "active" : "inactive" } key={element.id}>
          <div onClick={() => changeProductActive(element)}>
            <img src={element.image} alt="" />
            <div>{element.name}</div>
            <div>{element.price}</div>
            <div>{element.category}</div>
            <div>{element.description}</div>
            <div>ID: {element.id}</div>
          </div>
          {/* <Link to={`/admin/edit-product/${element.id}`}>   string literal */}
          <Link to={"/admin/edit-product/" + element.id}>
            <Button>Muuda</Button>
          </Link>
          <Button onClick={() => deleteProduct(element)}>Kustuta</Button>
        </div>)}
        <ToastContainer />
    </div> );
}

export default MaintainProducts;