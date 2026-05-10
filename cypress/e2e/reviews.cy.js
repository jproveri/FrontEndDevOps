describe('Reviews', () => {
  it('renderiza reviews', () => { cy.visit('/pages/reviews.html'); cy.get('[data-cy="review-card"]').its('length').should('be.gte', 1); });
});
