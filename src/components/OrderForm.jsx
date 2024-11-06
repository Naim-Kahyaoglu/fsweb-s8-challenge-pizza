import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Boyut ve Hamur Seçimi Bileşeni
const SizeAndCrustSelection = ({ boyut, hamur, onBoyutChange, onHamurChange }) => {
  return (
    <div className="form-section size-crust">
      <div className="size">
        <label>Boyut Seç</label>
        {['Küçük', 'Orta', 'Büyük'].map((size) => (
          <div key={size}>
            <input
              type="radio"
              name="boyut"
              value={size}
              onChange={() => onBoyutChange(size)}
              checked={boyut === size}
            />
            {size}
          </div>
        ))}
      </div>

      <div className="crust">
        <label>Hamur Seç</label>
        <select name="hamur" onChange={(e) => onHamurChange(e.target.value)} value={hamur}>
          <option value="Hamur Kalınlığı">Hamur Kalınlığı</option>
          <option value="İnce">İnce</option>
          <option value="Normal">Normal</option>
          <option value="Kalın">Kalın</option>
        </select>
      </div>
    </div>
  );
};

// Ek Malzeme Seçimi Bileşeni
const IngredientSelection = ({ selectedIngredients, onChange }) => {
  const ingredients = [
    'Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara', 'Soğan',
    'Domates', 'Mısır', 'Sucuk', 'Jalepeno', 'Sarımsak', 'Biber', 'Ananas', 'Kabak'
  ];

  const handleIngredientChange = (event) => {
    const value = event.target.value;
    if (selectedIngredients.includes(value)) {
      onChange(selectedIngredients.filter((item) => item !== value));
    } else {
      onChange([...selectedIngredients, value]);
    }
  };

  return (
    <div className="form-section ingredients">
      <label>Ek Malzemeler</label>
      <div className="ingredient-options-box">
        {ingredients.map((malzeme) => (
          <div key={malzeme} className="ingredient-item">
            <input
              type="checkbox"
              name="malzemeler"
              value={malzeme}
              onChange={handleIngredientChange}
              checked={selectedIngredients.includes(malzeme)}
            />
            {malzeme}
          </div>
        ))}
      </div>
    </div>
  );
};

// Sipariş Toplamı Bileşeni
const OrderSummary = ({ boyut, hamur, malzemeler }) => {
  const pizzaBasePrice = 85.50;
  
  // Boyut Fiyatları
  const sizePrices = {
    Küçük: 0,
    Orta: 20,
    Büyük: 40,
  };

  // Hamur Fiyatları
  const crustPrices = {
    İnce: 0,
    Normal: 10,
    Kalın: 20,
  };

  // Ek Malzeme Fiyatları
  const ingredientPrice = 5;

  // Fiyat Hesaplama
  const sizePrice = sizePrices[boyut] || 0;
  const crustPrice = crustPrices[hamur] || 0;
  const ingredientsTotal = malzemeler.length * ingredientPrice;

  const totalPrice = pizzaBasePrice + sizePrice + crustPrice + ingredientsTotal;

  return (
    <div className="order-summary">
      <div className="order-total-header">
        <span>Sipariş Toplamı</span>
      </div>
      <div className="order-detail">
        <div className="detail-left">Seçimler</div>
        <div className="detail-right">
          {malzemeler.length} x {ingredientPrice}₺
        </div>
      </div>
      <div className="order-total">
        <div className="total-left">Toplam</div>
        <div className="total-right">{totalPrice.toFixed(2)}₺</div>
      </div>
    </div>
  );
};

// OrderForm Bileşeni
const OrderForm = () => {
  const [boyut, setBoyut] = useState('Küçük');
  const [hamur, setHamur] = useState('İnce');
  const [malzemeler, setMalzemeler] = useState([]);
  const [özel, setÖzel] = useState('');

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { boyut, hamur, malzemeler, özel };

    // API'ye veri gönderme
    axios
      .post('https://reqres.in/api/pizza', formData)
      .then((response) => {
        console.log(response.data);
        history.push('/order-success');
      })
      .catch((error) => {
        console.error('Error!', error);
      });
  };

  return (
    <div className="order-form-container">
      <div className="order-header">
        <h1>Teknolojik Yemekler</h1>
        <p>anasayfa - sipariş oluştur</p>
      </div>

      <div className="pizza-info">
  <h2>Position Absolute Acı Pizza</h2>
  <div className="price-rating">
    <span className="price">85.50₺</span>
    <span className="rating">4.9 (200)</span>
  </div>
  <p className="description">
    Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
  </p>
</div>


      <form onSubmit={handleSubmit}>
        {/* Boyut ve Hamur Seçimi */}
        <SizeAndCrustSelection 
          boyut={boyut} 
          hamur={hamur} 
          onBoyutChange={setBoyut} 
          onHamurChange={setHamur} 
        />

        {/* Ek Malzemeler */}
        <IngredientSelection selectedIngredients={malzemeler} onChange={setMalzemeler} />

        {/* Sipariş Notu */}
        <div className="form-section special-note">
          <label>Sipariş Notu</label>
          <textarea
            name="özel"
            value={özel}
            onChange={(e) => setÖzel(e.target.value)}
            placeholder="Siparişine eklemek istediğin bir not var mı?"
          />
        </div>

        {/* Sipariş Toplamı */}
        <OrderSummary boyut={boyut} hamur={hamur} malzemeler={malzemeler} />

        {/* Sipariş Ver Butonu */}
        <div className="order-summary">
          <button type="submit" className="submit-btn">
            Sipariş Ver
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
