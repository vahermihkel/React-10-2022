import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Cart.module.css";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Payment from "../components/Payment";

function Cart() {
  const cartSS = useMemo(() => JSON.parse(sessionStorage.getItem("cart")) || [],[]);
  const [cart, setCart] = useState([]);

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
        // setProducts(response.data);
        const cartWithProducts = cartSS.map(element => {
          return {
            "product": response.data.find(product => product.id === element.product_id), 
            "quantity": element.quantity
          }
        });
        setCart(cartWithProducts.filter(element => element.product !== undefined));
      })
  }, [cartSS]);

  const removeFromCart = (productIndex) => {
    cartSS.splice(productIndex, 1); // hilisemaks sessionStorage panekuks
    cart.splice(productIndex, 1); // HTML jaoks
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartSS));
  }

  const emptyCart = () => {
    setCart([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
  }

  const decreaseQuantity = (productIndex) => {
    cartSS[productIndex].quantity--;
    cart[productIndex].quantity--;
    if (cart[productIndex].quantity <= 0) {
      removeFromCart(productIndex);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartSS));
  }

  const increaseQuantity = (productIndex) => {
    cartSS[productIndex].quantity++;
    cart[productIndex].quantity++;
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartSS));
  }

  const calculateCartSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    return cartSum.toFixed(2);
  }

  return ( 
    <div>
      { cart.length > 0 && 
        <div className={styles.cart__top}>
          <button onClick={emptyCart}>Tühjenda ostukorv</button>
          <div>Ostukorvis esemeid: {cart.length} tk</div>
        </div>}
      { cart.map((element, index) => 
        <div className={styles.product} key={index}>
      { element.product.images[0] !== undefined && 
        <img className={styles.image} src={element.product.images[0].src} alt="" />}
          <div className={styles.name}>{element.product.name}</div>
          <div className={styles.price}>{element.product.price} €</div>
          <div className={styles.quantity}>
            <img className={styles.button} onClick={() => decreaseQuantity(index)} src="/images/minus.png" alt="" />
            <div>{element.quantity} tk</div>
            <img className={styles.button} onClick={() => increaseQuantity(index)} src="/images/add.png" alt="" />
          </div>
          <div className={styles.sum}>{ (element.product.price * element.quantity).toFixed(2) } €</div>
          <img className={styles.button} onClick={() => removeFromCart(index)} src="/images/delete.png" alt="" />
        </div>)}

     { cart.length > 0 &&
      <div className={styles.cart__bottom}>
       
       <div>Ostukorvi kogusumma: {calculateCartSum()}</div>

       <Payment sum={calculateCartSum()} />

     </div>}

      { cart.length === 0 && <div>Ostukorv on tühi. <Link to="/">Tooteid valima</Link> </div> }
    </div> );
}

export default Cart;