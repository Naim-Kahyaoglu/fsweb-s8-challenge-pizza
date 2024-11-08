import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PizzaInfo = () => {
  return (
    <div className="pizza-info">
      <div className="pizza-name">Position Absolute Acı Pizza</div>
      <div className="pizza-footer">
        <div className="pizza-price">85.50₺</div>
        <div className="pizza-rating">
          <span className="rating-stars">⭐️⭐️⭐️⭐️⭐️</span> 4.9 (200 yorum)
        </div>
      </div>
    </div>
  );
};

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
        <select
          name="hamur"
          onChange={(e) => onHamurChange(e.target.value)}
          value={hamur}
        >
          <option value="">Hamur Kalınlığı</option>
          <option value="İnce">İnce</option>
          <option value="Normal">Normal</option>
          <option value="Kalın">Kalın</option>
        </select>
      </div>
    </div>
  );
};

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


// Hızlı Teslimat Seçimi Bileşeni
const FastDeliveryOption = ({ hizliTeslimat, onChange }) => {
  return (
    <div className="form-section fast-delivery">
      <label>
        <input
          type="checkbox"
          checked={hizliTeslimat}
          onChange={(e) => onChange(e.target.checked)}
        />
        50₺ karşılığında hızlı teslimat istiyorum
      </label>
    </div>
  );
};

const OrderSummary = ({ boyut, hamur, malzemeler, hizliTeslimat }) => {
  const pizzaBasePrice = 85.50;
  const sizePrices = { Küçük: 0, Orta: 20, Büyük: 40 };
  const crustPrices = { İnce: 0, Normal: 10, Kalın: 20 };
  const ingredientPrice = 5;
  const fastDeliveryPrice = hizliTeslimat ? 50 : 0;

  const sizePrice = sizePrices[boyut] || 0;
  const crustPrice = crustPrices[hamur] || 0;
  const ingredientsTotal = malzemeler.length * ingredientPrice;
  const totalPrice = pizzaBasePrice + sizePrice + crustPrice + ingredientsTotal + fastDeliveryPrice;

  return (
    <div className="order-summary">
      <div className="order-total-header">
        <span>Sipariş Toplamı</span>
      </div>
      <div className="order-detail">
        <div className="detail-left">Seçimler</div>
        <div className="detail-right">{malzemeler.length} x {ingredientPrice}₺</div>
      </div>
      {hizliTeslimat && (
        <div className="order-detail">
          <div className="detail-left">Hızlı Teslimat</div>
          <div className="detail-right">+50₺</div>
        </div>
      )}
      <div className="order-total">
        <div className="total-left">Toplam</div>
        <div className="total-right">{totalPrice.toFixed(2)}₺</div>
      </div>
    </div>
  );
};
//OrderForm Bileşeni

const OrderForm = () => {
  const [boyut, setBoyut] = useState('');  // Başlangıçta boş
  const [hamur, setHamur] = useState('');  // Başlangıçta boş
  const [malzemeler, setMalzemeler] = useState([]);
  const [özel, setÖzel] = useState('');
  const [hizliTeslimat, setHizliTeslimat] = useState(false);  // Hızlı teslimat seçeneği
  const [errorMessage, setErrorMessage] = useState('');
  const [formError, setFormError] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (hamur === '') {
      setFormError('Lütfen bir hamur kalınlığı seçiniz.');
      return;
    }

    if (özel.length < 3) {
      setErrorMessage('Lütfen geçerli bir mesaj giriniz! En az 3 harf uzunluğunda bir kelime girilmelidir!');
      return;
    }

    const formData = { boyut, hamur, malzemeler, özel, hizliTeslimat };

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
        <PizzaInfo />

        {/* Boyut Seçim */}
        <SizeAndCrustSelection
          boyut={boyut}
          hamur={hamur}
          onBoyutChange={setBoyut}
          onHamurChange={setHamur}
        />

        {/* Ek Malzeme Seçimi */}
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

        {formError && <div className="error-message">{formError}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Hızlı Teslimat Seçimi - Sipariş Notu ile Sipariş Toplamı Arasında */}
        <FastDeliveryOption hizliTeslimat={hizliTeslimat} onChange={setHizliTeslimat} />

        {/* Sipariş Toplamı */}
        <OrderSummary
          boyut={boyut}
          hamur={hamur}
          malzemeler={malzemeler}
          hizliTeslimat={hizliTeslimat}
        />

        <button type="submit" className="submit-btn">Sipariş Ver</button>
      </form>
    </div>
  );
};


export default OrderForm;
