import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import InfiniteScroll from "react-infinite-scroll-component";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [active, setActivePage] = useState(2);
  const [items, setPages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  

  const api = new WooCommerceRestApi({
    url: "http://localhost/wordpress/",
    consumerKey: "ck_661875e1e4a680a01b5fa0d0d0e4af8c9914b355",
    consumerSecret: "cs_363bd2cf77c83373029aaeffb8adecbf77aceaa8",
    version: "wc/v3",
    axiosConfig: {
      headers: {}
    }
  });

  useEffect(() => {
    setLoading(true);
    api.get("products", {
      per_page: 2, // 2 products per page
      page: 1
    })
      .then((response) => {
        // Successful request
        let cart = sessionStorage.getItem("cart");
        cart = JSON.parse(cart) || [];
        const productsWithCartNr = response.data.map(element => {
          const index = cart.findIndex(cartProduct => cartProduct.product_id === element.id);

          // findIndex -> kasutatakse objektide array seest järjekorranumbrite otsimiseks
          // indexOf -> primitiivide array seest järjekorranumbrite otsimiseks
          // [{id: "adsa"}, {id: "das"}, {id: "1"}, {id: "2"}].indexOf()
          // ["adsa", "das", "1", "2"].indexOf("2")  ---> 3

          // findIndex leiab mingi ühe omaduse abil elemendi üles
          // "adsa"      .findIndex(element => element.id === "adsa")
          const count = index >= 0 ? cart[index].quantity : 0;
          return {...element, count}
        });
        setProducts(productsWithCartNr);
        const totalPages = response.headers["x-wp-totalpages"];
        const pagesArray = [];
        for (let page = 1; page <= totalPages; page++) {
          pagesArray.push(page);
        }
        setPages(pagesArray);
        setLoading(false);
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
    const productIndex = products.indexOf(productClicked);
    products[productIndex].count = products[productIndex].count + 1;
    setProducts(products.slice());
    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
  }

  const removeFromCart = (productClicked) => {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    const index = cart.findIndex(element => element.product_id === productClicked.id);
    if (cart[index].quantity > 1) { 
      cart[index].quantity = cart[index].quantity - 1;
    } else if (cart[index].quantity === 1) {
      cart.splice(index,1);
    } else {
      return;
    }
    const productIndex = products.indexOf(productClicked);
    products[productIndex].count = products[productIndex].count - 1;
    setProducts(products.slice());
    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
  }

  const changePage = (newPage) => {
    setLoading(true);
    setActivePage(newPage);
    api.get("products", {
      per_page: 2, // 2 products per page
      page: newPage
    })
      .then((response) => {
        // Successful request
        setProducts(response.data);
        setLoading(false);
      })
  }

  if (isLoading === true) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <Pagination>
        {items.map( number => 
          <Pagination.Item key={number} active={number === active} onClick={() => changePage(number)}>
            {number}
          </Pagination.Item>)}
      </Pagination>
      <div>{products.length} tk</div>
      {products.map((element, index) => 
        <div key={index}>
          <div>{element.name}</div>
          <div>{element.price} €</div>
          { element.images[0] !== undefined && <img className="picture" src={element.images[0].src} alt="" />}
          <button onClick={() => removeFromCart(element)}>-</button>
          <span> {element.count} </span>
          <button onClick={() => addToCart(element)}>+</button>
        </div>)}
    </div>
  )
}

export default HomePage


// - Pagination
// - Inifinte scroll
// - Kogus avalehel
// - Ostukorvis e-mail - tellimus  --->  kuidas tooted saata e-maili
// - Radio-button - vahetada kas pildi URL või üleslaadimine   /    ostukorvis: Maksa / Esita tellimus
// - TypeScript
