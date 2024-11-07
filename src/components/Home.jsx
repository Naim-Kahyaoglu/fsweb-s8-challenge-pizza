// components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // React Router'dan Link bileşeni import ediyoruz

function Home() {
  // Inline stil nesneleri
  const homeContainerStyle = {
    backgroundImage: "url('/assets/Iteration-1-assets/home-banner.png')",  // Public klasöründe göreceli yol
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const contentStyle = {
    textAlign: "center",
    color: "white",
    maxWidth: "600px",
    padding: "20px",
    background: "rgba(0, 0, 0, 0.5)",
    borderRadius: "15px"
  };

  const titleStyle = {
    fontSize: "3rem",
    marginBottom: "20px",
    fontWeight: "bold"
  };

  const subtitleStyle = {
    fontSize: "1.5rem",
    marginBottom: "40px"
  };

  const buttonStyle = {
    fontSize: "1.25rem",
    backgroundColor: "yellow",
    color: "black",
    border: "none",
    padding: "15px 30px",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background-color 0.3s"
  };

  const buttonHoverStyle = {
    backgroundColor: "#ffcc00"
  };

  return (
    <div style={homeContainerStyle}>
      <div style={contentStyle}>
        {/* Pizza Sipariş Uygulaması Başlığı */}
        <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>Pizza Sipariş Uygulaması</h1>

        <h1 style={titleStyle}>Teknolojik Yemekler</h1>
        <p style={subtitleStyle}>Kod Acıktırır<br />Pizza, Doyurur</p>

        {/* Yönlendirme için Link bileşeni kullanıyoruz */}
        <Link to="/order">
          <button
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} // Hover efekti
            onMouseLeave={(e) => e.target.style.backgroundColor = "yellow"} // Hover durumu sona erdiğinde
          >
            ACIKTIM
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
