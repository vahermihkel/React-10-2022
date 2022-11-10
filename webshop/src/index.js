import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // .css puhul on vaja öelda, et CSS
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './i18n';            // kui on .js või .jsx siis pole lõppu vaja midagi panna
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// .red { background-color: rgb(ff0000) }

// .red { background-color: ff2800 }    <--- custom-my-red-ferrari
