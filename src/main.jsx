import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Ana Bileşeniniz
import './components/OrderForm.css';  // OrderForm'a özel stiller

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
