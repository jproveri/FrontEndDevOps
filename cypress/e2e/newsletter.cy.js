/// <reference types="cypress" />

describe('GameVerse - Newsletter modal', () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it('deve abrir o modal de newsletter', () => {
    cy.get('[data-cy="open-newsletter"]').click();
    cy.get('[data-cy="newsletter-modal"]').should('be.visible');
  });

  it('deve validar campos obrigatórios', () => {
    cy.get('[data-cy="open-newsletter"]').click();
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.get('[data-cy="newsletter-email"]:invalid').should('exist');
  });

  it('deve aceitar inscrição válida e mostrar mensagem de sucesso', () => {
    cy.get('[data-cy="open-newsletter"]').click();
    cy.get('[data-cy="newsletter-name"]').type('Alexandre');
    cy.get('[data-cy="newsletter-email"]').type('alex@gameverse.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.get('[data-cy="newsletter-success"]').should('be.visible');
  });
});
