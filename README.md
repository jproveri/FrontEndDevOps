# 🎮 GameVerse

[![CI](https://github.com/alexandrefacherisrebello/gameverse/actions/workflows/ci.yml/badge.svg)](https://github.com/alexandrefacherisrebello/gameverse/actions/workflows/ci.yml)
[![CD](https://github.com/alexandrefacherisrebello/gameverse/actions/workflows/cd.yml/badge.svg)](https://github.com/alexandrefacherisrebello/gameverse/actions/workflows/cd.yml)

> Portal de notícias e reviews dos maiores jogos **AAA** do mundo.
> Projeto acadêmico desenvolvido para a disciplina de **DevOps & Frontend**.

---

## 📌 Descrição

O **GameVerse** é um site estático (HTML + CSS + JavaScript) cujo tema é o universo dos jogos AAA. O usuário consegue navegar entre notícias e reviews, filtrar por categoria (RPG, FPS, Mundo Aberto, Indie AAA), buscar por palavras-chave, ordenar reviews por nota e se inscrever em uma newsletter.

O projeto também aplica práticas de **DevOps**:

- Versionamento com **Git/GitHub** (repositório privado, PRs e branches dedicadas por feature)
- **Integração Contínua (CI)** com GitHub Actions: lint, build e testes E2E
- **Entrega Contínua (CD)** com deploy automático para **GitHub Pages** após aprovação da pipeline de CI
- Testes **End-to-End** com **Cypress**

---

## 🌐 Site no ar

🔗 **<https://alexandrefacherisrebello.github.io/gameverse/>**

---

## 👥 Equipe

| Nome | E-mail | GitHub |
|------|--------|--------|
| Alexandre Facheris Rebello | alexandrefacherisrebello@gmail.com | [@alexandrefacherisrebello](https://github.com/alexandrefacherisrebello) |
| João Roveri | jproveri25@gmail.com | [@jproveri](https://github.com/jproveri) |

---

## 🛠 Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Framework CSS**: Bootstrap 5 + Bootstrap Icons
- **Testes E2E**: Cypress 13
- **CI/CD**: GitHub Actions
- **Hospedagem**: GitHub Pages
- **Lint**: HTMLHint, Stylelint, ESLint

---

## 📂 Estrutura

```
gameverse/
├── index.html
├── pages/
│   ├── noticias.html
│   ├── reviews.html
│   └── sobre.html
├── assets/
│   ├── css/style.css
│   └── js/{data,main,news,reviews}.js
├── cypress/
│   └── e2e/
│       ├── home.cy.js
│       ├── news.cy.js
│       ├── reviews.cy.js
│       ├── newsletter.cy.js
│       └── navigation.cy.js
├── scripts/build.js
├── .github/workflows/
│   ├── ci.yml
│   └── cd.yml
└── README.md
```

---

## 🚀 Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Subir o servidor estático
npm run serve

# 3. Acessar: http://localhost:8080
```

### Rodando os testes Cypress

```bash
# Modo interativo
npm run cy:open

# Modo headless (CI)
npm test
```

### Rodando os lints

```bash
npm run lint          # roda todos
npm run lint:html
npm run lint:css
npm run lint:js
```

---

## 🔄 Estratégia de Branches (GitHub Flow)

- `main` → produção (protegida, deploy automático)
- `feature/*` → desenvolvimento de novas funcionalidades
- Todo merge em `main` é feito **via Pull Request** com revisão entre os integrantes

Exemplos de branches usadas:

- `feature/layout-base`
- `feature/pagina-noticias`
- `feature/pagina-reviews`
- `feature/newsletter-modal`
- `feature/cypress-e2e`
- `feature/ci-pipeline`
- `feature/cd-deploy`

---

## ⚙️ Pipelines

### CI (`.github/workflows/ci.yml`)

Executa em todo `push` e `pull_request` nas branches `main`, `develop` e `feature/*`:

1. **Lint** (HTMLHint, Stylelint, ESLint)
2. **Build** (gera a pasta `dist/`)
3. **Cypress E2E** (sobe servidor local e executa todos os specs)

### CD (`.github/workflows/cd.yml`)

Executa em todo merge na `main`:

1. Re-valida lint e build
2. Gera artefato de Pages
3. Faz deploy automático em `https://alexandrefacherisrebello.github.io/gameverse/`

---

## 📄 Licença

MIT © 2026 - Alexandre Facheris Rebello & João Roveri
