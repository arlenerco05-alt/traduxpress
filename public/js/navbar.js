(function () {
  var staticHeader = document.querySelector('[data-site-header-static]');
  var header = staticHeader || document.querySelector('[data-site-header]');
  var fixedHeader = document.querySelector('[data-site-header-fixed]');
  var toggles = document.querySelectorAll('[data-navbar-toggle]');
  if (!header) return;

  // ─── Header height → CSS variable ────────────────────────────────
  var ro = new ResizeObserver(function () {
    var h = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--site-header-height', h + 'px');
  });
  ro.observe(header);

  // ─── Scroll: reveal the fixed bar only while scrolling up ─────────
  // The static navbar overlays the hero; the fixed copy appears after
  // the hero when the visitor scrolls up, and hides while scrolling down.
  // The threshold avoids toggling visibility on tiny scroll movements.
  var lastScrollY = window.pageYOffset;
  var isHeaderVisible = lastScrollY > 300;
  var rafId = 0;
  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      var currentScrollY = window.pageYOffset;
      var scrollDelta = currentScrollY - lastScrollY;
      var isScrolled = currentScrollY > 300;

      if (!isScrolled) {
        isHeaderVisible = false;
      } else if (scrollDelta < -4) {
        isHeaderVisible = true;
      } else if (scrollDelta > 4) {
        isHeaderVisible = false;
      }

      header.classList.toggle('is-scrolled', isScrolled);
      if (fixedHeader) {
        fixedHeader.classList.toggle('is-visible', isHeaderVisible);
        fixedHeader.setAttribute('aria-hidden', isHeaderVisible ? 'false' : 'true');
      }
      lastScrollY = currentScrollY;
      rafId = 0;
    });
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Mobile drawer ───────────────────────────────────────────────
  var drawer = document.getElementById('site-nav-drawer');
  var closers = document.querySelectorAll('[data-navbar-close]');
  var previouslyFocused = null;

  function getFocusableElements(container) {
    if (!container) return [];
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function lockBody() {
    document.body.style.overflow = 'hidden';
  }

  function unlockBody() {
    document.body.style.overflow = '';
  }

  function setToggleState(isOpen) {
    toggles.forEach(function (toggle) {
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // is-open on hamburger: morph lines into X (navigation.css)
      toggle.classList.toggle('is-open', isOpen);
    });
  }

  function openDrawer() {
    if (!drawer) return;
    previouslyFocused = document.activeElement;
    lockBody();
    drawer.classList.add('is-open');
    setToggleState(true);
    requestAnimationFrame(function () {
      var focusable = getFocusableElements(drawer);
      if (focusable.length > 0) focusable[0].focus();
    });
  }

  function closeDrawer() {
    if (!drawer) return;
    setToggleState(false);
    unlockBody();
    drawer.classList.remove('is-open');
    if (previouslyFocused) previouslyFocused.focus();
  }

  function toggleDrawer() {
    if (!drawer) return;
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', toggleDrawer);
  });
  closers.forEach(function (el) {
    el.addEventListener('click', closeDrawer);
  });

  // ─── Submenu accordion ────────────────────────────────────────────
  // Delegation on document: navbar.js is re-executed after ClientRouter swap,
  // so a single handler binds to the current DOM without rebinding.
  // Click on a link still closes the drawer (data-navbar-close), click on chevron
  // only expands/collapses the submenu (no data-navbar-close on that button).
  document.addEventListener('click', function (e) {
    var toggle = e.target && e.target.closest ? e.target.closest('[data-navbar-sub-toggle]') : null;
    if (!toggle) return;
    var item = toggle.closest('.ui-nav-drawer__item');
    if (!item) return;
    var isOpen = item.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // ─── Pozycjonowanie chevrona przy etykiecie ────────────────────────
  // Why: chevron should sit right behind the text ("Uslug i ^"), not at
  // row edge. Label width is known only after render, so we measure
  // span.ui-nav-drawer__label and set offset from the center.
  function placeSubCarets() {
    document.querySelectorAll('.ui-nav-drawer__link-row').forEach(function (row) {
      var label = row.querySelector('.ui-nav-drawer__label');
      var expand = row.querySelector('.ui-nav-drawer__expand');
      if (!label || !expand) return;
      var offset = label.getBoundingClientRect().width / 2 + 10; // za tekstem + oddech
      expand.style.right = 'auto';
      expand.style.left = 'calc(50% + ' + offset + 'px)';
    });
  }

  // Positions depend only on viewport width; recalculate after load.
  placeSubCarets();
  window.addEventListener('resize', placeSubCarets);

  // ─── Keyboard: Escape + focus trap ───────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (!drawer || !drawer.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      var focusable = getFocusableElements(drawer);
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (!drawer.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
