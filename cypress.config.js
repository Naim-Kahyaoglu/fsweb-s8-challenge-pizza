import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'src/e2e/**/*.cy.js', // Test dosyalarınızın yolu
    setupNodeEvents(on, config) {
      // Node event listeners ekleyebilirsiniz (isteğe bağlı)
    },
    baseUrl: 'http://localhost:3000', // Yerel sunucunuzun adresi (varsa)
  },
});
