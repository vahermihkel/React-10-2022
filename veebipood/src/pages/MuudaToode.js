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
  const toodeRef = useRef();
  const navigate = useNavigate();

  const muuda = () => {
    // ["cats", "dogs", "cows"][2] = "elephants";
    tooted[index] = toodeRef.current.value;
    localStorage.setItem("tooted", JSON.stringify(tooted));
    // mine /halda-tooteid URL-le
    navigate("/halda-tooteid");
  }

  return ( 
    <div>
      { leitudToode !== undefined && 
        <div>
          <label>Toote nimi</label> <br />
          <input ref={toodeRef} defaultValue={leitudToode} type="text" /> <br />
          <button onClick={muuda}>Muuda toode</button>
        </div> }
      { leitudToode === undefined && <div>Toodet ei leitud</div> }
    </div> );
}

export default MuudaToode;