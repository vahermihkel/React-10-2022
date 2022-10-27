import { useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooteid() {
  const [tooted, uuendaTooted] = useState(JSON.parse(localStorage.getItem("tooted")) || []);

  const kustuta = (klikitudIndex) => {
    tooted.splice(klikitudIndex, 1);
    uuendaTooted(tooted.slice());
    localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  return ( 
    <div>
      {tooted.map((toode, index) => 
        <div key={index}>
          <img src={toode.pilt} alt="" />
          <div>{toode.nimi}</div>
          <div>{toode.hind}</div>
          <div>{toode.aktiivne}</div>
          <button onClick={() => kustuta(index)}>Kustuta</button>
          <Link to={"/muuda-toode/" + index}>
            <button>Muuda</button>
          </Link>
        </div>)}
    </div> );
}

export default HaldaTooteid;