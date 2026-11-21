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

  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
    if (toggle) toggle.setAttribute('data-theme', theme);
  }

  var stored = getStoredTheme();
  setTheme(stored || getSystemTheme(), false);

  // Follow system preference changes whenever the user has not chosen a theme.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!getStoredTheme()) {
      setTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark', true);
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
    var progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
    bar.style.strokeDashoffset = length * (1 - progress);
  }

  bar.style.strokeDasharray = length;
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

// Adds a "Copy" button to every code block.
(function () {
  var blocks = document.querySelectorAll('pre');
  if (!blocks.length) return;

  var SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"/></svg>';

  function copyText(text, btn) {
    function done() {
      var label = btn.querySelector('.copy-label');
      if (label) label.textContent = 'Copied!';
      btn.classList.add('copied');
      btn.innerHTML = CHECK + (label ? label.outerHTML : '');
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.innerHTML = SVG + '<span class="copy-label">Copy</span>';
      }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else {
      fallback(text);
      done();
    }

    function fallback(t) {
      var ta = document.createElement('textarea');
      ta.value = t;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  for (var i = 0; i < blocks.length; i++) {
    (function (pre) {
      var code = pre.querySelector('code');
      if (!code) return;

      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.innerHTML = SVG + '<span class="copy-label">Copy</span>';

      btn.addEventListener('click', function () {
        copyText(code.innerText, btn);
      });

      pre.style.position = 'relative';
      pre.appendChild(btn);
    })(blocks[i]);
  }
})();