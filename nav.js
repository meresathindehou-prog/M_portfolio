/* nav.js — Mobile menu + active link + scroll state */
function initNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const header = document.querySelector('.nav-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) {
        menu.hidden = true;
        document.body.style.overflow = '';
      } else {
        menu.hidden = false;
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on nav link click
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) {
        menu.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        btn.focus();
      }
    });
  }

  // Scroll state for header shadow
  const scrollHandler = () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
    updateActiveLink();
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });

  // Active link based on scroll position
  function updateActiveLink() {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  scrollHandler();
}

initNav();
