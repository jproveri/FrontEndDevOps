/* ============================================================================
 * GameVerse - Página de Post (matéria/review individual)
 * ============================================================================ */
(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const type = params.get('type') || 'news';

  const data = window.GAMEVERSE_DATA;
  const list = type === 'review' ? data.reviews : data.news;
  const post = list.find(function (p) { return p.id === id; });

  if (!post) {
    document.getElementById('article-body').innerHTML = `
      <div class="empty-state">
        <i class="bi bi-exclamation-triangle"></i>
        <p class="lead mt-3">Matéria não encontrada.</p>
        <a href="noticias.html" class="btn btn-gv-primary mt-3">Voltar para notícias</a>
      </div>`;
    return;
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  function scoreClass(s) {
    if (s >= 85) return 'score-high';
    if (s >= 70) return 'score-mid';
    return 'score-low';
  }

  function resolveImg(p) {
    if (!p || /^https?:/.test(p)) return p;
    const path = p.startsWith('/') ? p : (window.location.pathname.includes('/pages/') ? '../' + p : p);
    return new URL(path, window.location.href).href;
  }

  // Define hero background
  const hero = document.getElementById('article-hero');
  hero.style.backgroundImage = `linear-gradient(180deg, rgba(10,10,15,0.3), rgba(10,10,15,0.95)), url('${resolveImg(post.image)}')`;

  document.title = post.title + ' | GameVerse';
  document.getElementById('article-category').textContent = post.category;
  document.getElementById('article-title').textContent = post.title;

  const metaHtml = `
    <span><i class="bi bi-person"></i> ${post.author}</span>
    <span><i class="bi bi-calendar3"></i> ${formatDate(post.date)}</span>
    <span><i class="bi bi-clock"></i> ${post.readingTime} de leitura</span>
    ${typeof post.score === 'number' ? `<span class="badge-score ${scoreClass(post.score)}" style="position:static;display:inline-flex;width:auto;height:auto;padding:4px 14px;border-radius:14px;font-size:0.9rem;">Nota: ${post.score}</span>` : ''}
  `;
  document.getElementById('article-meta').innerHTML = metaHtml;

  // Corpo
  let bodyHtml = post.content.map(function (p) { return '<p>' + p + '</p>'; }).join('');

  if (post.pros && post.cons) {
    bodyHtml += `
      <div class="article-pros-cons">
        <div class="pros-box">
          <h4><i class="bi bi-hand-thumbs-up"></i> Prós</h4>
          <ul>${post.pros.map(function (p) { return '<li>' + p + '</li>'; }).join('')}</ul>
        </div>
        <div class="cons-box">
          <h4><i class="bi bi-hand-thumbs-down"></i> Contras</h4>
          <ul>${post.cons.map(function (c) { return '<li>' + c + '</li>'; }).join('')}</ul>
        </div>
      </div>
    `;
  }

  if (post.source && post.sourceUrl) {
    bodyHtml += `
      <hr class="my-4" style="border-color: rgba(255,255,255,0.1);" />
      <p class="text-secondary small">
        <i class="bi bi-link-45deg"></i> Fonte original:
        <a href="${post.sourceUrl}" target="_blank" rel="noopener">${post.source}</a>
      </p>
    `;
  }

  document.getElementById('article-body').innerHTML = bodyHtml;
})();
