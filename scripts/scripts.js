const pagePaths = {
  index: {
    pt: '/pt',
    en: '/',
    es: '/es'
  },
  privacy: {
    pt: '/privacy',
    en: '/privacy/en',
    es: '/privacy/es'
  }
};

function getCurrentPath() {
  return window.location.pathname;
}

function getActiveLang(path) {
  if (path === '/es' || path.startsWith('/es/')) return 'es';
  if (path === '/pt' || path.startsWith('/pt/')) return 'pt';
  if (path === '/privacy/es' || path.startsWith('/privacy/es/')) return 'es';
  if (path === '/privacy/en' || path.startsWith('/privacy/en/')) return 'en';
  if (path === '/privacy' || path.startsWith('/privacy/')) return 'pt';
  return 'en';
}

function getPageType(path) {
  return path.startsWith('/privacy') ? 'privacy' : 'index';
}

function updateLanguageButtons(activeLang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === activeLang);
  });
}

function redirectToLang(pageType, lang) {
  const target = pagePaths[pageType][lang];
  if (target) {
    localStorage.setItem('siteLang', lang);
    window.location.href = target;
  }
}

function initLanguageSwitcher() {
  const path = getCurrentPath();
  const pageType = getPageType(path);
  const activeLang = getActiveLang(path);

  updateLanguageButtons(activeLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => redirectToLang(pageType, btn.dataset.lang));
  });
}

function updateYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

initLanguageSwitcher();
updateYear();
