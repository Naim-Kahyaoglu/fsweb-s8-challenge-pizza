import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const OrderForm = () => {
    const [formData, setFormData] = useState({ boyut: '', hamur: 'Hamur Kalınlığı', malzemeler: [], özel: '', quantity: 1 });
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'malzemeler') {
            const newSelections = formData.malzemeler.includes(value)
                ? formData.malzemeler.filter(malzeme => malzeme !== value)
                : [...formData.malzemeler, value];
            setFormData(prevData => ({ ...prevData, malzemeler: newSelections }));
        } else if (name === 'quantity') {
            setFormData(prevData => ({ ...prevData, quantity: value }));
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://reqres.in/api/pizza', formData)
            .then(response => { console.log(response.data); history.push('/order-success'); })
            .catch(error => { console.error('There was an error!', error); });
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header bileşeni */}
            <div className="bg-red-600 text-white w-full py-5 px-10">
                <h1 className="text-center text-xl md:text-3xl pt-12">Teknolojik Yemekler</h1>
                <div className="absolute bottom-2 left-4 text-xs">anasayfa - sipariş oluştur</div>
            </div>

            {/* "Position Absolute Acı Pizza" bileşeni */}
            <div className="bg-gray-100 p-6 rounded-lg mx-auto mt-8 max-w-xl">
                <div className="text-xl font-bold mb-4">Position Absolute Acı Pizza</div>
                <div className="flex justify-between text-lg">
                    <div className="text-orange-600 font-bold">85.50₺</div>
                    <div className="text-green-500">4.9 (200)</div>
                </div>
                <div className="mt-4 text-gray-800 italic">
                    Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, 
                    daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan 
                    İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
                </div>
            </div>

            {/* Form içerikleri */}
            <div className="flex-grow mx-auto mt-8 w-full max-w-3xl px-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Boyut ve Hamur Seç */}
                    <div className="flex justify-between mb-6 space-x-4">
                        <div className="flex-1">
                            <label className="block text-lg">Boyut Seç</label>
                            <div><label><input type="radio" name="boyut" value="Küçük" onChange={handleChange} checked={formData.boyut === 'Küçük'} /> Küçük</label></div>
                            <div><label><input type="radio" name="boyut" value="Orta" onChange={handleChange} checked={formData.boyut === 'Orta'} /> Orta</label></div>
                            <div><label><input type="radio" name="boyut" value="Büyük" onChange={handleChange} checked={formData.boyut === 'Büyük'} /> Büyük</label></div>
                        </div>

                        {/* Hamur Seç */}
                        <div className="flex-1">
                            <label className="block text-lg">Hamur Seç</label>
                            <select name="hamur" onChange={handleChange} value={formData.hamur} className="w-full p-2 text-lg">
                                <option value="Hamur Kalınlığı">Hamur Kalınlığı</option>
                                <option value="İnce">İnce</option>
                                <option value="Normal">Normal</option>
                                <option value="Kalın">Kalın</option>
                            </select>
                        </div>
                    </div>

                    {/* Ek Malzemeler */}
                    <div className="mt-6">
                        <label className="text-2xl">Ek Malzemeler</label>
                        <div className="text-left text-lg mb-2">En Fazla 10 malzeme seçebilirsiniz. 5₺</div>
                        <div className="flex flex-wrap gap-4">
                            {['Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara', 'Soğan', 'Domates', 'Mısır', 'Sucuk', 'Jalepeno', 'Sarımsak', 'Biber', 'Ananas', 'Kabak'].map(malzeme => (
                                <div key={malzeme} className="w-1/3">
                                    <label><input type="checkbox" name="malzemeler" value={malzeme} onChange={handleChange} /> {malzeme}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sipariş Notu */}
                    <div className="mt-6">
                        <label className="text-2xl">Sipariş Notu</label>
                        <textarea name="özel" value={formData.özel} onChange={handleChange}
                            className="w-full min-h-[100px] p-4 text-lg resize-none"
                            placeholder="Siparişine eklemek istediğin bir not var mı?" />
                    </div>
                </form>
            </div>

            {/* Footer: Sayaç ve Sipariş Ver Butonu */}
            <div className="bg-white py-4 px-8 flex flex-col items-center shadow-lg space-y-4">
                {/* Sayaç kısmı */}
                <div className="flex items-center space-x-4">
                    <button 
                        className="bg-gray-200 p-2 text-2xl" 
                        onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}>-</button>
                    <div className="text-2xl">{formData.quantity}</div>
                    <button 
                        className="bg-gray-200 p-2 text-2xl" 
                        onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}>+</button>
                </div>
                {/* Sipariş Ver Butonu */}
                <button type="submit" className="w-full bg-orange-600 text-white p-3 text-xl">
                    Sipariş Ver
                </button>
            </div>
        </div>
    );
};

export default OrderForm;
