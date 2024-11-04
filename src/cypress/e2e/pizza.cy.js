describe('Pizza Order Form Tests', () => {
    beforeEach(() => {
        // Anasayfa URL'si ile başlat
        cy.visit('http://localhost:3000'); // Uygulamanın çalıştığı URL'yi güncelle
    });

    it('should type into the name input', () => {
        cy.get('input[name="isim"]')
            .type('Ali')
            .should('have.value', 'Ali');
    });

    it('should allow multiple toppings to be selected', () => {
        cy.get('input[type="checkbox"][value="Pepperoni"]').check();
        cy.get('input[type="checkbox"][value="Mantar"]').check();
        cy.get('input[type="checkbox"][value="Sos"]').check();
        
        // Seçilen malzemeleri kontrol et
        cy.get('input[type="checkbox"][value="Pepperoni"]').should('be.checked');
        cy.get('input[type="checkbox"][value="Mantar"]').should('be.checked');
        cy.get('input[type="checkbox"][value="Sos"]').should('be.checked');
    });

    it('should submit the form', () => {
        cy.get('input[name="isim"]').type('Ali');
        cy.get('select[name="boyut"]').select('Orta');
        cy.get('input[type="checkbox"][value="Pepperoni"]').check();
        cy.get('input[type="checkbox"][value="Mantar"]').check();
        cy.get('textarea[name="özel"]').type('Extra sos olsun.');
        
        // Formu gönder
        cy.get('button[type="submit"]').click();

        // Başarılı bir şekilde yönlendirilip yönlendirilmediğini kontrol et
        cy.url().should('include', '/success'); // Başarı sayfasının URL'sini kontrol et
    });
});
