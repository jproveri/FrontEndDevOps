// Comandos globais Cypress para o GameVerse
import './commands';

Cypress.on('uncaught:exception', () => {
  // Ignora exceções vindas do Bootstrap em ambientes sem JS completo
  return false;
});
