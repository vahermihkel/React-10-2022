import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Contact() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const sendEmail = () => {
    const params = {
      "from_name": `${nameRef.current.value} (tema e-mail: ${emailRef.current.value})`,
      "from_name": nameRef.current.value + "(tema e-mail: " + emailRef.current.value + ")",
      "to_name": "Veebilehe haldaja",
      "message": messageRef.current.value
    }
    
    emailjs.send('service_fum24bj', 'template_791jaql', params, 'Xbn0xj_4LjNugxYGl')
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
      <label>Sinu sõnum</label> <br />
      <input ref={messageRef} type="text" /> <br />
      <button onClick={sendEmail}>Saada e-mail</button>
      <ToastContainer />
    </div> );
}

export default Contact;