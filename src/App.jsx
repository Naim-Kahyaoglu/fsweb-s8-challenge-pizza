import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Switch kullan

import Home from "./components/Home";
import OrderForm from "./components/OrderForm";
import OrderSuccess from "./components/OrderSuccess";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} /> {/* Anasayfa bileşeni */}
        <Route path="/order" component={OrderForm} />
        <Route path="/order-success" component={OrderSuccess} />
      </Switch>
    </Router>
  );
}

export default App;
