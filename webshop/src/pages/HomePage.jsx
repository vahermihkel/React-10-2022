import productsFromFile from "../data/products.json";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function HomePage() {
  const [products, setProducts] = useState(productsFromFile.slice());
  const categories = [...new Set(productsFromFile.map(product => product.category))];

  // sorteerimist    .sort()   localeCompare
  // võtame kõik kategooriad toodete küljest ja kuvame need -> ["guitar", "drum"]   .map()
  // filtreerimist kui ühe kategooria peale klikitakse    .filter()
  const sortAZ = () => {
    // ["guitar", "drum"].sort();
    products.sort((a,b) => a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  const sortZA = () => {
    //1.  products.sort((a,b) => a.name.localeCompare(b.name)).reverse();
    //2.  products.sort((a,b) => -1 * a.name.localeCompare(b.name));
    products.sort((a,b) => b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  const sortPriceAsc = () => {
    products.sort((a,b) => a.price - b.price);
    setProducts(products.slice());
  }

  const sortPriceDesc = () => {
    products.sort((a,b) => b.price - a.price);
    setProducts(products.slice());
  }

  const addToCart = (productClicked) => {
    // TEHKE KODUS VALMIS EESTI KEELSE JÄRGI
    // let cart = sessionStorage.getItem("cart");
  }

  const filterByCategory = (categoryClicked) => {
    const result = productsFromFile.filter(product => product.category === categoryClicked);
    setProducts(result);
  }

  return ( 
    <div>
      {categories.map(element => 
      <button key={element} onClick={() => filterByCategory(element)}>
        {element}
      </button>)}

      <div>Kokku tooteid {products.length}</div>

      <button onClick={sortAZ}>Sorteeri A-Z</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
      <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
      {products.map(element => 
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          <Button onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
        </div>)}
    </div> );
}

export default HomePage;