import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const api = new WooCommerceRestApi({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_661875e1e4a680a01b5fa0d0d0e4af8c9914b355",
      consumerSecret: "cs_363bd2cf77c83373029aaeffb8adecbf77aceaa8",
      version: "wc/v3"
    });
    api.get("products", {
      per_page: 20, // 20 products per page
    })
      .then((response) => {
        // Successful request
        setProducts(response.data);
      })
  }, []);

  return (
    <div>
      {products.map(element => 
        <div>
          <div>{element.name}</div>
          <div>{element.price} €</div>
          { element.images[0] !== undefined && <img src={element.images[0].src} alt="" />}
        </div>)}
    </div>
  )
}

export default HomePage