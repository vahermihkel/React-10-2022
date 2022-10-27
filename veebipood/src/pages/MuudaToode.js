import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 1. hook-d tuleb importima (nad on pärit kuskilt mujalt)
// hookid on custom koodijupid mis hõlbustavad koodikirjutamist
// 2. hookid on use eesliidesega
// 3. kõiki hooke võtan kasutusele sulgude abil
// 4. hooke ma ei saa luua kuskil funktsiooni sees (alati top-level sellest componendist)
// 5. hookide loomine ei saa olla dünaamiline (if / else)

function MuudaToode() {
  const { index } = useParams();
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted[index];
  const nimiRef = useRef();
  const navigate = useNavigate();

  const muuda = () => {
    // ["cats", "dogs", "cows"][2] = "elephants";
    const uuendatudToode = {
      "nimi": nimiRef.current.value,
      "hind": Number(hindRef.current.value),
      "pilt": piltRef.current.value,
      "aktiivne": aktiivneRef.current.checked
    }
    tooted[index] = uuendatudToode;
    localStorage.setItem("tooted", JSON.stringify(tooted));
    // mine /halda-tooteid URL-le
    navigate("/halda-tooteid");
  }

  const hindRef = useRef();
  const piltRef = useRef();
  const aktiivneRef = useRef();

  return ( 
    <div>
      { leitudToode !== undefined && 
        <div>
          <label>Toote nimi</label> <br />
          <input ref={nimiRef} defaultValue={leitudToode.nimi} type="text" /> <br />
          <label>Toote hind</label> <br />
          <input ref={hindRef} defaultValue={leitudToode.hind} type="number" /> <br />
          <label>Toote pilt</label> <br />
          <input ref={piltRef} defaultValue={leitudToode.pilt} type="text" /> <br />
          <label>Toote aktiivne</label> <br />
          <input ref={aktiivneRef} defaultChecked={leitudToode.aktiivne} type="checkbox" /> <br />
          <button onClick={muuda}>Muuda toode</button>
        </div> }
      { leitudToode === undefined && <div>Toodet ei leitud</div> }
    </div> );
}

export default MuudaToode;