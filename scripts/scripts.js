const pagePaths = {
  index: {
    pt: '../pt',
    en: '../',
    es: '../es'
  },
  privacy: {
    pt: '../privacy',
    en: '../privacy/en.html',
    es: '../privacy/es'
  }
};

function getCurrentPath() {
  return window.location.pathname;
}

function getActiveLang(path) {
  if (path.includes('/es')) return 'es';
  if (path.includes('en.html')) return 'en';
  if (path.includes('/pt')) return 'pt';
  if (path.includes('/privacy') && !path.includes('en.html') && !path.includes('/es')) return 'pt';
  if (path === '/' || path === '') return 'en';
  return 'en';
}

function getPageType(path) {
  return path.includes('/privacy') ? 'privacy' : 'index';
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
  const storedLang = localStorage.getItem('siteLang');
  const browserLang = navigator.language.toLowerCase();
  const preferredLang = storedLang || (browserLang.startsWith('pt') ? 'pt' : browserLang.startsWith('es') ? 'es' : 'en');

  updateLanguageButtons(activeLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => redirectToLang(pageType, btn.dataset.lang));
  });

  if (!storedLang && activeLang !== preferredLang) {
    redirectToLang(pageType, preferredLang);
  }
}

function updateYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

initLanguageSwitcher();
updateYear();
