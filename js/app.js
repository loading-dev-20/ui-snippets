/* ------------------------------------------------------------------
   UI Snippets: site behaviour
   Builds the gallery from window.UI_SNIPPETS (see snippets.js).
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  const SNIPPETS = window.UI_SNIPPETS || [];
  const BASE_CSS = window.UI_BASE_CSS || '';
  const CATEGORIES = ['Buttons', 'Forms', 'Cards', 'Navigation', 'Content', 'Feedback'];
  const LABELS = { html: 'HTML', css: 'CSS', js: 'JavaScript' };
  const THEME_KEY = 'ui-snippets-theme';

  const state = { category: 'all', query: '' };
  const specimens = new Map(); // snippet id -> { snippet, node }

  // One lowercase blob per snippet so every keystroke searches titles, descriptions and source
  const searchIndex = new Map(SNIPPETS.map((snippet) => [
    snippet.id,
    [snippet.title, snippet.description, snippet.category, snippet.html, snippet.css, snippet.js || '']
      .join('\n')
      .toLowerCase()
  ]));

  const $ = (selector) => document.querySelector(selector);
  const listEl = $('#list');
  const countEl = $('#count');
  const searchEl = $('#search');
  const emptyEl = $('#empty');
  const emptyMessageEl = $('#empty-message');
  const categoriesEl = $('#categories');
  const announcerEl = $('#announcer');
  const themeToggle = $('#theme-toggle');

  /* ---------- Small helpers ---------- */

  function el(tag, props, children) {
    const node = document.createElement(tag);
    Object.keys(props || {}).forEach((key) => {
      const value = props[key];
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else node.setAttribute(key, value);
    });
    (children || []).forEach((child) => node.appendChild(child));
    return node;
  }

  function announce(message) {
    announcerEl.textContent = '';
    // A short delay makes screen readers announce repeated messages
    setTimeout(() => { announcerEl.textContent = message; }, 30);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(area);
      return ok;
    }
  }

  function download(filename, text) {
    const blob = new Blob([text], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // Shows "Copied" (or "Copy failed") on a button, then restores its label
  function flash(button, ok, restoreLabel) {
    clearTimeout(button._timer);
    button.textContent = ok ? 'Copied' : 'Copy failed';
    button.classList.toggle('is-done', ok);
    button._timer = setTimeout(() => {
      button.textContent = restoreLabel();
      button.classList.remove('is-done');
    }, 1600);
  }

  /* ---------- Theme ---------- */

  function storedTheme() {
    try {
      const value = localStorage.getItem(THEME_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateThemeToggle(theme) {
    if (!themeToggle) return;
    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.querySelector('.theme-toggle-text').textContent = dark ? 'Light mode' : 'Dark mode';
  }

  function applyTheme(theme, persist) {
    document.documentElement.dataset.theme = theme;
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (error) { /* storage can be blocked */ }
    }
    updateThemeToggle(theme);
  }

  function setupTheme() {
    const initial = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    applyTheme(initial, false);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
        announce(next === 'dark' ? 'Dark theme on.' : 'Light theme on.');
      });
    }

    // Until someone picks a theme, keep following the operating system
    if (window.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => {
        if (!storedTheme()) applyTheme(systemTheme(), false);
      };
      if (media.addEventListener) media.addEventListener('change', onChange);
      else if (media.addListener) media.addListener(onChange);
    }
  }

  /* ---------- Syntax highlighting ---------- */

  function esc(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function span(cls, text) {
    return '<span class="tok-' + cls + '">' + text + '</span>';
  }

  const highlighters = {
    html(source) {
      return esc(source).replace(
        /(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?[a-zA-Z][\w-]*)|([\w:-]+)(=)("[^"]*"|'[^']*')/g,
        (match, comment, tag, attr, equals, value) => {
          if (comment) return span('c', comment);
          if (tag) return span('tag', tag);
          return span('attr', attr) + equals + span('s', value);
        }
      );
    },

    css(source) {
      return esc(source).replace(
        /(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(@[\w-]+)|(#[0-9a-fA-F]{3,8}\b)|(--[\w-]+)|([a-zA-Z-]+)(?=\s*:[^;{}]*[;}])|([a-zA-Z_][\w-]*)|(-?\d*\.?\d+(?:px|rem|em|%|vh|vw|s|ms|deg|fr)?)/g,
        (match, comment, string, atRule, hex, variable, property, identifier, number) => {
          if (comment) return span('c', comment);
          if (string) return span('s', string);
          if (atRule) return span('k', atRule);
          if (hex) return span('n', hex);
          if (variable) return span('v', variable);
          if (property) return span('p', property);
          if (identifier) return identifier;
          return span('n', number);
        }
      );
    },

    js(source) {
      return esc(source).replace(
        /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|\b(const|let|var|function|return|if|else|for|while|new|this|true|false|null|undefined|typeof|break|continue)\b|\b(document|window)\b|\b(\d+(?:\.\d+)?)\b/g,
        (match, comment, string, keyword, builtin, number) => {
          if (comment) return span('c', comment);
          if (string) return span('s', string);
          if (keyword) return span('k', keyword);
          if (builtin) return span('f', builtin);
          return span('n', number);
        }
      );
    }
  };

  function highlight(lang, source) {
    const fn = highlighters[lang];
    return fn ? fn(source) : esc(source);
  }

  /* ---------- Building the HTML documents ---------- */

  function indent(text, spaces) {
    const pad = ' '.repeat(spaces);
    return text.split('\n').map((line) => (line ? pad + line : line)).join('\n');
  }

  // preview = true adds layout rules that only exist to centre the example in the stage
  function buildDocument(snippet, preview) {
    const previewCss = snippet.layout === 'top'
      ? 'body { min-height: 100vh; }'
      : 'body { display: grid; place-items: center; min-height: 100vh; padding: 24px; }';

    const css = [BASE_CSS]
      .concat(preview ? [previewCss] : [])
      .concat([snippet.css])
      .join('\n\n');

    const lines = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="utf-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1">',
      '  <title>' + snippet.title + '</title>',
      '  <style>',
      indent(css, 4),
      '  </style>',
      '</head>',
      '<body>',
      indent(snippet.html, 2)
    ];

    if (snippet.js) {
      lines.push('', '  <script>', indent(snippet.js, 4), '  </script>');
    }

    lines.push('</body>', '</html>');
    return lines.join('\n') + '\n';
  }

  /* ---------- One component: preview stage joined to a code panel ---------- */

  function buildSpecimen(snippet) {
    const langs = ['html', 'css'].concat(snippet.js ? ['js'] : []);
    let active = 'html';

    const copyFull = el('button', { class: 'chip', type: 'button', text: 'Copy full page' });
    const save = el('button', { class: 'chip', type: 'button', text: 'Download .html' });

    const head = el('div', { class: 'specimen-head' }, [
      el('div', {}, [
        el('h2', { id: snippet.id + '-title', text: snippet.title }),
        el('p', { class: 'specimen-desc', text: snippet.description })
      ]),
      el('div', { class: 'actions' }, [copyFull, save])
    ]);

    const frame = el('iframe', {
      title: snippet.title + ' preview',
      sandbox: 'allow-scripts allow-forms',
      loading: 'lazy'
    });
    frame.style.height = (snippet.height || 240) + 'px';
    frame.srcdoc = buildDocument(snippet, true);

    const tabButtons = langs.map((lang) => {
      const button = el('button', {
        class: 'code-tab',
        type: 'button',
        role: 'tab',
        id: snippet.id + '-tab-' + lang,
        'aria-controls': snippet.id + '-code',
        text: LABELS[lang]
      });

      button.addEventListener('click', () => select(lang));
      button.addEventListener('keydown', (event) => {
        const index = langs.indexOf(lang);
        let next = null;
        if (event.key === 'ArrowRight') next = langs[(index + 1) % langs.length];
        if (event.key === 'ArrowLeft') next = langs[(index - 1 + langs.length) % langs.length];
        if (next) {
          event.preventDefault();
          select(next);
          tabButtons[langs.indexOf(next)].focus();
        }
      });
      return button;
    });

    const copyButton = el('button', { class: 'copy-btn', type: 'button' });
    const codeEl = el('code');
    const view = el('pre', {
      class: 'code-view',
      id: snippet.id + '-code',
      role: 'tabpanel',
      tabindex: '0'
    }, [codeEl]);

    const bar = el('div', { class: 'code-bar' }, [
      el('div', { class: 'tab-list', role: 'tablist', 'aria-label': snippet.title + ' source code' }, tabButtons),
      copyButton
    ]);

    const copyLabel = () => 'Copy ' + LABELS[active];

    function select(lang) {
      active = lang;
      tabButtons.forEach((button, index) => {
        const on = langs[index] === lang;
        button.setAttribute('aria-selected', String(on));
        button.tabIndex = on ? 0 : -1;
      });
      codeEl.innerHTML = highlight(lang, snippet[lang]);
      view.setAttribute('aria-labelledby', snippet.id + '-tab-' + lang);
      clearTimeout(copyButton._timer);
      copyButton.classList.remove('is-done');
      copyButton.textContent = copyLabel();
    }

    copyButton.addEventListener('click', async () => {
      const ok = await copyText(snippet[active]);
      flash(copyButton, ok, copyLabel);
      announce(ok ? 'Copied ' + LABELS[active] + ' to the clipboard.' : 'Copy failed. Select the code and copy it by hand.');
    });

    copyFull.addEventListener('click', async () => {
      const ok = await copyText(buildDocument(snippet, false));
      flash(copyFull, ok, () => 'Copy full page');
      announce(ok ? 'Copied the full page to the clipboard.' : 'Copy failed.');
    });

    save.addEventListener('click', () => {
      download(snippet.id + '.html', buildDocument(snippet, false));
      announce('Downloaded ' + snippet.id + '.html.');
    });

    select('html');

    const node = el('article', { class: 'specimen', id: snippet.id, 'aria-labelledby': snippet.id + '-title' }, [
      head,
      el('div', { class: 'bench' }, [
        el('div', { class: 'stage' }, [frame]),
        el('div', { class: 'code' }, [bar, view])
      ])
    ]);

    return node;
  }

  /* ---------- Sidebar, search and filtering ---------- */

  function renderCategories() {
    const items = [{ slug: 'all', label: 'All', count: SNIPPETS.length }].concat(
      CATEGORIES.map((name) => ({
        slug: name.toLowerCase(),
        label: name,
        count: SNIPPETS.filter((s) => s.category === name).length
      }))
    );

    items.forEach((item) => {
      const button = el('button', { class: 'cat', type: 'button', 'data-slug': item.slug }, [
        el('span', { text: item.label }),
        el('span', { class: 'cat-count', text: String(item.count) })
      ]);
      button.addEventListener('click', () => setCategory(item.slug, true));
      categoriesEl.appendChild(el('li', {}, [button]));
    });
  }

  function categoryFromHash() {
    const hash = location.hash.slice(1).toLowerCase();
    if (!hash) return 'all';
    const match = CATEGORIES.find((name) => name.toLowerCase() === hash);
    return match ? match.toLowerCase() : null;
  }

  function setCategory(slug, updateHash) {
    state.category = slug;
    if (updateHash) {
      const target = location.pathname + location.search + (slug === 'all' ? '' : '#' + slug);
      const current = location.pathname + location.search + location.hash;
      if (target !== current) history.pushState(null, '', target);
    }
    applyFilter();
  }

  function syncFromLocation() {
    const slug = categoryFromHash();
    // A null slug means the hash points at an in-page anchor such as #main, so leave it alone
    if (slug === null || slug === state.category) return;
    state.category = slug;
    applyFilter();
  }

  function matches(snippet) {
    const inCategory = state.category === 'all' || snippet.category.toLowerCase() === state.category;
    if (!inCategory) return false;

    const query = state.query.trim().toLowerCase();
    if (!query) return true;

    const haystack = searchIndex.get(snippet.id) || '';
    return query.split(/\s+/).every((term) => haystack.indexOf(term) !== -1);
  }

  function plural(count, word) {
    return count + ' ' + word + (count === 1 ? '' : 's');
  }

  function applyFilter() {
    let visible = 0;
    specimens.forEach((entry) => {
      const show = matches(entry.snippet);
      entry.node.hidden = !show;
      if (show) visible++;
    });

    categoriesEl.querySelectorAll('.cat').forEach((button) => {
      button.setAttribute('aria-current', String(button.dataset.slug === state.category));
    });

    const total = SNIPPETS.length;
    countEl.textContent = visible === total
      ? plural(total, 'component')
      : 'Showing ' + visible + ' of ' + plural(total, 'component');

    emptyEl.hidden = visible > 0;
    if (visible === 0) {
      const query = state.query.trim();
      emptyMessageEl.textContent = query
        ? 'No components match "' + query + '". Try a different word, or show everything.'
        : 'No components in this category yet.';
    }
  }

  /* ---------- Page setup ---------- */

  function init() {
    SNIPPETS.forEach((snippet) => {
      const node = buildSpecimen(snippet);
      specimens.set(snippet.id, { snippet, node });
      listEl.appendChild(node);
    });

    renderCategories();

    state.category = categoryFromHash() || 'all';
    applyFilter();

    setupTheme();
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);

    searchEl.addEventListener('input', () => {
      state.query = searchEl.value;
      applyFilter();
    });

    $('#clear-filters').addEventListener('click', () => {
      state.query = '';
      searchEl.value = '';
      setCategory('all', true);
    });

    // Press "/" anywhere to jump to the search box
    document.addEventListener('keydown', (event) => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      const tag = target && target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (target && target.isContentEditable)) return;
      event.preventDefault();
      searchEl.focus();
    });

    // Preview width toggle
    const widthButtons = document.querySelectorAll('.width-toggle button');
    widthButtons.forEach((button) => {
      button.addEventListener('click', () => {
        widthButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
        document.body.classList.toggle('is-phone', button.dataset.width === 'phone');
      });
    });

    // Base reset block
    $('#base-code').innerHTML = highlight('css', BASE_CSS);
    const copyBase = $('#copy-base');
    copyBase.addEventListener('click', async () => {
      const ok = await copyText(BASE_CSS);
      flash(copyBase, ok, () => 'Copy reset');
      announce(ok ? 'Copied the base reset to the clipboard.' : 'Copy failed.');
    });
  }

  init();
})();
