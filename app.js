/**
 * ═══════════════════════════════════════════════════════════════
 *  MÉRÈS ATHINDEHOU — Portfolio v3
 *  app.js — Couche JavaScript Ultra Premium
 * ═══════════════════════════════════════════════════════════════
 *
 *  Modules :
 *  1. CONFIG & DÉTECTION DEVICE
 *  2. LOADER
 *  3. DARK / LIGHT THEME
 *  4. TRADUCTION FR / EN
 *  5. CURSEUR CUSTOM
 *  6. BACKGROUND CANVAS (orbes animées)
 *  7. SCROLL — progress + reveal + nav active
 *  8. TERMINAL ANIMÉ
 *  9. SKILL BARS
 * 10. NAVIGATION MOBILE (burger + focus trap)
 * 11. FORMULAIRE DE CONTACT
 * 12. MICRO-INTERACTIONS
 * 13. INIT
 *
 *  Règles :
 *  - Aucune dépendance externe
 *  - Fallback systématique si JS désactivé (CSS .reveal sans .in)
 *  - prefers-reduced-motion respecté partout
 *  - mobile-first : curseur + canvas désactivés sur mobile
 *  - requestAnimationFrame pour tout ce qui touche le DOM visuel
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

/* ════════════════════════════════════════════════════════
   1. CONFIG & DÉTECTION DEVICE
   ════════════════════════════════════════════════════════ */

const CFG = {
  /** Respect de prefers-reduced-motion */
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  /** Détection appareil faible (< 4 cœurs) */
  isLowEnd: (navigator.hardwareConcurrency || 4) < 4,

  /** Détection mobile (touch + petite largeur) */
  isMobile: ('ontouchstart' in window) || window.innerWidth < 768,

  /** Canvas actif si desktop + pas faible + pas reduced */
  canvasActive: false, // calculé dans init()
};

// Recalcul après définition
CFG.canvasActive = !CFG.isMobile && !CFG.isLowEnd && !CFG.reducedMotion;

/* ════════════════════════════════════════════════════════
   2. LOADER
   ════════════════════════════════════════════════════════ */

const Loader = (() => {
  const el       = document.getElementById('loader');
  const bar      = document.getElementById('loaderBar');
  const DURATION = CFG.reducedMotion ? 300 : 1400; // ms total

  // Éléments à révéler après le loader
  const hiddenEls = document.querySelectorAll('.loader-hidden');

  let startTime  = null;
  let rafId      = null;

  /** Anime la barre de progression */
  function animateBar(ts) {
    if (!startTime) startTime = ts;
    const elapsed  = ts - startTime;
    const progress = Math.min(elapsed / DURATION * 100, 100);

    if (bar) bar.style.width = progress + '%';

    if (progress < 100) {
      rafId = requestAnimationFrame(animateBar);
    } else {
      hide();
    }
  }

  /** Cache le loader et révèle le contenu */
  function hide() {
    if (!el) return;

    // Révèle le contenu masqué
    hiddenEls.forEach(el => {
      el.classList.remove('loader-hidden');
      el.classList.add('loader-visible');
    });

    // Fade-out du loader
    el.classList.add('out');

    // Supprime après la transition
    setTimeout(() => {
      el.setAttribute('aria-hidden', 'true');
      el.style.display = 'none';
    }, 600);
  }

  function start() {
    if (!el) return;

    // Si page déjà chargée, accélérer
    if (document.readyState === 'complete') {
      requestAnimationFrame(animateBar);
    } else {
      window.addEventListener('load', () => {
        requestAnimationFrame(animateBar);
      }, { once: true });

      // Sécurité : force la fin après 3s max
      setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        hide();
      }, 3000);
    }
  }

  return { start, hide };
})();

/* ════════════════════════════════════════════════════════
   3. DARK / LIGHT THEME
   ════════════════════════════════════════════════════════ */

const Theme = (() => {
  const html      = document.documentElement;
  const btn       = document.getElementById('themeBtn');
  const STORAGE_K = 'ma-theme';

  function set(theme) {
    html.classList.toggle('dark',  theme === 'dark');
    html.classList.toggle('light', theme === 'light');
    localStorage.setItem(STORAGE_K, theme);

    if (btn) {
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'
      );
    }
  }

  function toggle() {
    set(html.classList.contains('dark') ? 'light' : 'dark');
  }

  function init() {
    const saved   = localStorage.getItem(STORAGE_K);
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    set(saved || (sysDark ? 'dark' : 'light'));

    btn?.addEventListener('click', toggle);
  }

  return { init, set, toggle };
})();

