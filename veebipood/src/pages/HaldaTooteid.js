import { useState } from "react";

function HaldaTooteid() {
  const [tooted, uuendaTooted] = useState(JSON.parse(localStorage.getItem("tooted")) || []);

  const kustuta = (klikitudIndex) => {
    tooted.splice(klikitudIndex, 1);
    uuendaTooted(tooted.slice());
    localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  return ( 
    <div>
      {tooted.map((element, index) => 
        <div>
          {element}
          <button onClick={() => kustuta(index)}>Kustuta</button>
          <button>Muuda</button>
        </div>)}
    </div> );
}

export default HaldaTooteid;