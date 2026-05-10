describe('Notícias', () => {
  it('lista notícias', () => { cy.visit('/pages/noticias.html'); cy.get('[data-cy="news-card"]').its('length').should('be.gte', 1); });
});