/* ════════════════════════════════════════════════════════
   4. TRADUCTION FR / EN
   ════════════════════════════════════════════════════════ */

const I18n = (() => {
  const STORAGE_K = 'ma-lang';
  let current     = 'fr';
  const btn       = document.getElementById('langBtn');

  /** Textes du terminal en FR et EN */
  const TERMINAL_SCRIPTS = {
    fr: [
      { type: 'line', prompt: '$', cmd: 'whoami',       delay: 0   },
      { type: 'out',  text: 'Mérès Athindehou',         delay: 280 },
      { type: 'line', prompt: '$', cmd: 'cat role.txt', delay: 600 },
      { type: 'out',  text: 'Développeur Web Junior · L1 Sciences Informatiques', delay: 880 },
      { type: 'line', prompt: '$', cmd: 'ls stack/',    delay: 1200 },
      { type: 'out',  text: '<span class="t-dir">web/</span>  <span class="t-dir">system/</span>  <span class="t-dir">tools/</span>', delay: 1480, html: true },
      { type: 'line', prompt: '$', cmd: 'echo $STATUS', delay: 1800 },
      { type: 'out',  text: 'available_for_internship=true', delay: 2080, accent: true },
      { type: 'cursor', delay: 2400 },
    ],
    en: [
      { type: 'line', prompt: '$', cmd: 'whoami',       delay: 0   },
      { type: 'out',  text: 'Mérès Athindehou',         delay: 280 },
      { type: 'line', prompt: '$', cmd: 'cat role.txt', delay: 600 },
      { type: 'out',  text: 'Junior Web Developer · L1 Computer Science', delay: 880 },
      { type: 'line', prompt: '$', cmd: 'ls stack/',    delay: 1200 },
      { type: 'out',  text: '<span class="t-dir">web/</span>  <span class="t-dir">system/</span>  <span class="t-dir">tools/</span>', delay: 1480, html: true },
      { type: 'line', prompt: '$', cmd: 'echo $STATUS', delay: 1800 },
      { type: 'out',  text: 'available_for_internship=true', delay: 2080, accent: true },
      { type: 'cursor', delay: 2400 },
    ],
  };

  /** Traduit tous les éléments portant data-fr / data-en */
  function applyLang(lang) {
    const attr = `data-${lang}`;
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      const text = el.getAttribute(attr);
      if (text !== null) {
        // Ne touche pas les éléments avec des enfants complexes
        if (el.children.length === 0) {
          el.textContent = text;
        }
      }
    });

    // Mise à jour html[lang]
    document.documentElement.setAttribute('lang', lang);

    // Mise à jour bouton
    if (btn) {
      const label    = btn.querySelector('.lang-label');
      const opposite = lang === 'fr' ? 'EN' : 'FR';
      if (label) label.textContent = opposite;
      btn.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
      btn.classList.toggle('active-en', lang === 'en');
    }

    // Retaper le terminal dans la nouvelle langue
    Terminal.retype(TERMINAL_SCRIPTS[lang]);
  }

  function toggle() {
    current = current === 'fr' ? 'en' : 'fr';
    localStorage.setItem(STORAGE_K, current);
    applyLang(current);
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_K);
    current     = saved || 'fr';
    applyLang(current);
    btn?.addEventListener('click', toggle);
  }

  return { init, current: () => current, getTermScript: (l) => TERMINAL_SCRIPTS[l] };
})();

/* ════════════════════════════════════════════════════════
   5. CURSEUR CUSTOM
   ════════════════════════════════════════════════════════ */

