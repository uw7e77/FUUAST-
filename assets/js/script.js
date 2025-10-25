// Minimal site-wide JS to avoid preview errors and enhance UX
(function(){
  document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('.header');
    var backToTop = document.getElementById('backToTop');
    var menuToggle = document.getElementById('menu-toggle');

    // Add scrolled shadow to header
    function onScroll(){
      var scrolled = window.scrollY > 10;
      if (header) header.classList.toggle('scrolled', scrolled);
      if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Back to top smooth scroll
    if (backToTop) {
      backToTop.addEventListener('click', function(e){
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Close mobile menu when clicking outside nav on small screens
    document.addEventListener('click', function(e){
      var navWrapper = document.querySelector('.nav-wrapper');
      if (!navWrapper || !menuToggle) return;
      var clickedInside = navWrapper.contains(e.target);
      if (!clickedInside && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });

    // Optional: respect prefers-reduced-motion
    try {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-base', '0ms');
        document.documentElement.style.setProperty('--transition-fast', '0ms');
      }
    } catch(_){}
  });
})();

// Add click/keyboard toggles for nested dropdown submenus
document.addEventListener('DOMContentLoaded', function(){
  var submenuParents = document.querySelectorAll('.dropdown-menu .has-submenu');
  submenuParents.forEach(function(parent){
    var trigger = parent.querySelector(':scope > a');
    var submenu = parent.querySelector(':scope > .dropdown-submenu');
    if (!trigger || !submenu) return;

    // ARIA hints
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    function setOpen(open){
      parent.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    trigger.addEventListener('click', function(e){
      // Allow normal navigation if link is a real URL
      var href = trigger.getAttribute('href') || '';
      var navigates = href && href !== '#' && !href.startsWith('javascript:');
      if (!navigates) e.preventDefault();

      // Close sibling submenus
      var siblings = parent.parentElement ? parent.parentElement.querySelectorAll('.has-submenu.open') : [];
      siblings.forEach(function(s){ if (s !== parent) s.classList.remove('open'); });

      setOpen(!parent.classList.contains('open'));
      e.stopPropagation();
    });

    // Keyboard accessibility
    trigger.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(!parent.classList.contains('open'));
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    });
  });

  // Click outside to close any open submenu
  document.addEventListener('click', function(e){
    var openSubs = document.querySelectorAll('.dropdown-menu .has-submenu.open');
    if (!openSubs.length) return;
    var insideDropdown = e.target.closest('.dropdown');
    if (!insideDropdown) {
      openSubs.forEach(function(el){ el.classList.remove('open'); });
    }
  });
});

// Hero slider logic
(function() {
  const hero = document.querySelector('.hero');
  const slides = Array.from(document.querySelectorAll('.hero .slide'));
  if (!hero || !slides.length) return;

  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  const dotsContainer = document.querySelector('.slider-dots');
  let current = slides.findIndex(s => s.classList.contains('active'));
  if (current < 0) current = 0;
  let timer = null;
  const intervalMs = 5000;

  function show(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    updateDots();
  }

  function next() {
    current = (current + 1) % slides.length;
    show(current);
  }

  function prev() {
    current = (current - 1 + slides.length) % slides.length;
    show(current);
  }

  function goTo(index) {
    current = index % slides.length;
    show(current);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, intervalMs);
  }

  function stopAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      if (i === current) btn.classList.add('active');
      btn.addEventListener('click', () => {
        goTo(i);
        startAutoplay();
      });
      dotsContainer.appendChild(btn);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // Arrow controls
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

  // Pause on hover
  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', startAutoplay);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); startAutoplay(); }
    else if (e.key === 'ArrowRight') { next(); startAutoplay(); }
  });

  // Init
  show(current);
  buildDots();
  startAutoplay();
})();

// Quotes rotator for 'Why FUUAST?'
(function() {
  const items = Array.from(document.querySelectorAll('.quotes-rotator .quote-item'));
  if (!items.length) return;
  let current = items.findIndex(el => el.classList.contains('active'));
  if (current < 0) current = 0;
  const intervalMs = 6000;

  function show(index) {
    items.forEach((el, i) => el.classList.toggle('active', i === index));
  }

  setInterval(() => {
    current = (current + 1) % items.length;
    show(current);
  }, intervalMs);
})();