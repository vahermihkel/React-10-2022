import { useContext } from "react";
import { Button } from "react-bootstrap";
import CartSumContext from "../../store/CartSumContext";
import { useTranslation } from 'react-i18next';

function Product(props) {
  const cartSumCtx = useContext(CartSumContext);
  const { t } = useTranslation();

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

   
    // cartSumCtx.setCartSum(cartSum.toFixed(2));


    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
    props.showToast.success(t("added-to-cart"), {
      position: 'bottom-right',
      theme: 'dark'
    });
    cartSumCtx.calculateCartSum();
  }
  
  return ( 
    <div>
      <img className="image" src={props.product.image} alt="" />
      <div>{props.product.name}</div>
      <div>{props.product.price}</div>
      <Button onClick={() => addToCart(props.product)}>Lisa ostukorvi</Button>
    </div>
   );
}

export default Product;