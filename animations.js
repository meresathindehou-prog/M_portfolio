/* animations.js — Intersection Observer for scroll animations */
function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.animate-fade-up').forEach(el => {
      el.classList.add('is-visible');
    });
    document.querySelectorAll('.skill-category').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // Fade up observer
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.animate-fade-up').forEach(el => {
    fadeObserver.observe(el);
  });

  // Skill bar observer (separate to trigger bar animations)
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.skill-category').forEach(el => {
    skillObserver.observe(el);
  });
}

initAnimations();
