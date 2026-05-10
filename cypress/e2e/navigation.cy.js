describe('Nav', () => {
  it('acessa Sobre', () => { cy.visit('/'); cy.get('[data-cy="nav-about"]').click(); cy.url().should('include','sobre'); });
});