const Cursor = (() => {
  const dot    = document.getElementById('cursorDot');
  const ring   = document.getElementById('cursorRing');

  let mx = -100, my = -100; // position souris
  let rx = -100, ry = -100; // position ring (lerp)
  let rafId = null;

  const LERP = 0.12; // vitesse de suivi du ring

  /** Déplace le curseur avec requestAnimationFrame */
  function loop() {
    // Interpolation linéaire (smooth follow)
    rx += (mx - rx) * LERP;
    ry += (my - ry) * LERP;

    dot?.style.setProperty('transform',  `translate(${mx}px, ${my}px)`);
    ring?.style.setProperty('transform', `translate(${rx}px, ${ry}px)`);

    rafId = requestAnimationFrame(loop);
  }

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
  }

  /** Gestion hover sur éléments interactifs */
  function addHoverEffects() {
    const targets = 'a, button, .pcard, .pill, .clink, input, textarea, .btn-link, label';
    document.querySelectorAll(targets).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  function init() {
    // Désactivé sur mobile et reduced-motion
    if (CFG.isMobile || CFG.reducedMotion) return;

    document.addEventListener('mousemove', onMove, { passive: true });
    document.body.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-active');
      if (!rafId) rafId = requestAnimationFrame(loop);
    });
    document.body.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
    });

    addHoverEffects();
    rafId = requestAnimationFrame(loop);
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════
   6. BACKGROUND CANVAS — Orbes animées
   ════════════════════════════════════════════════════════ */

const Background = (() => {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return { init: () => {} };

  const ctx = canvas.getContext('2d');
  let w, h, orbs, rafId;

  /** Crée les orbes */
  function createOrbs() {
    const count = CFG.isLowEnd ? 3 : 5;
    return Array.from({ length: count }, (_, i) => ({
      x:    Math.random() * w,
      y:    Math.random() * h,
      r:    200 + Math.random() * 300,
      vx:   (Math.random() - .5) * .25,
      vy:   (Math.random() - .5) * .25,
      hue:  i === 0 ? 68 : (i === 1 ? 220 : 180 + Math.random() * 60),
      sat:  60 + Math.random() * 40,
      alpha: .06 + Math.random() * .05,
    }));
  }

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
    if (!orbs) orbs = createOrbs();
  }

  /** Boucle d'animation */
  function draw() {
    ctx.clearRect(0, 0, w, h);

    orbs.forEach(o => {
      // Déplacement
      o.x += o.vx;
      o.y += o.vy;

      // Rebond sur les bords (soft)
      if (o.x < -o.r)    o.x = w + o.r;
      if (o.x > w + o.r) o.x = -o.r;
      if (o.y < -o.r)    o.y = h + o.r;
      if (o.y > h + o.r) o.y = -o.r;

      // Dessin gradient radial
      const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      grad.addColorStop(0, `hsla(${o.hue}, ${o.sat}%, 60%, ${o.alpha})`);
      grad.addColorStop(1, 'hsla(0, 0%, 0%, 0)');

      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    rafId = requestAnimationFrame(draw);
  }

  function init() {
    if (!CFG.canvasActive) {
      // Pas de canvas sur mobile/low-end : fond statique CSS suffit
      if (canvas) canvas.style.display = 'none';
      return;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    rafId = requestAnimationFrame(draw);
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════
   7. SCROLL — Progress bar + reveal + nav active
   ════════════════════════════════════════════════════════ */

const Scroll = (() => {
  const progressBar = document.getElementById('scrollBar');
  const header      = document.getElementById('header');
  const sections    = document.querySelectorAll('section[id]');
  const navLinks    = document.querySelectorAll('.nav-link');

  let rafPending = false;

  /** Barre de progression */
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }

  /** Header visuel au scroll */
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  /** Lien actif dans la nav */
  function updateActiveNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      const active = a.getAttribute('href') === '#' + current;
      active
        ? a.setAttribute('aria-current', 'page')
        : a.removeAttribute('aria-current');
    });
  }

  /** Throttle via rAF */
  function onScroll() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      updateProgress();
      updateHeader();
      updateActiveNav();
      rafPending = false;
    });
  }

  /** IntersectionObserver pour les reveals */
  function initReveal() {
    if (CFG.reducedMotion) {
      // Révèle tout immédiatement si reduced-motion
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target); // déclenché une seule fois
        }
      });
    }, {
      threshold:  0.07,
      rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    initReveal();
    onScroll(); // état initial
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════
   8. TERMINAL ANIMÉ
   ════════════════════════════════════════════════════════ */

const Terminal = (() => {
  const body    = document.getElementById('termBody');
  let timers    = [];
  let hasRun    = false;

  /** Vide et reconstruit le terminal */
  function build(script) {
    if (!body) return;

    // Clear timers précédents
    timers.forEach(clearTimeout);
    timers = [];
    body.innerHTML = '';

    if (CFG.reducedMotion) {
      // Affichage instantané
      script.forEach(item => renderItem(item, true));
      return;
    }

    script.forEach(item => {
      const t = setTimeout(() => renderItem(item, false), item.delay);
      timers.push(t);
    });
  }

  /** Crée et insère une ligne du terminal */
  function renderItem(item, instant) {
    if (!body) return;

    let el;

    if (item.type === 'line') {
      el = document.createElement('div');
      el.className = 't-line' + (instant ? ' show' : '');
      el.innerHTML = `<span class="t-prompt" aria-hidden="true">${item.prompt}</span><span class="t-cmd">${item.cmd}</span>`;

    } else if (item.type === 'out') {
      el = document.createElement('div');
      el.className = 't-out' + (instant ? ' show' : '') + (item.accent ? ' acc' : '');
      if (item.html) {
        el.innerHTML = item.text;
      } else {
        el.textContent = item.text;
      }

    } else if (item.type === 'cursor') {
      el = document.createElement('div');
      el.className = 't-cursor' + (instant ? ' show' : '');
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = `<span class="t-prompt">$</span><span class="t-blink">|</span>`;
    }

    if (el) {
      body.appendChild(el);

      if (!instant) {
        // Petit délai pour le reflow, puis afficher
        requestAnimationFrame(() => {
          requestAnimationFrame(() => el.classList.add('show'));
        });
      }
    }
  }

  /** Observer : déclenche l'animation quand le terminal entre en vue */
  function initObserver(script) {
    const terminal = document.querySelector('.terminal');
    if (!terminal) return;

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !hasRun) {
        hasRun = true;
        build(script);
        obs.disconnect();
      }
    }, { threshold: 0.3 });

    obs.observe(terminal);
  }

  /** Appelé par I18n lors du changement de langue */
  function retype(script) {
    hasRun = false;
    build(script);
  }

  function init() {
    const script = I18n.getTermScript(I18n.current());
    initObserver(script);
  }

  return { init, retype };
})();

