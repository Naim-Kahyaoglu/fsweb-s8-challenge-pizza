import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    boyut: '',
    hamur: 'Hamur Kalınlığı',
    malzemeler: [],
    özel: '',
    quantity: 1,
  });
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'malzemeler') {
      const newSelections = formData.malzemeler.includes(value)
        ? formData.malzemeler.filter((malzeme) => malzeme !== value)
        : [...formData.malzemeler, value];
      setFormData((prevData) => ({ ...prevData, malzemeler: newSelections }));
    } else if (name === 'quantity') {
      setFormData((prevData) => ({ ...prevData, quantity: value }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('https://reqres.in/api/pizza', formData)
      .then((response) => {
        console.log(response.data);
        history.push('/order-success');
      })
      .catch((error) => {
        console.error('There was an error!', error);
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
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle
          çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen,
          genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Boyut ve Hamur Seçimi */}
        <div className="form-section size-crust">
          <div className="size">
            <label>Boyut Seç</label>
            <input
              type="radio"
              name="boyut"
              value="Küçük"
              onChange={handleChange}
              checked={formData.boyut === 'Küçük'}
            />
            Küçük
            <input
              type="radio"
              name="boyut"
              value="Orta"
              onChange={handleChange}
              checked={formData.boyut === 'Orta'}
            />
            Orta
            <input
              type="radio"
              name="boyut"
              value="Büyük"
              onChange={handleChange}
              checked={formData.boyut === 'Büyük'}
            />
            Büyük
          </div>

          <div className="crust">
            <label>Hamur Seç</label>
            <select name="hamur" onChange={handleChange} value={formData.hamur}>
              <option value="Hamur Kalınlığı">Hamur Kalınlığı</option>
              <option value="İnce">İnce</option>
              <option value="Normal">Normal</option>
              <option value="Kalın">Kalın</option>
            </select>
          </div>
        </div>

        {/* Ek Malzemeler Seçimi */}
        <div className="form-section ingredients">
          <label>Ek Malzemeler</label>
          <div className="ingredient-options">
            {['Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara', 'Soğan', 'Domates', 'Mısır', 'Sucuk', 'Jalepeno', 'Sarımsak', 'Biber', 'Ananas', 'Kabak'].map((malzeme) => (
              <div key={malzeme}>
                <input
                  type="checkbox"
                  name="malzemeler"
                  value={malzeme}
                  onChange={handleChange}
                />
                {malzeme}
              </div>
            ))}
          </div>
        </div>

        {/* Sipariş Notu */}
        <div className="form-section special-note">
          <label>Sipariş Notu</label>
          <textarea
            name="özel"
            value={formData.özel}
            onChange={handleChange}
            placeholder="Siparişine eklemek istediğin bir not var mı?"
          />
        </div>

        {/* Sipariş Özeti ve Kontroller */}
        <div className="order-summary">
          <div className="quantity-control">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
            >
              -
            </button>
            <span>{formData.quantity}</span>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, quantity: prev.quantity + 1 }))}
            >
              +
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Sipariş Ver
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
