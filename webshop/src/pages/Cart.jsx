import { useMemo, useEffect, useState } from "react";
// import productsFromFile from "../data/products.json";
import "../css/cart.css";
import { Link } from "react-router-dom";
import config from "../data/config.json";

// agiilne -> iga tund makstakse kinni, koguaeg presenteerime mida valmis oleme teinud kliendile
//            klient koguaeg muudab
// waterfall -> tehakse tükitööna, kõigepealt arutleme paika mida vaja, siis hinna
//            ja siis teeme

function Cart() {
  const cartSS = useMemo(() => JSON.parse(sessionStorage.getItem("cart")) || [],[]);
  const [cart, setCart] = useState([]);
  const [parcelMachines, setParcelMachines] = useState([]);

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => setParcelMachines(json));

    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        const cartWithProducts = cartSS.map(element => {
          return {
            "product": json.find(product => product.id === element.product_id), 
            "quantity": element.quantity
          }
        });
        setCart(cartWithProducts.filter(element => element.product !== undefined));
      });
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
      { cart.length > 0 && 
        <div className="cart-top">
          <button onClick={emptyCart}>Tühjenda ostukorv</button>
          <div>Ostukorvis esemeid: {cart.length} tk</div>
        </div>}
      { cart.map((element, index) => 
        <div className="product" key={index}>
          <img className="image" src={element.product.image} alt="" />
          <div className="name">{element.product.name}</div>
          <div className="price">{element.product.price} €</div>
          <div className="quantity">
            <img className="button" onClick={() => decreaseQuantity(index)} src={require("../images/minus.png")} alt="" />
            <div>{element.quantity} tk</div>
            <img className="button" onClick={() => increaseQuantity(index)} src={require("../images/add.png")} alt="" />
          </div>
          <div className="sum">{ element.product.price * element.quantity } €</div>
          <img className="button" onClick={() => removeFromCart(index)} src={require("../images/delete.png")} alt="" />
        </div>)}

     { cart.length > 0 &&
      <div className="cart-bottom">
       <div>Ostukorvi kogusumma: {calculateCartSum()}</div>

       <select>
        {parcelMachines
        .filter(element => element.A0_NAME === "EE" && element.ZIP !== "96331")
        .map(element => <option key={element.NAME}>{element.NAME}</option>)}
      </select>
     </div>}

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