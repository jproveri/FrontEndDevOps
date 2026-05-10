describe('Home', () => {
  it('exibe logo', () => { cy.visit('/'); cy.get('[data-cy="brand-logo"]').should('be.visible'); });
});
