import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from './OrderForm';
import OrderSuccess from './OrderSuccess';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Anasayfa bileşeni */}
                <Route path="/order" element={<OrderForm />} />
                <Route path="/success" element={<OrderSuccess />} />
            </Routes>
        </Router>
    );
}

export default App;
