(function() {
  'use strict';

  // --- Translation Engine ---
  function applyTranslations(lang) {
    var translations = window.SITE_TRANSLATIONS && window.SITE_TRANSLATIONS[lang];
    if (!translations) return;

    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      if (!key) continue;

      var keys = key.split('.');
      var val = translations;
      for (var k = 0; k < keys.length; k++) {
        if (val && Object.prototype.hasOwnProperty.call(val, keys[k])) {
          val = val[keys[k]];
        } else {
          val = null;
          break;
        }
      }

      if (typeof val === 'string') {
        var text = val;
        var attrs = el.attributes;
        for (var a = 0; a < attrs.length; a++) {
          var attr = attrs[a];
          if (attr.name.indexOf('data-i18n-param-') === 0) {
            var paramName = attr.name.substring('data-i18n-param-'.length);
            text = text.replace(new RegExp('\\{' + paramName + '\\}', 'g'), attr.value);
          }
        }
        el.textContent = text;
      }
    }
  }

  // --- Theme Toggle ---
  function initThemeToggle() {
    var toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    function updateThemeState() {
      var currentTheme = document.documentElement.getAttribute('data-theme');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = currentTheme === 'dark' || (!currentTheme && systemDark);
      toggleBtn.setAttribute('aria-checked', isDark ? 'true' : 'false');
    }

    function toggleTheme() {
      var currentTheme = document.documentElement.getAttribute('data-theme');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = currentTheme === 'dark' || (!currentTheme && systemDark);
      var newTheme = isDark ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeState();
    }

    toggleBtn.addEventListener('click', toggleTheme);
    toggleBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });

    window.addEventListener('keydown', function(e) {
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        return;
      }
      if ((e.key === 'd' || e.key === 'D') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        toggleTheme();
      }
    });

    updateThemeState();
  }

  // --- Language Toggle & i18n ---

  function updateLastVisible(lang) {
    var items = document.querySelectorAll('.post-item');
    var last = null;
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('is-last-visible');
      if (items[i].getAttribute('data-lang') === lang) last = items[i];
    }
    if (last) last.classList.add('is-last-visible');
  }

  function initLangToggle() {
    var langBtn = document.getElementById('lang-toggle');
    var currentLang = document.documentElement.getAttribute('data-lang') || 'en';
    applyTranslations(currentLang);
    updateLastVisible(currentLang);

    if (!langBtn) return;

    function updateLangState() {
      var currentLang = document.documentElement.getAttribute('data-lang') || 'en';
      langBtn.setAttribute('aria-checked', currentLang === 'es' ? 'true' : 'false');
    }

    function toggleLang() {
      var currentLang = document.documentElement.getAttribute('data-lang') || 'en';
      var newLang = currentLang === 'es' ? 'en' : 'es';

      document.documentElement.setAttribute('data-lang', newLang);
      localStorage.setItem('lang', newLang);
      applyTranslations(newLang);
      updateLastVisible(newLang);
      updateLangState();

      // If on a topic page, go to /topics/ to avoid showing a wrong-language topic
      var isTopicPage = document.querySelector('meta[name="page-type"][content="topic"]');
      if (isTopicPage) {
        window.location.href = '/topics/';
        return;
      }

      // If on a post page, switch to the translated note or 404 if not available
      var targetMeta = document.querySelector('meta[name="translation-' + newLang + '"]');
      if (targetMeta) {
        var targetUrl = targetMeta.getAttribute('content');
        if (targetUrl && targetUrl.trim() !== '') {
          window.location.href = targetUrl;
        } else {
          window.location.href = "/404.html";
        }
      }
    }

    langBtn.addEventListener('click', toggleLang);
    langBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLang();
      }
    });

    window.addEventListener('keydown', function(e) {
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        return;
      }
      if ((e.key === 'l' || e.key === 'L') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        toggleLang();
      }
    });

    updateLangState();
  }

  // --- Random Post Navigation ---
  function initRandomPost() {
    var randomBtn = document.querySelector('nav a[data-nav="random"]');
    var posts = window.SITE_POSTS || [];
    if (!randomBtn || posts.length === 0) return;

    randomBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var currentLang = document.documentElement.getAttribute('data-lang') || 'en';
      var currentPath = window.location.pathname;

      var langPosts = posts.filter(function(p) {
        return p.lang === currentLang;
      });
      var pool = langPosts.length > 0 ? langPosts : posts;

      var available = pool.filter(function(p) {
        return p.url !== currentPath && p.url !== currentPath + '/';
      });

      var finalPool = available.length > 0 ? available : pool;
      var randomIndex = Math.floor(Math.random() * finalPool.length);
      window.location.href = finalPool[randomIndex].url;
    });
  }

  // --- Bootstrap ---
  function initApp() {
    initThemeToggle();
    initLangToggle();
    initRandomPost();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
