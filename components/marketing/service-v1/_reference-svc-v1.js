// Service page v1 interactions — no libraries. Every feature degrades to fully visible static content.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function money(v) { return '$' + v.toFixed(2); }

  // 1) Package picker (radiogroup). In code: selection state + ADD TO CART go through the existing commerce flow.
  var tiles = $$('.pk-tile');
  var nameEl = document.querySelector('[data-name]'), priceEl = document.querySelector('[data-price]'),
      cmpEl = document.querySelector('[data-cmp]'), saveEl = document.querySelector('[data-save]');
  function pick(t, focus) {
    tiles.forEach(function (o) { var on = o === t; o.setAttribute('aria-checked', on ? 'true' : 'false'); o.tabIndex = on ? 0 : -1; });
    var p = +t.dataset.p, c = +t.dataset.c;
    nameEl.textContent = t.dataset.q + ' Instagram Followers';
    priceEl.textContent = money(p); cmpEl.textContent = money(c); saveEl.textContent = 'You save ' + money(c - p);
    priceEl.classList.remove('bump'); void priceEl.offsetWidth; priceEl.classList.add('bump');
    if (focus) t.focus();
  }
  tiles.forEach(function (t, i) {
    t.tabIndex = t.getAttribute('aria-checked') === 'true' ? 0 : -1;
    t.addEventListener('click', function () { pick(t); });
    t.addEventListener('keydown', function (e) {
      var d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
      if (!d) return;
      pick(tiles[(i + d + tiles.length) % tiles.length], true); e.preventDefault();
    });
  });

  // 2) "Who orders" tabs (WAI-ARIA tabs, arrow keys)
  var tabs = $$('.who-tabs [role="tab"]');
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var n = tabs[(i + d + tabs.length) % tabs.length]; select(n); n.focus(); e.preventDefault();
    });
  });

  // 3) Promises: one <details> open at a time + matching visual
  var promises = $$('.prom-list details'), states = $$('.pv-state');
  promises.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      promises.forEach(function (o) { if (o !== d) o.open = false; });
      states.forEach(function (s) { s.classList.toggle('on', s.getAttribute('data-key') === d.getAttribute('data-key')); });
    });
  });

  // 4) "+2,000" counter: counts up once when the card enters the viewport. Final number is in the HTML.
  var counter = document.querySelector('[data-count]');
  if (counter && !reduce && 'IntersectionObserver' in window) {
    var target = +counter.dataset.count, done = false;
    counter.textContent = '+0';
    new IntersectionObserver(function (es, io) {
      if (done || !es[0].isIntersecting) return;
      done = true; io.disconnect();
      var t0 = performance.now();
      (function tick(now) {
        var k = Math.min(1, (now - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
        counter.textContent = '+' + Math.round(target * e).toLocaleString('en-US');
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: 0.6 }).observe(counter);
  }

  // 5) Mobile sticky CTA hides while the picker is on screen
  var sticky = document.querySelector('.sticky-cta'), picker = document.getElementById('pricing-packages');
  if (sticky && picker && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { sticky.classList.toggle('away', es[0].isIntersecting); }, { threshold: 0.05 }).observe(picker);
  }
})();
