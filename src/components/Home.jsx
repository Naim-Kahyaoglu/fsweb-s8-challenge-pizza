import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Pizza Siparişine Hoş Geldiniz!</h1>
      <button onClick={() => history.push('/order')}>Sipariş Ver</button>
    </div>
  );
};

export default Home;
