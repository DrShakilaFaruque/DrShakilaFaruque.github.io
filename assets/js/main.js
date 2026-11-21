// Mobile menu
const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
}

// Highlight her name in publication lists
document.querySelectorAll('.pubs li').forEach(li => {
  li.innerHTML = li.innerHTML.replace(/Faruque, S\./g, '<b class="me">Faruque, S.</b>');
});

// Mark the nav link for the section in view
const links = [...document.querySelectorAll('.nav a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));
}

const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();
