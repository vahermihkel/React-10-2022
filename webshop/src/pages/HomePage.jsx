// import productsFromFile from "../data/products.json";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import config from "../data/config.json";
import { ToastContainer, toast } from 'react-toastify';

function HomePage() {
  const [dbProducts, setDbProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const categories = [...new Set(dbProducts.map(product => product.category))];
  // const productsDbUrl = "https://mihkel-react-10-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
          setProducts(json || []);
          setDbProducts(json || []);
        });
  }, []);

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
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    // cart.push(productClicked);
    const index = cart.findIndex(element => element.product_id === productClicked.id);
    if (index >= 0) { // kas toode on olemas või mitte, pidin .find() tegema kontrolli kas on undefined
      // kas on toode olemas või mitte .findIndex()   ---> pean kontrollimas kas on suurem/võrdne 0 ehk ei ole -1
      cart[index].quantity = cart[index].quantity + 1;
      // cart[index].quantity += 1;
      // cart[index].quantity++;
    } else {
      // {id: 312, name: "asda", price: 3123, ...}
      // {product_id: 312, quantity: 1}
      cart.push({product_id: productClicked.id, quantity: 1})
    }
    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
    toast.success("Edukalt ostukorvi lisatud!", {
      position: 'bottom-right',
      theme: 'dark'
    });
  }

  const filterByCategory = (categoryClicked) => {
    const result = dbProducts.filter(product => product.category === categoryClicked);
    setProducts(result);
  }

  if (products.length === 0) {
    return (<Spinner animation="border" />)
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
      <ToastContainer />
    </div> );
}

export default HomePage;