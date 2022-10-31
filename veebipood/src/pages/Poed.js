import { useRef, useState } from "react";
import poedFailist from "../poed.json";

function Poed() {
  const [poed, uuendaPoed] = useState( poedFailist );
  const nimiRef = useRef();
  const aegRef = useRef();

  // function sorteeri() {

  // }

  const sorteeriAZ = () => {
    poed.sort((a,b) => a.nimi.localeCompare(b.nimi));
    // poed.sort();
    // uuendaPoed([...poed]);
    uuendaPoed(poed.slice());
  }

  const sorteeriZA = () => {
    poed.sort((a,b) => b.nimi.localeCompare(a.nimi));
    // poed.sort();
    // poed.reverse();
    uuendaPoed(poed.slice());
  }

  const filtreeri = () => {
    const vastus = poed.filter(pood => pood.nimi.includes("mäe"));
    uuendaPoed(vastus);
  }

  const kustuta = (number) => {
    poed.splice(number,1);     // kustutamine esimene on mitmendat kustutan, teine on mitu tk kustutan
    uuendaPoed(poed.slice());
  }

  const muudaSuureks = () => {
    // const vastus = poed.map(pood => {return {"nimi": pood.nimi.toUpperCase(), "aeg": pood.aeg}});
    const vastus = poed.map(pood => {return {...pood, "nimi": pood.nimi.toUpperCase()}});
    uuendaPoed(vastus);
  }

  const lisa = () => {
    poed.push({"nimi": nimiRef.current.value, "aeg": aegRef.current.value});
    uuendaPoed(poed.slice());
  }

  // .push, .splice, .sort muteerib
  // .filter, .map returnivad

  return ( 
    <div>
      <button onClick={sorteeriAZ}>Sorteeri AZ</button>
      <button onClick={sorteeriZA}>Sorteeri ZA</button>
      <button onClick={filtreeri}>Filtreeri</button>
      <button onClick={muudaSuureks}>Muuda igaüht</button>
      { poed.map((pood,j2rjekorraNumber) => 
        <div key={j2rjekorraNumber}>
          <div>{pood.nimi}</div>
          <div>Lahtiolekuaeg: {pood.aeg}</div>
          <button onClick={() => kustuta(j2rjekorraNumber)}>x</button>
        </div>) }

      <label>Uue poe nimi</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      <label>Uue poe lahtiolekuaeg</label> <br />
      <input ref={aegRef} type="text" /> <br />
      <button onClick={lisa}>Lisa</button> <br />

      {/* <div key={0}>Kristiine <button onClick={() => kustuta(0)}>x</button></div>
      <div key={1}>Ülemiste <button onClick={() => kustuta(1)}>x</button></div>
      <div key={2}>Põhja-Tallinn <button onClick={() => kustuta(2)}>x</button></div>
      <div key={3}>Kesklinn <button onClick={() => kustuta(3)}>x</button></div>
      <div key={4}>Lasnamäe <button onClick={() => kustuta(4)}>x</button></div> */}
      <div>-----------------------------------------------</div>
      { ["Saab", "Volvo", "BMW"].map((auto,j) => <div key={j}>{auto}</div>) }

    </div> );
}

export default Poed;