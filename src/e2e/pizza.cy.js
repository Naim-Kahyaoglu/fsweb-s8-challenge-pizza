describe('Pizza Siparişi Testi', () => {
    beforeEach(() => {
      // Test başlamadan önce açılacak sayfa
      cy.visit('/order');
    });
  
    it('Sipariş notu için en az 3 harf girilmeli', () => {
      // Başlangıçta hata mesajı yok
      cy.get('.error-message').should('not.exist');
  
      // 2 harften daha kısa bir not gir
      cy.get('textarea[name="özel"]').type('A');
      cy.get('button[type="submit"]').click();
  
      // Uyarı mesajı görünsün
      cy.get('.error-message').should('contain', 'Lütfen geçerli bir mesaj giriniz! En az 3 harf uzunluğunda bir kelime girilmelidir!');
  
      // 3 harften uzun bir mesaj gir
      cy.get('textarea[name="özel"]').clear().type('Hızlı gelsin');
      cy.get('button[type="submit"]').click();
  
      // Hata mesajı kaybolmalı
      cy.get('.error-message').should('not.exist');
    });
  
    it('Ek malzemeler seçilebilmeli', () => {
      // Ek malzemeler kısmını kontrol et
      cy.get('.ingredient-item').should('have.length.greaterThan', 1);
  
      // Ek malzeme seç
      cy.get('input[type="checkbox"]').first().check();
      cy.get('input[type="checkbox"]').eq(1).check();
  
      // Seçilen malzemeleri kontrol et
      cy.get('input[type="checkbox"]:checked').should('have.length', 2);
    });
  });
  describe('Pizza Siparişi Testi', () => {
    beforeEach(() => {
      // Test başlamadan önce açılacak sayfa
      cy.visit('/order');
    });
  
    it('Form doğru şekilde doldurulmalı ve sipariş verilmeli', () => {
      // Test sırasında yapılacak API isteklerini intercept (yakalama) et
      cy.intercept('POST', 'https://reqres.in/api/pizza').as('submitOrder'); // API URL'nizle değiştirdiğinizden emin olun
  
      // Boyut Seçimi yapılmalı (En az bir boyut seçilmeli)
      cy.get('input[type="radio"][value="Küçük"]').check();  // Boyut seçildi
      cy.get('input[type="radio"][value="Orta"]').should('be.checked'); // Orta boy seçildi
  
      // Hamur Seçimi yapılmalı (İnce, Normal veya Kalın seçilmeli)
      cy.get('select[name="hamur"]').select('İnce');  // İnce hamur seçildi
      cy.get('select[name="hamur"]').should('have.value', 'İnce'); // Hamur ince olarak seçildi
  
      // Geçerli bir sipariş notu girilmeli (en az 3 harf)
      cy.get('textarea[name="özel"]').type('Hızlı gelsin');  // Geçerli bir sipariş notu
      cy.get('textarea[name="özel"]').should('have.value', 'Hızlı gelsin'); // Sipariş notu girildi
  
      // Ek malzemeler seçilebilir (En az 1 malzeme)
      cy.get('input[type="checkbox"][value="Pepperoni"]').check(); // Malzeme seçildi
      cy.get('input[type="checkbox"][value="Pepperoni"]').should('be.checked'); // Pepperoni seçildi
  
      // Sipariş Ver butonuna tıklanarak form gönderilmeli
      cy.get('button[type="submit"]').click();
  
      // API çağrısının yapılmasını bekle
      cy.wait('@submitOrder').then((interception) => {
        // API çağrısının doğru yapıldığını doğrula
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.request.body).to.have.property('boyut', 'Orta');
        expect(interception.request.body).to.have.property('hamur', 'İnce');
        expect(interception.request.body).to.have.property('malzemeler').to.include('Pepperoni');
        expect(interception.request.body).to.have.property('özel', 'Hızlı gelsin');
      });
  
      // Başarı mesajının gösterilmesini bekle
      cy.url().should('include', '/success'); // Eğer başarıyla yönlendirme yapılacaksa
  
      // Başarı mesajının içerdiği metni kontrol et
      cy.get('h1').should('contain', 'Siparişiniz başarıyla alındı!');
    });
  
    it('Boyut seçimi yapılmadan sipariş verilememeli', () => {
      // Boyut seçmeden formu gönder
      cy.get('button[type="submit"]').click();
  
      // Hata mesajının görünmesini bekle
      cy.get('.error-message')
        .should('be.visible')
        .and('contain.text', 'Lütfen bir boyut seçiniz.');
    });
  
    it('Hamur seçimi yapılmadan sipariş verilememeli', () => {
      // Boyut seçimi yap
      cy.get('input[type="radio"][value="Orta"]').check();
  
      // Hamur seçmeden formu gönder
      cy.get('button[type="submit"]').click();
  
      // Hata mesajının görünmesini bekle
      cy.get('.error-message')
        .should('be.visible')
        .and('contain.text', 'Lütfen bir hamur seçiniz.');
    });
  
    it('Geçerli sipariş notu girilmeden sipariş verilememeli', () => {
      // Boyut ve hamur seçimi yap
      cy.get('input[type="radio"][value="Orta"]').check();
      cy.get('select[name="hamur"]').select('İnce');
  
      // Geçersiz sipariş notu gir
      cy.get('textarea[name="özel"]').type('Hi');
      cy.get('button[type="submit"]').click();
  
      // Hata mesajının görünmesini bekle
      cy.get('.error-message')
        .should('be.visible')
        .and('contain.text', 'Lütfen geçerli bir mesaj giriniz! En az 3 harf uzunluğunda bir kelime girilmelidir!');
    });
  });
  it('Sayfa yüklendiğinde "Hamur Kalınlığı" yazısı görünmeli ve seçilemez olmalı', () => {
    cy.visit('/order');  // Sipariş sayfasına git
    
    // Hamur seçim kutusunda "Hamur Kalınlığı" görünmeli
    cy.get('select[name="hamur"]')
      .find('option[value="Hamur Kalınlığı"]')
      .should('be.visible')
      .and('have.attr', 'disabled');
    
    // Diğer seçenekler (İnce, Normal, Kalın) görünmeli
    cy.get('select[name="hamur"]')
      .find('option')
      .not('[value="Hamur Kalınlığı"]')
      .should('have.length', 3);  // Toplamda 3 seçenek olmalı (İnce, Normal, Kalın)
  });
  
  it('Select box tıklandığında sadece 3 seçenek görünmeli', () => {
    cy.visit('/order');  // Sipariş sayfasına git
  
    // Hamur tipi select kutusuna tıkla
    cy.get('select[name="hamur"]').click();
  
    // "Hamur Kalınlığı" dışında sadece 3 seçenek görünmeli (İnce, Normal, Kalın)
    cy.get('select[name="hamur"]')
      .find('option')
      .not('[value="Hamur Kalınlığı"]')
      .should('have.length', 3);
  });
  