import productsFromFile from "../data/products.json";
import Button from "react-bootstrap/Button";

function HomePage() {
  // sorteerimist    .sort()   localeCompare
  // võtame kõik kategooriad toodete küljest ja kuvame need -> ["guitar", "drum"]   .map()
  // filtreerimist kui ühe kategooria peale klikitakse    .filter()

  const addToCart = (productClicked) => {
    // TEHKE KODUS VALMIS EESTI KEELSE JÄRGI
    // let cart = sessionStorage.getItem("cart");
  }

  return ( 
    <div>
      {productsFromFile.map(element => 
        <div>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          <Button onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
        </div>)}
    </div> );
}

export default HomePage;