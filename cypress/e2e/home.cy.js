/// <reference types="cypress" />

describe('GameVerse - Página inicial', () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it('deve exibir o logo da marca', () => {
    cy.get('[data-cy="brand-logo"]').should('be.visible').and('contain.text', 'GameVerse');
  });

  it('deve exibir o título do hero', () => {
    cy.get('[data-cy="hero-title"]').should('contain.text', 'jogos AAA');
  });

  it('deve renderizar 3 cards em destaque com imagens', () => {
    cy.get('[data-cy="featured-grid"] [data-cy="news-card"]').should('have.length', 3);
    cy.get('[data-cy="featured-grid"] img').first().should('have.attr', 'src').and('include', 'http');
  });

  it('deve renderizar 3 reviews recentes com nota', () => {
    cy.get('[data-cy="recent-reviews"] [data-cy="review-card"]').should('have.length', 3);
    cy.get('[data-cy="review-score"]').first().invoke('text').then((txt) => {
      expect(Number(txt)).to.be.greaterThan(0);
    });
  });

  it('deve navegar para a página de notícias pelo botão do hero', () => {
    cy.get('[data-cy="hero-news-btn"]').click();
    cy.url().should('include', '/pages/noticias.html');
    cy.get('[data-cy="page-header"]').should('contain.text', 'Notícias');
  });

  it('deve navegar para reviews pelo menu', () => {
    cy.get('[data-cy="nav-reviews"]').click();
    cy.url().should('include', '/pages/reviews.html');
  });
});
