import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // useHistory'i import et

const OrderForm = () => {
    const [formData, setFormData] = useState({
        isim: '',
        boyut: '',
        malzemeler: [],
        özel: ''
    });
    
    const history = useHistory(); // useHistory'i kullan

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'malzemeler') {
            const newSelections = formData.malzemeler.includes(value)
                ? formData.malzemeler.filter(malzeme => malzeme !== value)
                : [...formData.malzemeler, value];
            setFormData(prevData => ({ ...prevData, malzemeler: newSelections }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://reqres.in/api/pizza', formData)
            .then(response => {
                console.log(response.data);
                history.push('/order-success'); // Yönlendirme
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    İsim:
                    <input 
                        type="text" 
                        name="isim" 
                        value={formData.isim} 
                        onChange={handleChange} 
                        required 
                        minLength={3} 
                    />
                </label>
            </div>
            <div>
                <label>
                    Pizza Boyutu:
                    <select name="boyut" value={formData.boyut} onChange={handleChange} required>
                        <option value="">Seçin</option>
                        <option value="Küçük">Küçük</option>
                        <option value="Orta">Orta</option>
                        <option value="Büyük">Büyük</option>
                    </select>
                </label>
            </div>
            <div>
                <label>Malzemeler:</label>
                <label>
                    <input 
                        type="checkbox" 
                        name="malzemeler" 
                        value="Pepperoni" 
                        onChange={handleChange} 
                    /> 
                    Pepperoni
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        name="malzemeler" 
                        value="Mushrooms" 
                        onChange={handleChange} 
                    /> 
                    Mantar
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        name="malzemeler" 
                        value="Onions" 
                        onChange={handleChange} 
                    /> 
                    Soğan
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        name="malzemeler" 
                        value="Sos" 
                        onChange={handleChange} 
                    /> 
                    Sos
                </label>
                {/* İstediğin kadar malzeme ekleyebilirsin */}
            </div>
            <div>
                <label>
                    Özel Notlar:
                    <textarea 
                        name="özel" 
                        value={formData.özel} 
                        onChange={handleChange} 
                    />
                </label>
            </div>
            <button type="submit">Sipariş Ver</button>
        </form>
    );
};

export default OrderForm;
