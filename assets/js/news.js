/* ============================================================================
 * GameVerse - Página de Notícias (v2)
 * ============================================================================ */
(function () {
  'use strict';

  const data = window.GAMEVERSE_DATA;
  let activeCategory = 'todos';
  let searchTerm = '';

  function render() {
    const grid = document.getElementById('news-grid');
    const empty = document.getElementById('no-results');
    if (!grid) return;

    const filtered = data.news.filter(function (n) {
      const matchesCategory = activeCategory === 'todos' || n.category === activeCategory;
      const matchesSearch = !searchTerm || n.title.toLowerCase().includes(searchTerm) || n.excerpt.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '';
      empty.classList.remove('d-none');
      return;
    }

    empty.classList.add('d-none');
    grid.innerHTML = filtered.map(card).join('');
  }

  function resolveImg(p) {
    if (!p || /^https?:/.test(p) || p.startsWith('/')) return p;
    return window.location.pathname.includes('/pages/') ? '../' + p : p;
  }

  function card(n) {
    return `
      <div class="col-md-6 col-lg-4 fade-in" data-cy="news-card">
        <article class="game-card">
          <div class="card-img-wrap">
            <span class="badge-category">${n.category}</span>
            <img src="${resolveImg(n.image)}" alt="${escapeHtml(n.title)}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span><i class="bi bi-person"></i>${n.author}</span>
              <span><i class="bi bi-calendar3"></i>${formatDate(n.date)}</span>
            </div>
            <h3 class="card-title" data-cy="news-title">${n.title}</h3>
            <p class="card-text">${n.excerpt}</p>
            <a href="post.html?id=${encodeURIComponent(n.id)}&type=news" class="read-more">
              Ler matéria completa <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </article>
      </div>
    `;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function setupFilters() {
    const filters = document.querySelectorAll('#category-filters .cat-btn');
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        render();
      });
    });
  }

  function setupSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('input', function (e) {
      searchTerm = e.target.value.trim().toLowerCase();
      render();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    setupFilters();
    setupSearch();
  });
})();
