import React from 'react';

// OrderSuccess Bileşeni
const OrderSuccess = () => {
  // Sayfa için stil
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // İçeriği dikeyde ortalamak için center kullanıyoruz
    alignItems: 'center', // İçeriği yatayda ortalamak için center kullanıyoruz
    height: '100vh',
    backgroundColor: 'red', // Arka planı kırmızı yaptık
    color: 'white', // Yazıları beyaz yapıyoruz
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2rem',
    marginTop: '20px', // Sayfa başlığına üstten biraz boşluk
    position: 'absolute',
    top: '20px', // Sayfa başlığını üstte tutuyoruz
    left: '50%',
    transform: 'translateX(-50%)', // Sayfa başlığını yatayda ortalamak için
  };

  const messageStyle = {
    fontSize: '1.5rem',
    marginTop: '20px', // Mesajın üst kısmına biraz boşluk ekliyoruz
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Teknolojik Yemekler</h1> {/* Sayfa Başlığı */}
      <p style={messageStyle}>TEBRİKLER!<br/>SİPARİŞİNİZ ALINDI!</p> {/* Mesaj */}
    </div>
  );
};

export default OrderSuccess;
