import productsFromFile from "../../data/products.json";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile.slice());
  const searchedProduct = useRef();

  const deleteProduct = (productIndex) => {
    products.splice(productIndex, 1);
    setProducts(products.slice());
    // KUI VÄHENDAN OTSINGUMOOTORIS, SIIS JÄRJEKORRANUMBRID MUUTUVAD
  }

  const search = () => {
    // proovige filterdada (leida) nime alusel toode üles
    const result = productsFromFile.filter(element => 
      element.name.toLowerCase()
        .includes( searchedProduct.current.value.toLowerCase() ) );
    setProducts(result);
    // otsing ka ID ja kirjelduse seest
  }

  return ( 
    <div>
      <input ref={searchedProduct} onKeyUp={search} type="text" />
      <span>Tooteid kokku {products.length}</span>
       {products.map((element,index) => 
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          {/* <Link to={`/admin/edit-product/${element.id}`}>   string literal */}
          <Link to={"/admin/edit-product/" + element.id}>
            <Button>Muuda</Button>
          </Link>
          <Button onClick={() => deleteProduct(index)}>Kustuta</Button>
        </div>)}
    </div> );
}

export default MaintainProducts;