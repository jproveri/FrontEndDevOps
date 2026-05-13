/// <reference types="cypress" />

describe('GameVerse - Navegação geral', () => {
  it('deve acessar a página Sobre pelo menu', () => {
    cy.visitHome();
    cy.get('[data-cy="nav-about"]').click();
    cy.url().should('include', '/pages/sobre.html');
    cy.get('[data-cy="team-list"]').should('contain.text', 'Alexandre Facheris Rebello');
    cy.get('[data-cy="team-list"]').should('contain.text', 'João Roveri');
  });

  it('deve manter a navbar fixa em todas as páginas', () => {
    ['/', '/pages/noticias.html', '/pages/reviews.html', '/pages/sobre.html'].forEach((path) => {
      cy.visit(path);
      cy.get('[data-cy="main-navbar"]').should('be.visible');
    });
  });

  it('deve voltar ao home pelo logo', () => {
    cy.visitNews();
    cy.get('.navbar-brand').click();
    cy.url().should('match', /\/(index\.html)?$/);
  });

  it('deve exibir matéria completa com fonte original', () => {
    cy.visitNews();
    cy.get('[data-cy="news-card"]').first().find('.read-more').click();
    cy.get('[data-cy="article-body"]').should('contain.text', 'Fonte');
  });
});
