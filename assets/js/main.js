(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const grid = document.getElementById('featured-grid');
    if (!grid) return;
    grid.innerHTML = window.GAMEVERSE_DATA.news.filter(function(n){return n.featured;}).map(function(n){
      return '<div class="col-md-4"><h5>'+n.title+'</h5></div>';
    }).join('');
  });
})();
