import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function SendEmail(props) {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const sendEmail = () => {
    const orderProducts = 
    "<ol>" + 
      props.cart.map((element) => `
        <li>${element.product.name} 
          <img src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt=""/> 
        </li>`).join("") + 
    "</ol>";

    const params = {
      "client_name": nameRef.current.value,
      // "from_name": nameRef.current.value + "(tema e-mail: " + emailRef.current.value + ")",
      "client_email": emailRef.current.value,
      "to_name": "Veebilehe haldaja",
      "message": messageRef.current.value,
      "cart_sum": props.sum,
      "order_products": orderProducts
    }
    
    emailjs.send('service_fum24bj', 'template_zyogyle', params, 'Xbn0xj_4LjNugxYGl')
    .then(() => {
        toast.success("Edukalt saadetud");
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
    }, (error) => {
        toast.error(error.text);
        //   toast.error(t(error.text));
    });
  }

  return ( 
    <div>
      <label>Sinu nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Sinu e-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Kirjuta kommentaar</label> <br />
      <input ref={messageRef} type="text" /> <br />
      <button onClick={sendEmail}>Vormista tellimus</button>
      <ToastContainer />
    </div> );
}

export default SendEmail;