/* ════════════════════════════════════════════════════════
   9. SKILL BARS
   ════════════════════════════════════════════════════════ */

const SkillBars = (() => {
  function init() {
    const fills = document.querySelectorAll('.bi-fill');
    const langFills = document.querySelectorAll('.lang-fill');

    /** Anime les barres quand elles entrent en vue */
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;

        // Barres skills
        if (e.target.classList.contains('skill-bars')) {
          e.target.querySelectorAll('.bar-item').forEach((item, i) => {
            const fill = item.querySelector('.bi-fill');
            const pct  = item.dataset.pct || '0';
            if (!fill) return;

            const delay = CFG.reducedMotion ? 0 : i * 120;
            setTimeout(() => {
              fill.style.width = pct + '%';
            }, delay);
          });
          obs.unobserve(e.target);
        }

        // Barres langues
        if (e.target.classList.contains('langs-block')) {
          e.target.querySelectorAll('.lang-fill').forEach((fill, i) => {
            const lw = fill.style.getPropertyValue('--lw') || '0%';
            fill.style.width = '0%';
            const delay = CFG.reducedMotion ? 0 : i * 100 + 200;
            setTimeout(() => {
              fill.style.width = lw;
              fill.style.transition = `width .9s ${i * .1 + .2}s cubic-bezier(0,0,.2,1)`;
            }, delay);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });

    document.querySelector('.skill-bars')?.let?.(el => obs.observe(el)) ||
      document.querySelector('.skill-bars') && obs.observe(document.querySelector('.skill-bars'));

    document.querySelector('.langs-block')?.let?.(el => obs.observe(el)) ||
      document.querySelector('.langs-block') && obs.observe(document.querySelector('.langs-block'));
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════
  10. NAVIGATION MOBILE
   ════════════════════════════════════════════════════════ */

const MobileNav = (() => {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');
  const links  = document.querySelectorAll('.m-link');
  let open     = false;

  function openMenu() {
    open = true;
    menu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');

    // Focus trap
    const focusable = [...menu.querySelectorAll('a, button')];
    focusable[0]?.focus();
    menu.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', handleEscape);
    // Click extérieur
    setTimeout(() => document.addEventListener('click', handleOutside), 10);
  }

  function closeMenu() {
    if (!open) return;
    open = false;
    menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    menu.removeEventListener('keydown', trapFocus);
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleOutside);
    burger.focus();
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = [...menu.querySelectorAll('a')];
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }

  function handleEscape(e) {
    if (e.key === 'Escape') closeMenu();
  }

  function handleOutside(e) {
    if (!menu.contains(e.target) && e.target !== burger) closeMenu();
  }

  function init() {
    burger?.addEventListener('click', () => open ? closeMenu() : openMenu());
    links.forEach(l => l.addEventListener('click', closeMenu));

    // Smooth scroll + fermeture sur tous les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({
          behavior: CFG.reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    });
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════
  11. FORMULAIRE DE CONTACT
   ════════════════════════════════════════════════════════ */

const ContactForm = (() => {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formOk    = document.getElementById('formOk');

  /** Règles de validation */
  const RULES = {
    fn: {
      validate: v => v.trim().length >= 2,
      msgFr: 'Veuillez entrer votre nom.',
      msgEn: 'Please enter your name.',
    },
    fe: {
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msgFr: 'Email invalide.',
      msgEn: 'Invalid email address.',
    },
    fm: {
      validate: v => v.trim().length >= 10,
      msgFr: 'Message trop court (10 caractères minimum).',
      msgEn: 'Message too short (10 characters minimum).',
    },
  };

  function getMsg(rule) {
    return document.documentElement.lang === 'en' ? rule.msgEn : rule.msgFr;
  }

  function validateField(id) {
    const input = document.getElementById(id);
    const errEl = document.getElementById(`${id}-err`);
    const rule  = RULES[id];
    if (!input || !rule) return true;

    const valid = rule.validate(input.value);
    input.classList.toggle('err', !valid);
    input.setAttribute('aria-invalid', valid ? 'false' : 'true');
    if (errEl) errEl.textContent = valid ? '' : getMsg(rule);
    return valid;
  }

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.classList.toggle('loading', loading);
    submitBtn.disabled = loading;
  }

  function showSuccess() {
    if (!formOk) return;
    formOk.removeAttribute('hidden');
    formOk.focus();
    setTimeout(() => formOk.setAttribute('hidden', ''), 7000);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation de tous les champs requis
    const ok = ['fn', 'fe', 'fm'].map(validateField).every(Boolean);
    if (!ok) {
      form?.querySelector('.err')?.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) throw new Error('Server error');

      form.reset();
      showSuccess();

    } catch {
      // Fallback : ouvre le client mail
      const name    = document.getElementById('fn')?.value  || '';
      const email   = document.getElementById('fe')?.value  || '';
      const subject = document.getElementById('fs')?.value  || 'Contact depuis portfolio';
      const message = document.getElementById('fm')?.value  || '';

      const mailto = `mailto:meresathindehou@gmail.com`
        + `?subject=${encodeURIComponent(subject)}`
        + `&body=${encodeURIComponent(`De : ${name} <${email}>\n\n${message}`)}`;

      window.location.href = mailto;
    } finally {
      setLoading(false);
    }
  }

  function init() {
    if (!form) return;

    // Validation live au blur
    Object.keys(RULES).forEach(id => {
      document.getElementById(id)?.addEventListener('blur', () => validateField(id));
    });

    form.addEventListener('submit', handleSubmit);
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════
  12. MICRO-INTERACTIONS
   ════════════════════════════════════════════════════════ */

const Interactions = (() => {

  /** Tilt 3D léger sur les cartes projet (desktop uniquement) */
  function initCardTilt() {
    if (CFG.isMobile || CFG.reducedMotion) return;

    document.querySelectorAll('.pcard:not(.pcard-wip)').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        const maxTilt = 4; // degrés max

        card.style.transform = `translateY(-6px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg)`;
        card.style.transition = 'transform .1s linear';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform .4s cubic-bezier(0,0,.2,1)';
      });
    });
  }

  /** Ripple sur les boutons primaires */
  function initRipple() {
    document.querySelectorAll('.btn-primary, .btn-link-primary').forEach(btn => {
      btn.addEventListener('click', e => {
        if (CFG.reducedMotion) return;

        const rect   = btn.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const ripple = document.createElement('span');

        ripple.style.cssText = `
          position:absolute; border-radius:50%;
          width:120px; height:120px;
          left:${x - 60}px; top:${y - 60}px;
          background:rgba(255,255,255,.25);
          transform:scale(0); pointer-events:none;
          animation:ripple .5s ease-out forwards;
        `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Inject ripple keyframe une seule fois
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = '@keyframes ripple{to{transform:scale(2.5);opacity:0}}';
      document.head.appendChild(style);
    }
  }

  /** Compteur animé sur les stats du hero */
  function initCounters() {
    if (CFG.reducedMotion) return;

    const stats = document.querySelectorAll('.sn');
    const obs   = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el      = e.target;
        const text    = el.textContent.trim();
        const numMatch = text.match(/(\d+)/);
        if (!numMatch) { obs.unobserve(el); return; }

        const target  = parseInt(numMatch[1]);
        const suffix  = text.replace(/\d+/, '');
        let   current = 0;
        const step    = Math.max(1, Math.floor(target / 30));
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(interval);
        }, 40);

        obs.unobserve(el);
      });
    }, { threshold: .5 });

    stats.forEach(s => obs.observe(s));
  }

  /** Focus visible amélioré sur les inputs */
  function initInputFocus() {
    document.querySelectorAll('.fg input, .fg textarea').forEach(input => {
      const label = input.closest('.fg')?.querySelector('label');

      input.addEventListener('focus', () => {
        label?.classList.add('label-active');
        input.parentElement?.classList.add('fg-focused');
      });
      input.addEventListener('blur', () => {
        label?.classList.remove('label-active');
        input.parentElement?.classList.remove('fg-focused');
      });
    });
  }

  /** Effet parallax léger sur la photo hero (desktop) */
  function initParallax() {
    if (CFG.isMobile || CFG.reducedMotion || CFG.isLowEnd) return;

    const photoFrame = document.querySelector('.photo-frame');
    if (!photoFrame) return;

    let rafPending = false;
    window.addEventListener('mousemove', e => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        const cx  = window.innerWidth  / 2;
        const cy  = window.innerHeight / 2;
        const dx  = (e.clientX - cx) / cx;
        const dy  = (e.clientY - cy) / cy;
        photoFrame.style.transform = `translateY(-4px) translate(${dx * 8}px, ${dy * 5}px)`;
        rafPending = false;
      });
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      photoFrame.style.transform = '';
    });
  }

  function init() {
    initCardTilt();
    initRipple();
    initCounters();
    initInputFocus();
    initParallax();
  }

  return { init };
})();

