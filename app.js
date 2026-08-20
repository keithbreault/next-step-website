/* ============================================================
   Next Step Senior Consulting — behavior
   ============================================================ */
(function () {
  'use strict';

  /* ---- Year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Header shadow on scroll ---- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('menuToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Reveal on scroll (manual; transition-safe in offscreen frames) ---- */
  // Only opt into the hidden→visible animation when the page is actually
  // visible (offscreen iframes pause transitions, which would strand content).
  var canAnimate = document.visibilityState === 'visible' &&
    !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (canAnimate) document.documentElement.classList.add('anim');

  function revealCheck() {
    if (!document.documentElement.classList.contains('anim')) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var els = document.querySelectorAll('.reveal:not(.is-in)');
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) els[i].classList.add('is-in');
    }
  }
  window.__revealCheck = revealCheck;
  revealCheck();
  window.addEventListener('scroll', revealCheck, { passive: true });
  window.addEventListener('resize', revealCheck, { passive: true });
  window.addEventListener('load', revealCheck);

  /* ---- Contact form → Netlify Forms (with mailto fallback) ---- */
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  function showFormSuccess() {
    if (form) form.style.display = 'none';
    if (success) success.classList.add('show');
  }
  function mailtoFallback() {
    function val(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; }
    var name = val('name'), email = val('email'), phone = val('phone'), message = val('message');
    var subject = 'Website inquiry from ' + (name || 'a visitor');
    var body = ['Name: ' + name, 'Email: ' + email, 'Phone: ' + (phone || '—'), '', message].join('\n');
    window.location.href = 'mailto:info@next-step.place?bcc=keith@next-step.place&subject='
      + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    showFormSuccess();
  }
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var params = new URLSearchParams();
      new FormData(form).forEach(function (v, k) { params.append(k, typeof v === 'string' ? v : ''); });
      fetch(location.pathname || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      })
        .then(function (res) { if (res.ok) showFormSuccess(); else mailtoFallback(); })
        .catch(function () { mailtoFallback(); });
    });
  }

  /* ---- SMS consent checkbox gates the submit button ---- */
  var smsConsent = document.getElementById('smsConsent');
  var contactSubmit = document.getElementById('contactSubmit');
  if (smsConsent && contactSubmit) {
    contactSubmit.disabled = !smsConsent.checked;
    smsConsent.addEventListener('change', function () {
      contactSubmit.disabled = !smsConsent.checked;
    });
  }

  /* ============================================================
     REVIEWS
     The live Elfsight Google Reviews widget is connected, so we simply
     show it. (The sample placeholder cards have been removed.)
     ============================================================ */
  var elfWrap = document.getElementById('elfsightReviews');
  if (elfWrap) elfWrap.hidden = false;

  /* ---- Hide the Elfsight widget's built-in "What Our Customers Say" title ----
     It's redundant with our section heading. The widget renders in an OPEN
     shadow root, so we inject a style that hides just the title text (the
     live star-rating summary stays). Idempotent + retried to survive the
     widget's async load and any re-render. */
  (function hideElfsightTitle() {
    var reviewsRoot = document.getElementById('elfsightReviews');
    if (!reviewsRoot) return;
    var STYLE_ID = 'ns-elf-title-hide';
    function inject() {
      var host = null;
      reviewsRoot.querySelectorAll('*').forEach(function (el) { if (el.shadowRoot) host = el; });
      if (!host || !host.shadowRoot) return;
      if (!host.shadowRoot.getElementById(STYLE_ID)) {
        var st = document.createElement('style');
        st.id = STYLE_ID;
        st.textContent = '[class*="WidgetTitle__Header"]{display:none !important;}';
        host.shadowRoot.appendChild(st);
      }
    }
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      inject();
      if (tries > 80) clearInterval(timer); // ~56s safety net
    }, 700);
  })();
})();
