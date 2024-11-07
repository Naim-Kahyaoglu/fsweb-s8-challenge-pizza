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
          {/* "Hamur Kalınlığı" sadece bir placeholder olarak görünmeli ve seçilemez olmalı */}
          <option value="Hamur Kalınlığı" disabled>Hamur Kalınlığı</option>
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

  const sizePrices = {
    Küçük: 0,
    Orta: 20,
    Büyük: 40,
  };

  const crustPrices = {
    İnce: 0,
    Normal: 10,
    Kalın: 20,
  };

  const ingredientPrice = 5;

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
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const handleSpecialNoteChange = (event) => {
    const value = event.target.value;
    setÖzel(value);

    // Hata mesajını dinamik olarak kontrol et
    if (value.length < 3) {
      setErrorMessage('Lütfen geçerli bir mesaj giriniz! En az 3 harf uzunluğunda bir kelime girilmelidir!');
    } else {
      setErrorMessage('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (özel.length < 3) {
      setErrorMessage('Lütfen geçerli bir mesaj giriniz! En az 3 harf uzunluğunda bir kelime girilmelidir!');
      return;
    }

    const formData = { boyut, hamur, malzemeler, özel };

    // API'ye veri gönderme
    axios
      .post('https://reqres.in/api/pizza', formData)
      .then((response) => {
        console.log(response.data);
        history.push('/success');
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

      <form onSubmit={handleSubmit}>
        <SizeAndCrustSelection 
          boyut={boyut} 
          hamur={hamur} 
          onBoyutChange={setBoyut} 
          onHamurChange={setHamur} 
        />

        <IngredientSelection selectedIngredients={malzemeler} onChange={setMalzemeler} />

        <div className="form-section special-note">
          <label>Sipariş Notu</label>
          <textarea
            name="özel"
            value={özel}
            onChange={handleSpecialNoteChange}  // Burada onChange dinleyicisini ekliyoruz
            placeholder="Siparişine eklemek istediğin bir not var mı?"
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Hata mesajı */}

        <OrderSummary boyut={boyut} hamur={hamur} malzemeler={malzemeler} />
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
