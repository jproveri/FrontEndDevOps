(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const g = document.getElementById('reviews-grid');
    if (!g) return;
    g.innerHTML = window.GAMEVERSE_DATA.reviews.map(function(r){
      return '<div><h6>'+r.title+' '+r.score+'</h6></div>';
    }).join('');
  });
})();
