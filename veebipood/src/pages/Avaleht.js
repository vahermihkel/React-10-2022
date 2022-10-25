// ffc + enter <-----    Simple React Snippets

import { useState } from "react";
import { Link } from "react-router-dom";

function Avaleht() {

  const [like, uuendaLike] = useState(false);

  //let kogus = 5;
  const [kogus, uuendaKogus] = useState(5);

  function v2henda() { // loogelisest sulust
    // kogus = kogus - 1;
    uuendaKogus( kogus - 1 );
    console.log(kogus); // console kuulub JavaScripti native funktsioonide hulka
                        // logib konsooli sõnumi, mis on sulgude vahel
  }  // loogelise suluni

  function suurenda() {
    uuendaKogus( kogus + 1 );
  }

  function nulli() {
    uuendaKogus(0);
  }

  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];

                          // "Tesla"
  const lisaOstukorvi = (klikitudToode) => {
    let ostukorvLS = localStorage.getItem("ostukorv");   //  1. null       2. "["Nobe"]"
    ostukorvLS = JSON.parse(ostukorvLS) || [];  // 1. []    2. ["Nobe"]
    ostukorvLS.push(klikitudToode);  // 1. [].push("nobe")  => ["Nobe"].push("Tesla") => ["Nobe", "Tesla"]
    ostukorvLS = JSON.stringify(ostukorvLS); // 1. "["Nobe"]"    2. "["Nobe", "Tesla"]"
    localStorage.setItem("ostukorv", ostukorvLS); // "ostukorv" | "["Nobe"]"       "ostukorv" | "["Nobe", "Tesla"]"
  }

  return ( 
    <div>
      {/* tooted.map is not a function */}
      {tooted.map((toode, index) => 
        <div key={index}>
          <Link to={"/toode/" + index}>
            {toode}
          </Link>
          <button onClick={() => lisaOstukorvi(toode)}>Lisa ostukorvi</button>
        </div>)}

      <br /><br /><br />

      <button onClick={() => uuendaLike(!like)}>Vaheta like</button>
      { like === true && <img onClick={() => uuendaLike(false)} src="/liked.svg" alt="" />} 
      { like === false && <img onClick={() => uuendaLike(true)} src="/not-liked.svg" alt="" />} 
      <br />
      

      { kogus > 0  && <button onClick={nulli}>Nulli</button> }
      <br />
      <button disabled={kogus === 0} onClick={v2henda}>-</button>
      <div>KOGUS: {kogus}</div>
      <button onClick={suurenda}>+</button>
      
    </div>
    );
}

// src\pages\Avaleht.js
//   Line 8:24:  'kogus' is constant
// Avaleht.js failis real 8 ma olen andnud muutujale, mis on kontantne uue väärtuse

export default Avaleht;