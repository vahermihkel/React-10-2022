import { useState } from "react";

function Meist() {
  // võtame vastu telefoni ja emaili                võib olla "null" ehk tühjus, kui sellist võtit pole
                                    // teine tühjuse liik on "undefined"
  const [telefon, uuendaTelefoni] = useState(localStorage.getItem("telefon") || "Telefoninumbrit ei ole lisatud");
  const [n2itaEmaili, uuendaN2itaEmaili] = useState(false);
  
  return ( 
  <div>
      <div>Meie telefon: 
        {telefon}
        { telefon.startsWith("+372") === false && telefon !== "Telefoninumbrit ei ole lisatud" && <button onClick={() => uuendaTelefoni("+372" + telefon)}>Lisa suunakood</button>}
      </div>
      <div>Meie e-mail: 
          { n2itaEmaili === true && localStorage.getItem("email")}
          { n2itaEmaili === false && <button onClick={() => uuendaN2itaEmaili(true)}>Näita e-maili</button>}
      </div>
  </div> );
}

export default Meist;