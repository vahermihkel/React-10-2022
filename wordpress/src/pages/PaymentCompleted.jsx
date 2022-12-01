//FAILED maksmata: ?order_reference=64&payment_reference=e6f98ca62c1317a60224c13d46534afb9d87147fe2793fcaebf58b7ab319045a
//SETTLED makstud: ?order_reference=65&payment_reference=815c3011d746163652c577411384cffc8280200d7a203aad3f8509111763eb06

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"

function PaymentCompleted() {
  const [searchParams] = useSearchParams();
  const orderReference = searchParams.get("order_reference");
  const paymentReference = searchParams.get("payment_reference")

  useEffect(() => {
    fetch("https://igw-demo.every-pay.com/api/v4/payments/" + paymentReference + "?api_username=92ddcfab96e34a5f",{
      headers: {
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  }, []);

  console.log(orderReference);
  console.log(paymentReference);

  return (
    <div>PaymentCompleted</div>
  )
}

export default PaymentCompleted