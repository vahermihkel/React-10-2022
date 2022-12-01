import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const api = new WooCommerceRestApi({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_661875e1e4a680a01b5fa0d0d0e4af8c9914b355",
      consumerSecret: "cs_363bd2cf77c83373029aaeffb8adecbf77aceaa8",
      version: "wc/v3",
      axiosConfig: {
        headers: {}
      }
    });
    api.get("products", {
      per_page: 20, // 20 products per page
    })
      .then((response) => {
        // Successful request
        setProducts(response.data);
      })
  }, []);

  const addToCart = (productClicked) => {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    const index = cart.findIndex(element => element.product_id === productClicked.id);
    if (index >= 0) { 
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      cart.push({product_id: productClicked.id, quantity: 1})
    }
    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
  }

  return (
    <div>
      {products.map((element, index) => 
        <div key={index}>
          <div>{element.name}</div>
          <div>{element.price} €</div>
          { element.images[0] !== undefined && <img className="picture" src={element.images[0].src} alt="" />}
          <button onClick={() => addToCart(element)}>Lisa ostukorvi</button>
        </div>)}
    </div>
  )
}

export default HomePage