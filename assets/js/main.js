/* ============================================================================
 * GameVerse - Página inicial (v2)
 * ============================================================================ */
(function () {
  'use strict';

  const data = window.GAMEVERSE_DATA;

  function newsCard(n) {
    return `
      <div class="col-md-6 col-lg-4 fade-in" data-cy="news-card">
        <article class="game-card">
          <div class="card-img-wrap">
            <span class="badge-category">${n.category}</span>
            <img src="${resolveImg(n.image)}" alt="${escapeHtml(n.title)}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span><i class="bi bi-calendar3"></i>${formatDate(n.date)}</span>
              <span><i class="bi bi-clock"></i>${n.readingTime}</span>
            </div>
            <h3 class="card-title">${n.title}</h3>
            <p class="card-text">${n.excerpt}</p>
            <a href="pages/post.html?id=${encodeURIComponent(n.id)}&type=news" class="read-more">
              Ler matéria completa <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </article>
      </div>
    `;
  }

  function reviewCard(r) {
    const cls = scoreClass(r.score);
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
            <h3 class="card-title">${r.title}</h3>
            <p class="card-text">${r.excerpt}</p>
            <a href="pages/post.html?id=${encodeURIComponent(r.id)}&type=review" class="read-more">
              Ler review completo <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </article>
      </div>
    `;
  }

  function resolveImg(p) {
    // Resolve caminho da imagem baseado em onde a página está.
    // Se estamos em /pages/*.html, prefixa com '../'
    if (!p || /^https?:/.test(p) || p.startsWith('/')) return p;
    return window.location.pathname.includes('/pages/') ? '../' + p : p;
  }

  function scoreClass(s) {
    if (s >= 85) return 'score-high';
    if (s >= 70) return 'score-mid';
    return 'score-low';
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;
    const featured = data.news.filter((n) => n.featured).slice(0, 3);
    grid.innerHTML = featured.map(newsCard).join('');
  }

  function renderRecentReviews() {
    const grid = document.getElementById('recent-reviews');
    if (!grid) return;
    const recent = data.reviews.slice(0, 3);
    grid.innerHTML = recent.map(reviewCard).join('');
  }

  function setupNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      document.getElementById('newsletter-success').classList.remove('d-none');
      setTimeout(function () {
        form.reset();
        form.classList.remove('was-validated');
        document.getElementById('newsletter-success').classList.add('d-none');
        const modal = bootstrap.Modal.getInstance(document.getElementById('newsletter-modal'));
        if (modal) modal.hide();
      }, 1800);
    });
  }

  function adjustBodyForFixedNav() {
    document.body.style.paddingTop = '70px';
  }

  document.addEventListener('DOMContentLoaded', function () {
    adjustBodyForFixedNav();
    renderFeatured();
    renderRecentReviews();
    setupNewsletter();
  });
})();
