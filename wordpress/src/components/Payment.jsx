import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

function Payment(props) {

  const sendOrderToDb = () => {
    const api = new WooCommerceRestApi({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_661875e1e4a680a01b5fa0d0d0e4af8c9914b355",
      consumerSecret: "cs_363bd2cf77c83373029aaeffb8adecbf77aceaa8",
      version: "wc/v3",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json"
        }
      }
    });
    console.log(JSON.parse(sessionStorage.getItem("cart")) || []);
    api.post("orders", {
      line_items: JSON.parse(sessionStorage.getItem("cart")) || []
    }).then(response => pay(response.data.id));
  }
  
  const pay = (orderId) => {
    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": props.sum,
      "order_reference": orderId,
      "nonce": "a9b7f7das" + Math.random() * 999999 + new Date(),
      "timestamp": new Date(),
      // Wordpressi projekti /tellimus URL, et ta võtaks kasutusele PaymentCompleted lehe
      // kui on tehtud
      "customer_url": "https://mihkel-react-10-22.web.app"
      }
    const headersData = {
      "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
      "Content-Type": "application/json"
    }
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
      "method": "POST",
      "body": JSON.stringify(paymentData),
      "headers": headersData
    }).then(res => res.json())
    .then(json => window.location.href = json.payment_link);
      
  }

  return ( 
    <button onClick={sendOrderToDb}>Maksma</button>
     );
}

export default Payment;