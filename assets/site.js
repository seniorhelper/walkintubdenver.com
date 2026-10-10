(function(){
  var b=document.querySelector('.menu-btn'),d=document.getElementById('drawer');
  if(b&&d){b.addEventListener('click',function(){var o=d.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&d.classList.contains('open')){d.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus();}});}
})();
