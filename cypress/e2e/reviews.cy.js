/// <reference types="cypress" />

describe('GameVerse - Reviews', () => {
  beforeEach(() => {
    cy.visitReviews();
  });

  it('deve renderizar reviews na página', () => {
    cy.get('[data-cy="reviews-grid"] [data-cy="review-card"]').its('length').should('be.gte', 1);
  });

  it('deve carregar imagens reais nos cards de review', () => {
    cy.get('[data-cy="reviews-grid"] img').each(($img) => {
      cy.wrap($img).should('have.attr', 'src').and('include', 'http');
    });
  });

  it('deve ordenar por maior nota', () => {
    cy.get('[data-cy="sort-select"]').select('score-desc');
    const scores = [];
    cy.get('[data-cy="review-score"]').each(($el) => {
      scores.push(Number($el.text()));
    }).then(() => {
      const sorted = [...scores].sort((a, b) => b - a);
      expect(scores).to.deep.equal(sorted);
    });
  });

  it('deve ordenar por menor nota', () => {
    cy.get('[data-cy="sort-select"]').select('score-asc');
    const scores = [];
    cy.get('[data-cy="review-score"]').each(($el) => {
      scores.push(Number($el.text()));
    }).then(() => {
      const sorted = [...scores].sort((a, b) => a - b);
      expect(scores).to.deep.equal(sorted);
    });
  });

  it('deve filtrar pela nota mínima', () => {
    cy.get('[data-cy="min-score"]').invoke('val', 85).trigger('input');
    cy.get('[data-cy="min-score-label"]').should('contain.text', '85');
    cy.get('[data-cy="review-score"]').each(($el) => {
      expect(Number($el.text())).to.be.gte(85);
    });
  });

  it('deve abrir o review completo com prós e contras', () => {
    cy.get('[data-cy="review-card"]').first().find('.read-more').click();
    cy.url().should('include', '/pages/post.html?id=');
    cy.get('[data-cy="article-title"]').should('be.visible');
    cy.get('.pros-box').should('exist');
    cy.get('.cons-box').should('exist');
  });
});
