/* ============================================================================
 * GameVerse - Página de Reviews (v2)
 * ============================================================================ */
(function () {
  'use strict';

  const data = window.GAMEVERSE_DATA;
  let sortBy = 'recent';
  let minScore = 0;

  function render() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    let list = data.reviews.slice().filter(function (r) {
      return r.score >= minScore;
    });

    if (sortBy === 'score-desc') list.sort(function (a, b) { return b.score - a.score; });
    else if (sortBy === 'score-asc') list.sort(function (a, b) { return a.score - b.score; });
    else list.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    grid.innerHTML = list.map(card).join('');
  }

  function resolveImg(p) {
    if (!p || /^https?:/.test(p)) return p;
    const path = p.startsWith('/') ? p : (window.location.pathname.includes('/pages/') ? '../' + p : p);
    return new URL(path, window.location.href).href;
  }

  function card(r) {
    const cls = r.score >= 85 ? 'score-high' : r.score >= 70 ? 'score-mid' : 'score-low';
    return `
      <div class="col-md-6 col-lg-4 fade-in" data-cy="review-card">
        <article class="game-card">
          <div class="card-img-wrap">
            <span class="badge-category">${r.category}</span>
            <span class="badge-score ${cls}" data-cy="review-score">${r.score}</span>
            <img src="${resolveImg(r.image)}" alt="${escapeHtml(r.title)}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span><i class="bi bi-person"></i>${r.author}</span>
              <span><i class="bi bi-calendar3"></i>${formatDate(r.date)}</span>
            </div>
            <h3 class="card-title" data-cy="review-title">${r.title}</h3>
            <p class="card-text">${r.excerpt}</p>
            <a href="post.html?id=${encodeURIComponent(r.id)}&type=review" class="read-more">
              Ler review completo <i class="bi bi-arrow-right"></i>
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

  function setupControls() {
    const sortEl = document.getElementById('sort-select');
    const scoreEl = document.getElementById('min-score');
    const scoreLabel = document.getElementById('min-score-label');

    sortEl.addEventListener('change', function (e) {
      sortBy = e.target.value;
      render();
    });

    scoreEl.addEventListener('input', function (e) {
      minScore = Number(e.target.value);
      scoreLabel.textContent = minScore;
      render();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    setupControls();
  });
})();
