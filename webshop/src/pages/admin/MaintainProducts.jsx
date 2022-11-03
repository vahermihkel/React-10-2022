import productsFromFile from "../../data/products.json";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile.slice());
  const searchedProduct = useRef();

  const deleteProduct = (productIndex) => {
    products.splice(productIndex, 1);
    setProducts(products.slice());
  }

  const search = () => {
    // proovige filterdada (leida) nime alusel toode üles
    const result = productsFromFile.filter(element => 
      element.name.toLowerCase().includes(searchedProduct.current.value.toLowerCase()));
    setProducts(result);
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
          <Button onClick={() => deleteProduct(index)}>Kustuta</Button>
        </div>)}
    </div> );
}

export default MaintainProducts;