// Theme toggle: applies stored or system theme, listens for toggle clicks.
(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  function getStoredTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    if (toggle) toggle.setAttribute('data-theme', theme);
  }

  // Apply initial theme
  setTheme(getStoredTheme() || getSystemTheme());

  // Listen for system preference changes (only when no stored preference)
  if (!getStoredTheme()) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      setTheme(e.matches ? 'dark' : 'light');
    });
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
})();

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