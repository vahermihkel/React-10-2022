import { useParams } from "react-router-dom";

function YksikToode() {
  const { j2rjekorraNumber } = useParams(); // {} <-- object destructuring
  // const params = useParams();

  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted[j2rjekorraNumber];
  // const leitudToode2 = tooted[params.j2rjekorraNumber];

  return ( 
    <div>
      { leitudToode !== undefined && 
        <div>
          <img src={leitudToode.pilt} alt="" />
          <div>{leitudToode.nimi}</div>
          <div>{leitudToode.hind}</div>
          <div>{leitudToode.aktiivne}</div>
        </div>}
      { leitudToode === undefined && <div>Toodet ei leitud</div>}
    </div> );
}

export default YksikToode;