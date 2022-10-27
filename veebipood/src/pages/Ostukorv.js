import { useState } from "react";

function Ostukorv() {
  // const ostukorv2 = ["Coca-cola", "Fanta", "Sprite", "Vichy", "Vitamin well"];

  const [ostukorv, muudaOstukorv] = useState(JSON.parse(localStorage.getItem("ostukorv")) || []);

  const kustuta = (indexClicked) => {
    ostukorv.splice(indexClicked,1);
    muudaOstukorv(ostukorv.slice()); // muudab HTMLi
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv)); // salvestab localStorage-st
  }

  const lisa = (toodeClicked) => {
    ostukorv.push(toodeClicked);
    muudaOstukorv(ostukorv.slice());
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv));
  }

  const tyhjenda = () => {
    muudaOstukorv([]);
    localStorage.setItem("ostukorv", JSON.stringify([]));
  }

  const arvutaKogusumma = () => {
    let kogusumma = 0;
    // [{nimi: "CC", hind: 5}, {nimi: "F", hind: 3}, {nimi: "S", hind: 7}]
    // {nimi: "CC", hind: 5} =>     5     = 0         + 5
    // {nimi: "F", hind: 3}  =>     8     = 5         + 3
    // {nimi: "S", hind: 7}  =>     15    = 8         + 7
    // ostukorv.forEach(element => kogusumma += element.hind);

    ostukorv.forEach(element => kogusumma = kogusumma + element.hind);
    return kogusumma.toFixed(2);
  }

  return ( 
    <div>
      {ostukorv.length > 0 && <button onClick={tyhjenda}>Tühjenda</button>}
      {ostukorv.length > 0 && <div>{ostukorv.length} tk</div>}
      {ostukorv.length === 0 && <div>Ostukorv on tühi</div>}
      { ostukorv.map((element, index) => 
        <div key={index}>
          <img src={element.pilt} alt="" />
          <div>{element.nimi}</div>
          <div>{element.hind} €</div>
          <button onClick={() => kustuta(index)}>x</button>
          <button onClick={() => lisa(element)}>+</button>
        </div>) }

      <div>Kokku: {arvutaKogusumma()} €</div>
    </div> );
}

export default Ostukorv;