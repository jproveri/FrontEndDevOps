/// <reference types="cypress" />

describe('GameVerse - Notícias', () => {
  beforeEach(() => {
    cy.visitNews();
  });

  it('deve listar notícias ao carregar a página', () => {
    cy.get('[data-cy="news-grid"] [data-cy="news-card"]').its('length').should('be.gte', 1);
  });

  it('deve carregar imagens reais para cada notícia', () => {
    cy.get('[data-cy="news-grid"] img').each(($img) => {
      cy.wrap($img).should('have.attr', 'src').and('include', 'http');
    });
  });

  it('deve filtrar por categoria RPG', () => {
    cy.get('[data-cy="filter-RPG"]').click();
    cy.get('[data-cy="news-card"]').each(($card) => {
      cy.wrap($card).find('.badge-category').should('contain.text', 'RPG');
    });
  });

  it('deve filtrar por FPS', () => {
    cy.get('[data-cy="filter-FPS"]').click();
    cy.get('[data-cy="news-card"]').each(($card) => {
      cy.wrap($card).find('.badge-category').should('contain.text', 'FPS');
    });
  });

  it('deve buscar notícias por palavra-chave', () => {
    cy.get('[data-cy="search-input"]').type('GTA');
    cy.get('[data-cy="news-card"]').should('have.length.at.least', 1);
    cy.get('[data-cy="news-title"]').first().should('contain.text', 'GTA');
  });

  it('deve mostrar mensagem de vazio quando busca não encontra nada', () => {
    cy.get('[data-cy="search-input"]').type('xyzzz_inexistente_999');
    cy.get('[data-cy="no-results"]').should('be.visible');
  });

  it('deve abrir a matéria completa ao clicar em "Ler matéria"', () => {
    cy.get('[data-cy="news-card"]').first().find('.read-more').click();
    cy.url().should('include', '/pages/post.html?id=');
    cy.get('[data-cy="article-title"]').should('be.visible');
    cy.get('[data-cy="article-body"]').should('not.be.empty');
  });
});
