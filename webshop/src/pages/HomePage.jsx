// import productsFromFile from "../data/products.json";
// import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import config from "../data/config.json";
import { ToastContainer, toast } from 'react-toastify';
import SortButtons from "../components/home/SortButtons";
import Product from "../components/home/Product";
import CarouselGallery from "../components/home/CarouselGallery";

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

  const filterByCategory = (categoryClicked) => {
    const result = dbProducts.filter(product => product.category === categoryClicked);
    setProducts(result);
  }

  if (products.length === 0) {
    return (<Spinner animation="border" />)
  }

  return ( 
    <div>
      <CarouselGallery />

      {categories.map(element => 
      <button key={element} onClick={() => filterByCategory(element)}>
        {element}
      </button>)}

      <div>Kokku tooteid {products.length}</div>

      <SortButtons products={products} setProducts={setProducts} />
      {products.map(element => 
          <Product key={element.id} product={element} showToast={toast} />
        )}
      <ToastContainer />
    </div> );
}

export default HomePage;