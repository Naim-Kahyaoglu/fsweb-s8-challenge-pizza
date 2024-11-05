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

    // Stil düzenlemeleri
    const headerStyle = { backgroundColor: 'red', color: 'white', width: '1920px', height: '207px', padding: '20px', position: 'relative', margin: '0 auto' };
    const headingStyle = { fontSize: '3em', margin: 0, textAlign: 'center', paddingTop: '50px' };
    const subTextStyle = { fontSize: '0.8em', position: 'absolute', bottom: '10px', left: '20px', textTransform: 'lowercase' };
    
    // "Position Absolute Acı Pizza" içerik stili
    const pizzaDetailsStyle = {
        backgroundColor: '#f8f8f8',
        padding: '20px',
        marginTop: '20px',
        width: '532px',
        height: 'auto',  // Yükseklik otomatik olacak, içerik kadar uzayacak
        borderRadius: '10px',
        margin: '0 auto',
    };
    
    const pizzaHeadingStyle = { fontSize: '1.8em', fontWeight: 'bold', marginBottom: '10px' };
    const pizzaInfoStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2em' };
    const pizzaPriceStyle = { fontSize: '1.5em', color: '#FF5733', fontWeight: 'bold' };
    const pizzaRatingStyle = { fontSize: '1.1em', color: '#4CAF50' };
    
    // İçeriğin (paragraf) stili
    const pizzaDescriptionStyle = {
        fontSize: '1em',
        color: '#333',
        marginTop: '20px',
        lineHeight: '1.6',
        fontStyle: 'italic',
        marginBottom: '10px',  // İçeriğin altına 1 satır boşluk ekliyoruz
    };

    // Form Container Style
    const formContainerStyle = { 
        width: '532px', 
        margin: '0 auto', 
        paddingTop: '20px', 
        minHeight: '60vh', 
        flex: 1,
        marginTop: '20px'
    };

    const selectionRowStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-start' };

    // Ek Malzemeler için düzenleme
    const ekMalzemelerContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px', // Aralarındaki boşluk
        maxHeight: '300px', // Yüksekliği sınırlandırıyoruz
        overflowY: 'auto', // Yüksekliği aştığında kaydırma çubuğu ekler
        marginBottom: '10px'
    };

    const malzemeItemStyle = {
        width: 'calc(33.33% - 10px)', // Her satırda 3 malzeme olacak, margin'i hesaba katıyoruz
        flexBasis: '30%', // Yüksekliğini ayarlıyoruz
        fontSize: '1em'
    };

    // Sipariş Ver Butonu ve Sayaç Alt Bileşenleri
    const footerContainerStyle = {
        position: 'absolute',  // Sayfanın en altına sabitlemek için absolute kullanıyoruz
        bottom: '0',
        left: '50%', // Yatayda tam ortalamak için %50 konumlandırıyoruz
        transform: 'translateX(-50%)', // Sol tarafa kaydırarak tam ortalama sağlıyoruz
        width: '532px', // Bileşenin genişliğini 532px yapıyoruz
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    };

    const quantityStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.3em' };
    const quantityButtonStyle = { backgroundColor: '#f0f0f0', border: '1px solid #ccc', padding: '5px 15px', fontSize: '1.3em', cursor: 'pointer' };
    const buttonStyle = { width: '100%', padding: '10px', fontSize: '1.1em', backgroundColor: '#FF5733', color: 'white', border: 'none', cursor: 'pointer' };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', position: 'relative' }}>
            {/* Header bileşeni */}
            <div style={headerStyle}>
                <h1 style={headingStyle}>Teknolojik Yemekler</h1>
                <div style={subTextStyle}>anasayfa - sipariş oluştur</div>
            </div>

            {/* "Position Absolute Acı Pizza" bileşeni */}
            <div style={pizzaDetailsStyle}>
                <div style={pizzaHeadingStyle}>Position Absolute Acı Pizza</div>
                <div style={pizzaInfoStyle}>
                    <div style={pizzaPriceStyle}>85.50₺</div>
                    <div style={pizzaRatingStyle}>4.9 (200)</div>
                </div>
                <div style={pizzaDescriptionStyle}>
                    Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, 
                    daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan 
                    İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
                </div>
            </div>

            {/* Form içerikleri */}
            <div style={formContainerStyle}>
                <form onSubmit={handleSubmit}>
                    {/* Boyut ve Hamur Seç */}
                    <div style={selectionRowStyle}>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '1.3em' }}>Boyut Seç</label>
                            <div><label><input type="radio" name="boyut" value="Küçük" onChange={handleChange} checked={formData.boyut === 'Küçük'} /> Küçük</label></div>
                            <div><label><input type="radio" name="boyut" value="Orta" onChange={handleChange} checked={formData.boyut === 'Orta'} /> Orta</label></div>
                            <div><label><input type="radio" name="boyut" value="Büyük" onChange={handleChange} checked={formData.boyut === 'Büyük'} /> Büyük</label></div>
                        </div>

                        {/* Hamur Seç */}
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '1.3em' }}>Hamur Seç</label>
                            <div><select name="hamur" onChange={handleChange} value={formData.hamur} style={{ width: '60%', padding: '4px', height: '30px' }}>
                                <option value="Hamur Kalınlığı">Hamur Kalınlığı</option>
                                <option value="İnce">İnce</option>
                                <option value="Normal">Normal</option>
                                <option value="Kalın">Kalın</option>
                            </select></div>
                        </div>
                    </div>

                    {/* Ek Malzemeler */}
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ fontSize: '1.5em' }}>Ek Malzemeler</label>
                        <div style={{ textAlign: 'left', marginBottom: '10px', fontSize: '1em' }}><span>En Fazla 10 malzeme seçebilirsiniz. 5₺</span></div>
                        <div style={ekMalzemelerContainerStyle}>
                            {['Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara', 'Soğan', 'Domates', 'Mısır', 'Sucuk', 'Jalepeno', 'Sarımsak', 'Biber', 'Ananas', 'Kabak'].map(malzeme => (
                                <div key={malzeme} style={malzemeItemStyle}><label><input type="checkbox" name="malzemeler" value={malzeme} onChange={handleChange} /> {malzeme}</label></div>
                            ))}
                        </div>
                    </div>

                    {/* Sipariş Notu */}
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ fontSize: '1.5em' }}>Sipariş Notu</label>
                        <div><textarea name="özel" value={formData.özel} onChange={handleChange} 
                            style={{ width: '100%', height: 'auto', minHeight: '100px', padding: '10px', fontSize: '1.1em', resize: 'none', overflow: 'hidden' }} 
                            placeholder="Siparişine eklemek istediğin bir not var mı?" /></div>
                    </div>
                </form>
            </div>

            {/* Footer: Sayaç ve Sipariş Ver Butonu */}
            <div style={footerContainerStyle}>
                <div style={{ flex: 1 }}>
                    <div style={quantityStyle}>
                        <button style={quantityButtonStyle} onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}>-</button>
                        <div>{formData.quantity}</div>
                        <button style={quantityButtonStyle} onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}>+</button>
                    </div>
                </div>
                <div style={{ flex: 1, marginLeft: '20px' }}>
                    <button type="submit" style={buttonStyle}>Sipariş Ver</button>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;
