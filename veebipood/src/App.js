import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from "./pages/Avaleht";
import LisaToode from "./pages/LisaToode";
import Ostukorv from "./pages/Ostukorv";

// Material Icon Theme -- muutis ikoonid
// emmet -> saan kirjutada tagi nime ja vajutada enter
// Warning: src\App.js
//  Line 1:8:  'logo' is defined but never used

// tabi peal parem klõps -> split right
// või ctrl + *

function App() {
  return (
    <div className="App">
      <Link to="/">
        <img className="pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" />
      </Link>
      <Link to="/lisa-toode">
        <button className="nupp">Lisa toode</button>
      </Link>
      <Link to="/ostukorv">
        <button className="nupp">Ostukorvi</button>
      </Link>

      <Routes>
        <Route path="" element={ <Avaleht /> } />
        <Route path="lisa-toode" element={ <LisaToode /> } />
        <Route path="ostukorv" element={ <Ostukorv /> } />
      </Routes>
    </div>
  );
}

// src\App.js
//   Line 26:35:  'Avaleht' is not defined    react/jsx-no-undef    <--- import tegemata
//   Line 27:45:  'LisaToode' is not defined  react/jsx-no-undef    <--- import tegemata
//   Line 28:43:  'Ostukorv' is not defined                         <--- import tegemata

export default App;
