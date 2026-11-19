// Fills the ring around the Top button as the page is scrolled.
(function () {
  var top = document.querySelector('.fabs .top');
  var bar = top && top.querySelector('.ring-bar');
  if (!bar) return;

  var length = 2 * Math.PI * Number(bar.getAttribute('r'));

  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.strokeDashoffset = length * (1 - progress);
  }

  bar.style.strokeDasharray = length;
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();
