import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Ana Bileşeniniz
import './styles.css';  // Tailwind stilleri

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
