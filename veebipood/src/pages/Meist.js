import { useState } from "react";

function Meist() {
  // võtame vastu telefoni ja emaili
  const [n2itaEmaili, uuendaN2itaEmaili] = useState(false);
  
  return ( 
  <div>
      <div>Meie telefon: {localStorage.getItem("telefon")}</div>
      <div>Meie e-mail: 
          { n2itaEmaili === true && localStorage.getItem("email")}
          { n2itaEmaili === false && <button onClick={() => uuendaN2itaEmaili(true)}>Näita e-maili</button>}
      </div>
  </div> );
}

export default Meist;