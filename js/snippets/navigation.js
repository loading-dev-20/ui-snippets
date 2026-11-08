/* ------------------------------------------------------------------
   Navigation snippets

   Components in this file:
   - responsive-navbar: Responsive navbar
   - pagination: Pagination
   - breadcrumbs: Breadcrumbs
   - section-nav: Section nav with scrollspy
   - menu-dropdown: Menu with dropdown
   - bottom-navigation: Bottom navigation
   - checkout-stepper: Checkout stepper

   Shared setup and the entry format live in base.js. Add or edit
   entries inside the window.UI_SNIPPETS.push(...) call below.
   ------------------------------------------------------------------ */

window.UI_SNIPPETS = window.UI_SNIPPETS || [];

window.UI_SNIPPETS.push(
  {
    id: 'responsive-navbar',
    title: 'Responsive navbar',
    category: 'Navigation',
    description: 'A top bar that collapses into a menu button on narrow screens. Switch the preview to phone width to try it.',
    height: 300,
    layout: 'top',
    html: `<header class="nav">
  <a class="logo" href="#">Logo</a>

  <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="menu">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <nav class="menu" id="menu" aria-label="Main">
    <a href="#" aria-current="page">Home</a>
    <a href="#">Courses</a>
    <a href="#">Pricing</a>
    <a href="#">Contact</a>
  </nav>
</header>`,
    css: `.nav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid #d3dbe6;
  background: #fff;
}

.logo { color: #14233b; font-size: 20px; font-weight: 800; text-decoration: none; }

.menu { display: flex; gap: 8px; }
.menu a {
  padding: 8px 14px;
  border-radius: 8px;
  color: #14233b;
  font-weight: 500;
  text-decoration: none;
}
.menu a:hover { background: #edf1f5; }
.menu a[aria-current="page"] { background: #14233b; color: #fff; }
.menu a:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

/* Menu button (hidden on wide screens) */
.nav-toggle {
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
}
.nav-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  margin: 5px auto;
  background: #14233b;
  transition: transform 0.2s, opacity 0.2s;
}
.nav-toggle[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.nav-toggle[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.nav-toggle:focus-visible { outline: 3px solid #0a7a75; }

@media (max-width: 640px) {
  .nav-toggle { display: block; }

  .menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    padding: 8px 16px 16px;
    border-bottom: 1px solid #d3dbe6;
    background: #fff;
  }
  .menu.is-open { display: flex; }
}`,
    js: `const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('is-open', !open);
});

// Close the menu with the Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    toggle.click();
    toggle.focus();
  }
});`
  },

  {
    id: 'pagination',
    title: 'Pagination',
    category: 'Navigation',
    description: 'Numbered page buttons with previous and next. The current page is marked for screen readers.',
    height: 150,
    html: `<nav class="pager" aria-label="Pagination">
  <button type="button" id="prev">Previous</button>
  <ol id="pages"></ol>
  <button type="button" id="next">Next</button>
</nav>`,
    css: `.pager { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px; }

.pager ol { display: flex; gap: 4px; margin: 0; padding: 0; list-style: none; }

.pager button {
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: 1.5px solid #d3dbe6;
  border-radius: 8px;
  background: #fff;
  color: #14233b;
  font-weight: 600;
  cursor: pointer;
}
.pager button:hover:not(:disabled) { border-color: #14233b; }
.pager button:disabled { color: #8d9bb0; cursor: not-allowed; }
.pager button[aria-current="page"] { border-color: #14233b; background: #14233b; color: #fff; }
.pager button:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }`,
    js: `const total = 5;
let current = 1;

const list = document.getElementById('pages');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pageButtons = [];

// Build the numbered buttons once, then only update their state
for (let i = 1; i <= total; i++) {
  const item = document.createElement('li');
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = i;
  button.setAttribute('aria-label', 'Page ' + i);
  button.addEventListener('click', () => go(i));
  item.appendChild(button);
  list.appendChild(item);
  pageButtons.push(button);
}

function go(page) {
  current = page;
  pageButtons.forEach((button, index) => {
    if (index + 1 === current) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  prev.disabled = current === 1;
  next.disabled = current === total;
  // Load the content for this page here
}

prev.addEventListener('click', () => go(current - 1));
next.addEventListener('click', () => go(current + 1));
go(1);`
  },

  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    category: 'Navigation',
    description: 'A breadcrumb trail with a home icon, linked parent pages and a clearly marked current page.',
    height: 130,
    html: `<nav class="crumbs" aria-label="Breadcrumb">
  <ol>
    <li>
      <a class="crumb-home" href="#" aria-label="Home">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"></path>
        </svg>
      </a>
    </li>
    <li><a href="#">Shop</a></li>
    <li><a href="#">Coffee</a></li>
    <li><a href="#" aria-current="page">Iced Americano</a></li>
  </ol>
</nav>`,
    css: `.crumbs { display: flex; justify-content: center; }

.crumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.crumbs li { display: flex; align-items: center; gap: 4px; min-width: 0; }

.crumbs li + li::before {
  content: "";
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-top: 1.5px solid #8d9bb0;
  border-right: 1.5px solid #8d9bb0;
  transform: rotate(45deg);
}

.crumbs a {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 6px;
  color: #55657c;
  font-size: 14px;
  text-decoration: none;
}
.crumbs a:hover { background: #edf1f5; color: #14233b; }
.crumbs a[aria-current="page"] { color: #14233b; font-weight: 600; }
.crumbs a:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.crumbs .crumb-home { padding: 6px; }`
  },

  {
    id: 'section-nav',
    title: 'Section nav with scrollspy',
    category: 'Navigation',
    description: 'A page section menu that scrolls the content and keeps the active link in sync as you read.',
    height: 400,
    html: `<div class="section-nav">
  <nav class="toc" aria-label="On this page">
    <p class="toc-title">On this page</p>
    <a href="#origin" class="is-active" aria-current="true">Origin</a>
    <a href="#roast">Roast</a>
    <a href="#brew">Brew</a>
    <a href="#notes">Tasting notes</a>
  </nav>

  <div class="section-scroll" id="section-scroll" tabindex="0" role="region" aria-label="Coffee guide">
    <section id="origin">
      <h3>Origin</h3>
      <p>Grown in the highlands of Huila, Colombia, where cool nights and steady rain slow the cherry ripening.</p>
      <p>Each lot is picked by hand, then washed and dried on raised beds before it travels north.</p>
    </section>
    <section id="roast">
      <h3>Roast</h3>
      <p>A medium roast that keeps the fruit in front without tipping into smoke. We stop the drum just after first crack.</p>
      <p>The result is a cup with enough body for milk and enough acidity to stay interesting black.</p>
    </section>
    <section id="brew">
      <h3>Brew</h3>
      <p>Use 18 grams of coffee to 300 grams of water at 94°C. Bloom for 40 seconds, then pour in two slow circles.</p>
      <p>Aim for a total brew time between 2:30 and 3:00. Grind medium-fine, like table salt.</p>
    </section>
    <section id="notes">
      <h3>Tasting notes</h3>
      <p>Red apple, cocoa nib and a clean finish. The iced version leans brighter, with a little more citrus.</p>
      <p>Best within six weeks of roast. Store the bag sealed, away from light and heat.</p>
    </section>
  </div>
</div>`,
    css: `.section-nav {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  width: min(640px, 100%);
  height: 330px;
  overflow: hidden;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
}

.toc {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 18px 12px;
  border-right: 1px solid #d3dbe6;
  background: #f7f9fb;
}

.toc-title { margin: 0 8px 8px; color: #55657c; font-size: 12px; font-weight: 600; }

.toc a {
  padding: 8px 10px;
  border-radius: 8px;
  color: #55657c;
  font-size: 14px;
  text-decoration: none;
}
.toc a:hover { background: #edf1f5; color: #14233b; }
.toc a.is-active { background: #e6f7f3; color: #07605c; font-weight: 600; }
.toc a:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.section-scroll {
  position: relative;
  overflow-y: auto;
  padding: 18px 20px 24px;
  scrollbar-width: thin;
  scrollbar-color: #c4cfdd transparent;
}
.section-scroll::-webkit-scrollbar { width: 8px; }
.section-scroll::-webkit-scrollbar-thumb { background: #c4cfdd; border-radius: 999px; }
.section-scroll:focus-visible { outline: 3px solid #0a7a75; outline-offset: -3px; }

.section-scroll section { padding: 4px 0 20px; }
.section-scroll section + section { border-top: 1px solid #edf1f5; padding-top: 18px; }
.section-scroll h3 { margin: 0 0 8px; font-size: 17px; }
.section-scroll p { margin: 0 0 10px; color: #55657c; font-size: 14px; line-height: 1.6; }
.section-scroll p:last-child { margin-bottom: 0; }

@media (max-width: 520px) {
  .section-nav { grid-template-columns: 122px minmax(0, 1fr); height: 310px; }
  .toc { padding: 14px 8px; }
  .toc a { padding: 7px 8px; font-size: 13px; }
  .section-scroll { padding: 16px; }
}`,
    js: `const scroller = document.getElementById('section-scroll');
const links = Array.from(document.querySelectorAll('.toc a'));
const sections = links.map((link) => document.querySelector(link.getAttribute('href')));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function markActive(target) {
  links.forEach((link) => {
    const active = link.getAttribute('href') === '#' + target.id;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

function updateSpy() {
  if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) {
    markActive(sections[sections.length - 1]);
    return;
  }

  const marker = scroller.scrollTop + 24;
  let current = sections[0];
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section;
  });
  markActive(current);
}

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    scroller.scrollTo({
      top: target.offsetTop,
      behavior: reduced.matches ? 'auto' : 'smooth'
    });
    markActive(target);
  });
});

scroller.addEventListener('scroll', updateSpy, { passive: true });
updateSpy();`
  },

  {
    id: 'menu-dropdown',
    title: 'Menu with dropdown',
    category: 'Navigation',
    description: 'A shop navigation bar with an accessible dropdown, keyboard arrow support and a featured product link.',
    height: 340,
    layout: 'top',
    html: `<header class="mega">
  <a class="mega-brand" href="#">Northwind</a>

  <nav class="mega-links" aria-label="Main">
    <div class="dropdown">
      <button class="dropdown-toggle" id="shop-toggle" type="button" aria-expanded="false" aria-controls="shop-menu">
        Shop
        <svg class="chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m4 6 4 4 4-4"></path>
        </svg>
      </button>

      <div class="dropdown-panel" id="shop-menu" role="group" aria-label="Shop menu" hidden>
        <div class="dropdown-group">
          <p class="dropdown-heading">Coffee</p>
          <a href="#">Whole bean</a>
          <a href="#">Cold brew</a>
          <a href="#">Subscriptions</a>
        </div>
        <div class="dropdown-group">
          <p class="dropdown-heading">Gear</p>
          <a href="#">Brewers</a>
          <a href="#">Grinders</a>
          <a href="#">Cups and mugs</a>
        </div>
        <a class="dropdown-feature" href="#">
          <img src="assets/Ice-Americano.jpg" alt="" width="52" height="52">
          <span class="dropdown-feature-text">
            <strong>Iced Americano</strong>
            <span>Best seller · $4.50</span>
          </span>
        </a>
      </div>
    </div>

    <a href="#">Journal</a>
    <a href="#">About</a>
  </nav>

  <a class="mega-cart" href="#" aria-label="Bag, 2 items">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8Z"></path>
      <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
    </svg>
    <span>Bag</span>
    <span class="mega-count" aria-hidden="true">2</span>
  </a>
</header>`,
    css: `.mega {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid #d3dbe6;
  background: #fff;
}

.mega-brand { color: #14233b; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; text-decoration: none; }

.mega-links { display: flex; align-items: center; gap: 6px; margin-left: auto; }

.dropdown { position: static; }

.dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #14233b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.dropdown-toggle:hover,
.dropdown-toggle[aria-expanded="true"] { background: #edf1f5; }

.chevron { transition: transform 0.16s; }
.dropdown-toggle[aria-expanded="true"] .chevron { transform: rotate(180deg); }

.mega-links > a {
  padding: 8px 12px;
  border-radius: 8px;
  color: #14233b;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}
.mega-links > a:hover { background: #edf1f5; }

.mega a:focus-visible,
.dropdown-toggle:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.dropdown-panel {
  position: absolute;
  top: calc(100% + 1px);
  left: 24px;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 22px;
  width: min(440px, calc(100% - 48px));
  padding: 18px;
  border: 1px solid #d3dbe6;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(20, 35, 59, 0.16);
  animation: menu-in 0.16s ease-out;
}
.dropdown-panel[hidden] { display: none; }

@keyframes menu-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-group { display: grid; align-content: start; gap: 2px; }
.dropdown-heading { margin: 0 0 4px 8px; color: #55657c; font-size: 12px; font-weight: 600; }

.dropdown-group a {
  padding: 6px 8px;
  border-radius: 6px;
  color: #14233b;
  font-size: 14px;
  text-decoration: none;
}
.dropdown-group a:hover { background: #edf1f5; }

.dropdown-feature {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
  padding: 8px;
  border-radius: 10px;
  background: #fbf8f4;
  color: #14233b;
  text-decoration: none;
}
.dropdown-feature:hover { background: #f4ede4; }
.dropdown-feature img { width: 52px; height: 52px; object-fit: cover; border-radius: 8px; mix-blend-mode: multiply; }
.dropdown-feature-text { display: grid; gap: 2px; }
.dropdown-feature-text strong { font-size: 13px; }
.dropdown-feature-text span { color: #55657c; font-size: 12px; }

.mega-cart {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 8px;
  color: #14233b;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
.mega-cart:hover { background: #edf1f5; }

.mega-count {
  display: grid;
  place-items: center;
  min-width: 19px;
  height: 19px;
  padding: 0 5px;
  border-radius: 999px;
  background: #0a7a75;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
}

@media (max-width: 620px) {
  .mega { height: 60px; padding: 0 16px; gap: 10px; }
  .mega-brand { font-size: 18px; }
  .mega-links > a { display: none; }
  .mega-cart span:not(.mega-count) { display: none; }
  .mega-cart { padding: 8px; }
  .dropdown-panel { left: 16px; width: min(440px, calc(100% - 32px)); padding: 14px; }
}

@media (prefers-reduced-motion: reduce) {
  .chevron,
  .dropdown-panel { animation: none; transition: none; }
}`,
    js: `const toggle = document.getElementById('shop-toggle');
const panel = document.getElementById('shop-menu');
const dropdown = document.querySelector('.dropdown');
const links = Array.from(panel.querySelectorAll('a'));

function openMenu(focusFirst) {
  panel.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
  if (focusFirst) links[0].focus();
}

function closeMenu(returnFocus) {
  if (panel.hidden) return;
  panel.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) toggle.focus();
}

toggle.addEventListener('click', () => {
  if (panel.hidden) openMenu(false);
  else closeMenu(false);
});

toggle.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    openMenu(true);
  }
});

panel.addEventListener('keydown', (event) => {
  const index = links.indexOf(document.activeElement);

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    links[(index + 1) % links.length].focus();
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    links[(index - 1 + links.length) % links.length].focus();
  }
  if (event.key === 'Home') {
    event.preventDefault();
    links[0].focus();
  }
  if (event.key === 'End') {
    event.preventDefault();
    links[links.length - 1].focus();
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu(true);
  }
});

links.forEach((link) => {
  link.addEventListener('click', () => closeMenu(true));
});

document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) closeMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !panel.hidden) closeMenu(true);
});`
  },

  {
    id: 'bottom-navigation',
    title: 'Bottom navigation',
    category: 'Navigation',
    description: 'A compact bottom tab bar with icons, labels and a live screen title that updates with the selected tab.',
    height: 300,
    html: `<div class="dock-demo">
  <div class="dock-screen" aria-live="polite" aria-atomic="true">
    <h3 id="dock-title">Your morning order</h3>
    <p id="dock-copy">Iced Americano, ready in 4 minutes.</p>
  </div>

  <nav class="dock" aria-label="Primary">
    <button class="dock-link is-active" type="button" aria-current="page" data-title="Your morning order" data-copy="Iced Americano, ready in 4 minutes.">
      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"></path>
      </svg>
      <span>Home</span>
    </button>
    <button class="dock-link" type="button" data-title="Find a drink" data-copy="Search the menu by name or roast.">
      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="6"></circle>
        <path d="m16 16 4 4"></path>
      </svg>
      <span>Search</span>
    </button>
    <button class="dock-link" type="button" data-title="Order history" data-copy="Two orders from this week.">
      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"></path>
        <path d="M9 8h6M9 12h6"></path>
      </svg>
      <span>Orders</span>
    </button>
    <button class="dock-link" type="button" data-title="Your account" data-copy="Manage payment and pickup details.">
      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5"></circle>
        <path d="M5 20a7 7 0 0 1 14 0"></path>
      </svg>
      <span>Account</span>
    </button>
  </nav>
</div>`,
    css: `.dock-demo { display: grid; gap: 14px; width: min(420px, 100%); }

.dock-screen {
  min-height: 110px;
  padding: 20px;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
}
.dock-screen h3 { margin: 0; font-size: 18px; }
.dock-screen p { margin: 6px 0 0; color: #55657c; font-size: 14px; line-height: 1.5; }

.dock {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  padding: 6px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(20, 35, 59, 0.16);
}

.dock-link {
  display: grid;
  justify-items: center;
  gap: 4px;
  padding: 8px 4px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #55657c;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.dock-link:hover { background: #f2f5f8; color: #14233b; }
.dock-link.is-active { background: #e6f7f3; color: #07605c; }
.dock-link:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .dock-link { transition: none; }
}`,
    js: `const tabs = Array.from(document.querySelectorAll('.dock-link'));
const title = document.getElementById('dock-title');
const copy = document.getElementById('dock-copy');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      if (active) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
    title.textContent = tab.dataset.title;
    copy.textContent = tab.dataset.copy;
  });
});`
  },

  {
    id: 'checkout-stepper',
    title: 'Checkout stepper',
    category: 'Navigation',
    description: 'A three-step checkout progress bar with completed steps, a current step and working back and next actions.',
    height: 350,
    html: `<div class="stepper">
  <ol class="steps" id="steps" aria-label="Checkout progress">
    <li>
      <button class="step" type="button" data-step="1">
        <span class="step-dot">
          <span class="step-number">1</span>
          <svg class="step-check" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m3 8 3 3 7-7"></path>
          </svg>
        </span>
        <span class="step-label">Cart</span>
      </button>
    </li>
    <li>
      <button class="step" type="button" data-step="2">
        <span class="step-dot">
          <span class="step-number">2</span>
          <svg class="step-check" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m3 8 3 3 7-7"></path>
          </svg>
        </span>
        <span class="step-label">Details</span>
      </button>
    </li>
    <li>
      <button class="step" type="button" data-step="3">
        <span class="step-dot">
          <span class="step-number">3</span>
          <svg class="step-check" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m3 8 3 3 7-7"></path>
          </svg>
        </span>
        <span class="step-label">Payment</span>
      </button>
    </li>
  </ol>

  <div class="step-panel">
    <div aria-live="polite">
      <h3 id="step-title">Contact details</h3>
      <p id="step-copy">We will send your receipt and pickup updates here.</p>
    </div>
    <div class="step-actions">
      <button class="step-back" id="step-back" type="button">Back</button>
      <button class="step-next" id="step-next" type="button">Continue to payment</button>
    </div>
  </div>
</div>`,
    css: `.stepper {
  width: min(460px, 100%);
  padding: 24px;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
}

.steps { position: relative; display: flex; margin: 0 0 24px; padding: 0; list-style: none; }

.steps::before,
.steps::after {
  content: "";
  position: absolute;
  top: 15px;
  left: 16.66%;
  height: 2px;
  background: #d3dbe6;
}
.steps::before { right: 16.66%; }
.steps::after {
  width: 66.66%;
  background: #0a7a75;
  transform: scaleX(var(--progress, 0));
  transform-origin: left;
  transition: transform 0.25s ease;
}

.steps li { display: flex; flex: 1; justify-content: center; }

.step {
  display: grid;
  justify-items: center;
  gap: 7px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #55657c;
  cursor: pointer;
}
.step:disabled { cursor: not-allowed; }

.step-dot {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 2px solid #d3dbe6;
  border-radius: 50%;
  background: #fff;
  color: #55657c;
  font-size: 12px;
  font-weight: 700;
}
.step-check { display: none; }
.step-label { font-size: 12px; font-weight: 600; }

.step:hover:not(:disabled) .step-dot { border-color: #0a7a75; color: #0a7a75; }
.step.is-current .step-dot { border-color: #0a7a75; background: #0a7a75; color: #fff; }
.step.is-current .step-label { color: #14233b; }
.step.is-complete .step-dot { border-color: #0a7a75; background: #e6f7f3; color: #07605c; }
.step.is-complete .step-number { display: none; }
.step.is-complete .step-check { display: block; }
.step.is-complete .step-label { color: #07605c; }
.step:disabled .step-dot { opacity: 0.55; }
.step:focus-visible { border-radius: 6px; outline: 3px solid #0a7a75; outline-offset: 3px; }

.step-panel h3 { margin: 0; font-size: 18px; }
.step-panel p { min-height: 44px; margin: 6px 0 0; color: #55657c; font-size: 14px; line-height: 1.55; }

.step-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 18px; }

.step-back,
.step-next {
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.step-back { border: 1.5px solid #d3dbe6; background: #fff; color: #14233b; }
.step-back:hover:not(:disabled) { border-color: #14233b; }
.step-back:disabled { color: #8d9bb0; cursor: not-allowed; }
.step-next { border: 1.5px solid #0a7a75; background: #0a7a75; color: #fff; }
.step-next:hover:not(:disabled) { border-color: #07605c; background: #07605c; }
.step-next:disabled { opacity: 0.65; cursor: default; }
.step-back:focus-visible,
.step-next:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

@media (max-width: 420px) {
  .stepper { padding: 18px; }
  .step-actions { flex-direction: column; }
  .step-back,
  .step-next { width: 100%; }
  .step-panel p { min-height: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .steps::after { transition: none; }
}`,
    js: `const stepData = [
  { title: 'Review your bag', copy: 'One iced americano and a bag of whole bean coffee.', next: 'Continue to details' },
  { title: 'Contact details', copy: 'We will send your receipt and pickup updates here.', next: 'Continue to payment' },
  { title: 'Payment', copy: 'Pay at pickup or use a saved card.', next: 'Place order' }
];
const labels = ['Cart', 'Details', 'Payment'];
const stepButtons = Array.from(document.querySelectorAll('.step'));
const stepsEl = document.getElementById('steps');
const title = document.getElementById('step-title');
const copy = document.getElementById('step-copy');
const back = document.getElementById('step-back');
const next = document.getElementById('step-next');
let current = 2;

function render() {
  stepButtons.forEach((button, index) => {
    const step = index + 1;
    const completed = step < current;
    const isCurrent = step === current;

    button.disabled = step > current;
    button.classList.toggle('is-complete', completed);
    button.classList.toggle('is-current', isCurrent);

    if (isCurrent) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');

    let label = 'Step ' + step + ': ' + labels[index];
    if (completed) label += ', completed';
    if (isCurrent) label += ', current';
    button.setAttribute('aria-label', label);
  });

  stepsEl.style.setProperty('--progress', String((current - 1) / 2));

  const data = stepData[current - 1];
  title.textContent = data.title;
  copy.textContent = data.copy;
  next.textContent = data.next;
  next.disabled = false;
  back.disabled = current === 1;
}

stepButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const step = Number(button.dataset.step);
    if (step <= current) {
      current = step;
      render();
    }
  });
});

back.addEventListener('click', () => {
  if (current > 1) {
    current -= 1;
    render();
  }
});

next.addEventListener('click', () => {
  if (current < 3) {
    current += 1;
    render();
  } else {
    copy.textContent = 'Thanks. Your order will be ready in 4 minutes.';
    next.textContent = 'Order placed';
    next.disabled = true;
    back.focus();
  }
});

render();`
  }
);
