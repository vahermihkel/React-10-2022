import { useRef, useState } from "react";

function Seaded() {
  // keele kuvamist (mis keeles meil veebisait)
  const [keel, uuendaKeel] = useState(localStorage.getItem("veebilehe_keel") || "EST");
  const telRef = useRef();
  const emailRef = useRef();
  // salvestame telefoninumbri ja emaili

  const muudaKeelEST = () => {
    uuendaKeel("EST"); // UUENDA HTMLi
    localStorage.setItem("veebilehe_keel","EST"); // salvesta brauserisse
  }

  const muudaKeelENG = () => {
    uuendaKeel("ENG"); // UUENDA HTMLi
    localStorage.setItem("veebilehe_keel","ENG"); // salvesta brauserisse
  }

  const muudaKeelRUS = () => {
    uuendaKeel("RUS"); // UUENDA HTMLi
    localStorage.setItem("veebilehe_keel","RUS"); // salvesta brauserisse
  }

  const sisestaTel = () => {
    localStorage.setItem("telefon", telRef.current.value);
  }

  const sisestaEmail = () => {
    localStorage.setItem("email", emailRef.current.value);
  }

  return ( 
    <div>
      <br /><br />

      <label>Meie telefon</label>
      <input ref={telRef} type="text" />
      <button onClick={sisestaTel}>Sisesta</button>
      <br />
      <label>Meie email</label>
      <input ref={emailRef} type="text" />
      <button onClick={sisestaEmail}>Sisesta</button>
      <br />

      <br /><br />
      <div>Vali veebilehe keel:</div>
      <button onClick={muudaKeelEST}>Eesti</button>
      <button onClick={muudaKeelENG}>Inglise</button>
      <button onClick={muudaKeelRUS}>Vene</button>
      { keel === "EST" && <div>Veebilehe keel on eesti</div> }
      { keel === "ENG" && <div>Veebilehe keel on inglise</div> }
      { keel === "RUS" && <div>Veebilehe keel on vene</div> }
    </div> );
}

export default Seaded;