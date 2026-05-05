(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const grid = document.getElementById('news-grid');
    if (!grid) return;
    grid.innerHTML = window.GAMEVERSE_DATA.news.map(function(n){
      return '<div><h5>'+n.title+'</h5></div>';
    }).join('');
  });
})();
