/* theme.js — Dark/Light mode toggle */
const STORAGE_KEY = 'ma-portfolio-theme';
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute('aria-label',
      theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'
    );
  }
}

function getPreferred() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function init() {
  applyTheme(getPreferred());

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

init();