/* ════════════════════════════════════════════════════════
  13. UTILITAIRES
   ════════════════════════════════════════════════════════ */

/** Année dans le footer */
function setFooterYear() {
  const el = document.getElementById('fyear');
  if (el) el.textContent = new Date().getFullYear();
}

/** Fallback photo profil */
function initPhotoFallback() {
  const img = document.querySelector('.photo-frame img');
  const fb  = document.querySelector('.photo-fb');
  if (!img || !fb) return;

  function showFallback() {
    img.style.display = 'none';
    fb.style.display  = 'flex';
  }

  img.addEventListener('error', showFallback);
  if (img.complete && !img.naturalHeight) showFallback();
}

/* ════════════════════════════════════════════════════════
  14. INIT — Orchestration
   ════════════════════════════════════════════════════════ */

(function init() {

  // 1. Loader en premier (avant tout)
  Loader.start();

  // 2. Theme (sans attendre le DOM complet)
  Theme.init();

  // Tout le reste après DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  function bootstrap() {

    // Traduction
    I18n.init();

    // Curseur (desktop uniquement)
    Cursor.init();

    // Canvas background
    Background.init();

    // Scroll
    Scroll.init();

    // Terminal (dépend de I18n)
    Terminal.init();

    // Skill bars
    SkillBars.init();

    // Navigation mobile
    MobileNav.init();

    // Formulaire
    ContactForm.init();

    // Micro-interactions
    Interactions.init();

    // Utilitaires
    setFooterYear();
    initPhotoFallback();
  }

})();