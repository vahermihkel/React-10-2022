import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
import PaymentCompleted from './pages/PaymentCompleted';

function App() {
  return (
    <div>
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>
     
      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="ostukorv" element={ <Cart /> } />
        <Route path="tellimus" element={ <PaymentCompleted /> } />
      </Routes>
    </div>
  );
}

export default App;
