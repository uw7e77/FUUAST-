// Optimized site-wide JavaScript
(function(){
  document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('.header');
    var backToTop = document.getElementById('backToTop');
    var menuToggle = document.getElementById('menu-toggle');
    var searchOverlay = document.getElementById('searchOverlay');
    var closeSearch = document.getElementById('closeSearch');
    var searchBtn = document.querySelector('.search-btn');

    // Scroll handling with throttling
    var ticking = false;
    function onScroll(){
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrolled = window.scrollY > 10;
          if (header) header.classList.toggle('scrolled', scrolled);
          if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
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

    // Search overlay functionality
    if (searchBtn && searchOverlay) {
      searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeSearch && searchOverlay) {
      closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close search on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e){
      var navWrapper = document.querySelector('.nav-wrapper');
      if (!navWrapper || !menuToggle) return;
      var clickedInside = navWrapper.contains(e.target);
      if (!clickedInside && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });

    // Respect prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--transition-base', '0ms');
      document.documentElement.style.setProperty('--transition-fast', '0ms');
    }

    // --- Hero Slider ---
    var slider = document.querySelector('.hero-slider');
    if (slider) {
      var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
      var prev = slider.querySelector('.slider-arrow.prev');
      var next = slider.querySelector('.slider-arrow.next');
      var dotsContainer = slider.querySelector('.slider-dots');
      var current = slides.findIndex(function(s){ return s.classList.contains('active'); });
      if (current < 0) current = 0;

      // Build navigation dots
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach(function(_, i){
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          btn.addEventListener('click', function(){ goTo(i); resetTimer(); });
          dotsContainer.appendChild(btn);
        });
      }

      function updateDots(){
        if (!dotsContainer) return;
        var buttons = dotsContainer.querySelectorAll('button');
        buttons.forEach(function(b, i){ b.classList.toggle('active', i === current); });
      }

      function goTo(index){
        slides[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        updateDots();
      }

      function goNext(){ goTo(current + 1); }
      function goPrev(){ goTo(current - 1); }

      if (next) next.addEventListener('click', function(){ goNext(); resetTimer(); });
      if (prev) prev.addEventListener('click', function(){ goPrev(); resetTimer(); });

      // Auto-play with reduced motion support
      var prefersReducedMotion = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      var timer = null;
      function startTimer(){ 
        if (!prefersReducedMotion) { 
          stopTimer(); 
          timer = setInterval(goNext, 6000); 
        } 
      }
      function stopTimer(){ if (timer) { clearInterval(timer); timer = null; } }
      function resetTimer(){ stopTimer(); startTimer(); }

      slider.addEventListener('mouseenter', stopTimer);
      slider.addEventListener('mouseleave', startTimer);

      // Keyboard navigation
      slider.addEventListener('keydown', function(e){
        if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); resetTimer(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); resetTimer(); }
      });
      slider.setAttribute('tabindex', '0');

      updateDots();
      startTimer();
    }

    // --- Dropdown Submenus ---
    var submenuParents = document.querySelectorAll('.dropdown-menu .has-submenu');
    submenuParents.forEach(function(parent){
      var trigger = parent.querySelector(':scope > a');
      var submenu = parent.querySelector(':scope > .dropdown-submenu');
      if (!trigger || !submenu) return;

      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');

      function setOpen(open){
        parent.classList.toggle('open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      }

      trigger.addEventListener('click', function(e){
        var href = trigger.getAttribute('href') || '';
        var navigates = href && href !== '#' && !href.startsWith('javascript:');
        if (!navigates) e.preventDefault();

        // Close sibling submenus
        var siblings = parent.parentElement ? parent.parentElement.querySelectorAll('.has-submenu.open') : [];
        siblings.forEach(function(s){ if (s !== parent) s.classList.remove('open'); });

        setOpen(!parent.classList.contains('open'));
        e.stopPropagation();
      });

      trigger.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(!parent.classList.contains('open'));
        } else if (e.key === 'Escape') {
          setOpen(false);
        }
      });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', function(e){
      var openSubs = document.querySelectorAll('.dropdown-menu .has-submenu.open');
      if (!openSubs.length) return;
      var insideDropdown = e.target.closest('.dropdown');
      if (!insideDropdown) {
        openSubs.forEach(function(el){ el.classList.remove('open'); });
      }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
})();
