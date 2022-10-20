import { useRef, useState } from "react";

function LisaToode() {
  const [sonum, uuendaSonum] = useState("Lisa uus toode!");
  const nimiRef = useRef();

  function lisa() {
    if (nimiRef.current.value === "") {
      uuendaSonum("Sa ei saa tühja nimega toodet sisestada");
    } else {
      uuendaSonum("Uus toode lisatud: " + nimiRef.current.value);
      let tootedLS = localStorage.getItem("tooted"); // || "[]"
      tootedLS = JSON.parse(tootedLS) || [];
      // tootedLS.push is not a function
      tootedLS.push(nimiRef.current.value);
      tootedLS = JSON.stringify(tootedLS);
      localStorage.setItem("tooted", tootedLS);
    }
  }

  // 1. võta localStorage-st (  .getItem()  )
  // 2. võta jutumärgid maha (  JSON.parse()  )
  // 3. lisa üks juurde (   .push()  )  
  // 4. pane jutumärgid tagasi (   JSON.stringify()   )
  // 5. lisa localStorage-sse (   .setItem()   )

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