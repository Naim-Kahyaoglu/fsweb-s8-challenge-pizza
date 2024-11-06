import React from 'react';
import OrderForm from './components/OrderForm'; // OrderForm'u import ediyoruz
import './styles.css';  // Tailwind stilleri
function App() {
  return (
    <div className="App">
      <OrderForm /> {/* OrderForm bileşenini burada render ediyoruz */}
    </div>
  );
}

export default App;
