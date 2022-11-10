import { useMemo, useEffect, useState } from "react";
import productsFromFile from "../data/products.json";
import "../css/cart.css";
import { Link } from "react-router-dom";

function Cart() {
  // Tehke sessionStorage-st ostukorvi võtmine
  const cartSS = useMemo(() => JSON.parse(sessionStorage.getItem("cart")) || [],[]);
  const [cart, setCart] = useState([]);
  const [parcelMachines, setParcelMachines] = useState([]);

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => setParcelMachines(json));
    const cartWithProducts = cartSS.map(element => {
      return {
        "product": productsFromFile.find(product => product.id === element.product_id), 
        "quantity": element.quantity
      }
    });
    setCart(cartWithProducts);
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

  const calculateCartSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    return cartSum.toFixed(2);
  }

  // [{id:12, nimi: "CC"},{id: 23, nimi:"F"}]
  // [{quantity: 2, product: {id:12, nimi: "CC"}},{product: {id: 23, nimi:"F"}, quantity: 4}]

  const decreaseQuantity = (productIndex) => {
    // cart[productIndex].quantity = cart[productIndex].quantity - 1;
    // cart[productIndex].quantity -= 1;
    cartSS[productIndex].quantity--;
    cart[productIndex].quantity--;
    if (cart[productIndex].quantity <= 0) {
      removeFromCart(productIndex);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartSS));

    //[{product: {nimi:"Nobe"}, kogus: 12}, {product: {nimi:"Tesla"}, kogus: 12}][1]
    // {product: {nimi:"Tesla"}, kogus: 12}.kogus = {product: {nimi:"Tesla"}, kogus: 12}.kogus - 1;
  }

  const increaseQuantity = (productIndex) => {
     // cart[productIndex].quantity = cart[productIndex].quantity + 1;
    // cart[productIndex].quantity += 1;
    cartSS[productIndex].quantity++;
    cart[productIndex].quantity++;
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartSS));
  }

  return ( 
    <div>
      { cart.length > 0 && <button onClick={emptyCart}>Tühjenda ostukorv</button> }
      { cart.length > 0 && <div>{cart.length} tk</div> }
      { cart.map((element, index) => 
        <div className="product" key={index}>
          <img className="image" src={element.product.image} alt="" />
          <div className="name">{element.product.name}</div>
          <div className="price">{element.product.price} €</div>
          <button onClick={() => decreaseQuantity(index)}>-</button>
          <div className="quantity">{element.quantity} tk</div>
          <button onClick={() => increaseQuantity(index)}>+</button>
          <div>{ element.product.price * element.quantity } €</div>
          <button className="button" onClick={() => removeFromCart(index)}>x</button>
        </div>)}

      { cart.length > 0 &&  <div>Ostukorvikogusumma: {calculateCartSum()}</div>}

      { cart.length > 0 && <select>
        {parcelMachines
        .filter(element => element.A0_NAME === "EE" && element.ZIP !== "96331")
        .map(element => <option key={element.NAME}>{element.NAME}</option>)}
      </select>}

      { cart.length === 0 && <div>Ostukorv on tühi. <Link to="/">Tooteid valima</Link> </div> }
    </div> );
}


 /* 1.  [
            {product: {id: 123, name: "esada", price: 32}, quantity: 2},
            {product: {id: 124, name: "esade", price: 35}, quantity: 6}
          ]

        [
          {product_id: 123, quantity: 2},
          {product_id: 124, quantity: 2}
        ]

    */

export default Cart;