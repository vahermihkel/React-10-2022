import { createContext, useCallback, useEffect, useState } from "react";
import config from "../data/config.json";

const CartSumContext = createContext(null);

export const CartSumContextProvider = (props) => {
  const [cartSum, setCartSum] = useState(null);
  const [dbProducts, setDbProducts] = useState([]);

  const calculateCartSum = useCallback((json) => {
    const products = json === undefined ? dbProducts : json;
    const cartSS = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cartWithProducts = cartSS.map(element => {
      return {
        "product": products.find(product => product.id === element.product_id), 
        "quantity": element.quantity
      }
    });
    let cartSumCalculated = 0;
    cartWithProducts.forEach(element => cartSumCalculated = cartSumCalculated + element.product.price * element.quantity);
    setCartSum(cartSumCalculated.toFixed(2));
  }, [dbProducts]);
  
  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setDbProducts(json);
        calculateCartSum(json);
      });
  }, [calculateCartSum]);

  return(
    <CartSumContext.Provider value={{
      cartSum: cartSum,
      setCartSum: setCartSum,
      calculateCartSum: calculateCartSum
    }}>
      {props.children}
    </CartSumContext.Provider>
  )
}


export default CartSumContext;