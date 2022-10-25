import { useParams } from "react-router-dom";

function YksikToode() {
  const { j2rjekorraNumber } = useParams(); // {} <-- object destructuring
  // const params = useParams();

  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted[j2rjekorraNumber];
  // const leitudToode2 = tooted[params.j2rjekorraNumber];

  return ( 
    <div>
      { leitudToode !== undefined && <div>{leitudToode}</div>}
      { leitudToode === undefined && <div>Toodet ei leitud</div>}
    </div> );
}

export default YksikToode;