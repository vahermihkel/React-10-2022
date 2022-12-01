//FAILED maksmata: ?order_reference=64&payment_reference=e6f98ca62c1317a60224c13d46534afb9d87147fe2793fcaebf58b7ab319045a
//SETTLED makstud: ?order_reference=65&payment_reference=815c3011d746163652c577411384cffc8280200d7a203aad3f8509111763eb06
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

function PaymentCompleted() {
  const [searchParams] = useSearchParams();
  // const orderReference = searchParams.get("order_reference");
  const paymentReference = searchParams.get("payment_reference");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://igw-demo.every-pay.com/api/v4/payments/" + paymentReference + "?api_username=92ddcfab96e34a5f",{
      headers: {
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    })
      .then(res => res.json())
      .then(json => {
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
        if (json.payment_state === "settled") {
          api.put("orders/" + json.order_reference, {
            status: "processing"   // processing --> sinine, see tähendab, et makstud, aga meie poolt välja saatmata
          }).then(() => setMessage("Tellimus nr " + json.order_reference + ": Tellimus on edukalt makstud"))
        } else if (json.payment_state === "failed") {
          api.put("orders/" + json.order_reference, {
            status: "failed"
          }).then(() => setMessage("Tellimus nr " + json.order_reference + ": Tellimuse makse ebaõnnestus"))
        } else {
          setMessage("Tellimus nr " + json.order_reference + ": Juhtus ootamatu viga, võta ühendust klienditeenindusega");
        }
      });
  }, [paymentReference]);

// 10 liikmeline tiim
// 5 arendajat -> kirjutatakse koodi.  aastate arv on tuhande esimene number
// 2 testijat -> testivad koodi, mida arendajad on valmis kirjutanud
//            localStorage-t katki, API päringuid proovid katki, kirillitsat sisestama, keeltevahetused,
//            broneeringud/tellimise aeg -> ajavööndid, makse keskelt kinni panna
// 2 tiimijuht/analüütik -> kliendiga suhtlus, prioriteedid, maksumus
// 1 disainer - CSS/HTML   , arendajad võtavad CSS-i, Figma

  return (
    <div>{message}</div>
  )
}

export default PaymentCompleted