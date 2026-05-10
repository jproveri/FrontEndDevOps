// Comandos customizados do projeto

Cypress.Commands.add('visitHome', () => {
  cy.visit('/');
});

Cypress.Commands.add('visitNews', () => {
  cy.visit('/pages/noticias.html');
});

Cypress.Commands.add('visitReviews', () => {
  cy.visit('/pages/reviews.html');
});
