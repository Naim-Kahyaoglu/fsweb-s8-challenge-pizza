import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // React Router importu
import Home from './components/Home';  // Ana sayfa bileşeni
import OrderForm from './components/OrderForm';  // Sipariş formu bileşeni
import OrderSuccess from './components/OrderSuccess';  // Başarı sayfası bileşeni

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Ana Sayfa */}
          <Route exact path="/" component={Home} />
          
          {/* Sipariş Formu Sayfası */}
          <Route path="/order" component={OrderForm} />
          
          {/* Sipariş Başarı Sayfası */}
          <Route path="/success" component={OrderSuccess} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
