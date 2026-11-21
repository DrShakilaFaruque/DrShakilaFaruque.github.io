// Mobile menu
(function () {
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

// Footer year
(function () {
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();

// Emphasise Dr. Faruque's name in author lists
document.querySelectorAll('.pub .authors, .pub .cite').forEach(el => {
  el.innerHTML = el.innerHTML.replace(/Faruque, S\./g, '<b class="me">Faruque, S.</b>');
});

// Publications page: search, type and year filters, newest first
(function () {
  const list = document.getElementById('pub-list');
  if (!list) return;
  const items = [...list.querySelectorAll('.pub')];
  const q = document.getElementById('q');
  const ftype = document.getElementById('ftype');
  const fyear = document.getElementById('fyear');
  const count = document.getElementById('count');
  const empty = document.getElementById('empty');

  items.sort((a, b) => (+b.dataset.year || 0) - (+a.dataset.year || 0)).forEach(el => list.appendChild(el));
  [...new Set(items.map(i => i.dataset.year).filter(Boolean))].sort((a, b) => b - a).forEach(y => {
    const o = document.createElement('option');
    o.value = y; o.textContent = y; fyear.appendChild(o);
  });
  const text = new Map(items.map(el => [el, el.textContent.toLowerCase()]));

  function apply() {
    const term = q.value.trim().toLowerCase();
    let n = 0;
    items.forEach(el => {
      const ok = (!term || text.get(el).includes(term)) &&
                 (!ftype.value || el.dataset.type === ftype.value) &&
                 (!fyear.value || el.dataset.year === fyear.value);
      el.hidden = !ok;
      if (ok) n++;
    });
    count.textContent = 'Showing ' + n + ' of ' + items.length + ' publications';
    empty.style.display = n ? 'none' : 'block';
  }
  [q, ftype, fyear].forEach(c => c.addEventListener('input', apply));
  apply();
})();

// Gentle reveal for content below the first screen
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = [...document.querySelectorAll('.sec .wrap > *, .sec .wrap .about-grid > *')]
    .filter(el => !el.closest('#pub-list') && el.getBoundingClientRect().top > innerHeight);
  els.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.03 });
  els.forEach(el => io.observe(el));
})();
