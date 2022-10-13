import { useRef, useState } from "react";

function LisaToode() {
  const [sonum, uuendaSonum] = useState("Lisa uus toode!");
  const nimiRef = useRef();

  function lisa() {
    if (nimiRef.current.value === "") {
      uuendaSonum("Sa ei saa tühja nimega toodet sisestada");
    } else {
      uuendaSonum("Uus toode lisatud: " + nimiRef.current.value);
    }
  }

  return ( 
    <div>
      <div>{sonum}</div>
      <label>Uue toote nimi</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      { sonum === "Lisa uus toode!" && <button onClick={lisa}>Sisesta</button>} <br />
    </div>
     );
}

export default LisaToode;