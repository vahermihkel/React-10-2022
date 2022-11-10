// import productsFromFile from "../../data/products.json";
import config from "../../data/config.json";
import Button from "react-bootstrap/Button";
import { useEffect,useRef, useState } from "react";
import { Link } from "react-router-dom";

function MaintainProducts() {
  const [dbProducts, setDbProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const searchedProduct = useRef();

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
          setProducts(json);
          setDbProducts(json);
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
    // const productIndex = productsFromFile.findIndex(element => element.id === productClicked.id);
    // productsFromFile.splice(productIndex, 1);
    // setProducts(productsFromFile.slice());
    // KUI VÄHENDAN OTSINGUMOOTORIS, SIIS JÄRJEKORRANUMBRID MUUTUVAD
  }

  return ( 
    <div>
      <input ref={searchedProduct} onKeyUp={search} type="text" />
      <span>Tooteid kokku {products.length}</span>
       {products.map((element) => 
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          {/* <Link to={`/admin/edit-product/${element.id}`}>   string literal */}
          <Link to={"/admin/edit-product/" + element.id}>
            <Button>Muuda</Button>
          </Link>
          <Button onClick={() => deleteProduct(element)}>Kustuta</Button>
        </div>)}
    </div> );
}

export default MaintainProducts;