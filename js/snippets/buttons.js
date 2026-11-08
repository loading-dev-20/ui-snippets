/* ------------------------------------------------------------------
   Buttons snippets

   Components in this file:
   - button-set: Button set
   - button-sizes: Button sizes
   - icon-buttons: Icon buttons
   - split-button: Split button
   - segmented-control: Segmented control
   - social-buttons: Social sign-in buttons
   - destructive-button: Two-step delete button

   Shared setup and the entry format live in base.js. Add or edit
   entries inside the window.UI_SNIPPETS.push(...) call below.
   ------------------------------------------------------------------ */

window.UI_SNIPPETS = window.UI_SNIPPETS || [];

window.UI_SNIPPETS.push(
  {
    id: 'button-set',
    title: 'Button set',
    category: 'Buttons',
    description: 'Primary, outline and ghost buttons, plus a button that shows a loading state while it works.',
    height: 170,
    html: `<div class="btn-row">
  <button class="btn btn-primary" type="button">Save changes</button>
  <button class="btn btn-outline" type="button">Cancel</button>
  <button class="btn btn-ghost" type="button">Learn more</button>
  <button class="btn btn-primary" type="button" id="publish">
    <span class="btn-label">Publish</span>
  </button>
</div>`,
    css: `.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 12px 20px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.btn-primary { background: #0a7a75; color: #fff; }
.btn-primary:hover { background: #07605c; }

.btn-outline { border-color: #0a7a75; background: transparent; color: #0a7a75; }
.btn-outline:hover { background: rgba(10, 122, 117, 0.08); }

.btn-ghost { background: transparent; color: #14233b; }
.btn-ghost:hover { background: rgba(20, 35, 59, 0.08); }

/* Loading state */
.btn.is-loading { opacity: 0.8; pointer-events: none; }
.btn.is-loading::after {
  content: "";
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 10px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  vertical-align: -1px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }`,
    js: `const publish = document.getElementById('publish');
const label = publish.querySelector('.btn-label');

publish.addEventListener('click', () => {
  publish.classList.add('is-loading');
  label.textContent = 'Publishing';

  // Replace this timer with your real request
  setTimeout(() => {
    publish.classList.remove('is-loading');
    label.textContent = 'Published';
  }, 1500);
});`
  },

  {
    id: 'button-sizes',
    title: 'Button sizes',
    category: 'Buttons',
    description: 'A small, medium and large button scale, plus a full-width block button for forms and panels.',
    height: 230,
    html: `<div class="size-demo">
  <div class="size-row">
    <button class="size-btn size-sm" type="button">Small</button>
    <button class="size-btn size-md" type="button">Medium</button>
    <button class="size-btn size-lg" type="button">Large</button>
  </div>

  <button class="size-btn size-md size-block" type="button">Full width</button>
</div>`,
    css: `.size-demo {
  display: grid;
  gap: 16px;
  width: min(360px, 100%);
}

.size-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.size-btn {
  border: 0;
  border-radius: 8px;
  background: #0a7a75;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.size-btn:hover { background: #07605c; }
.size-btn:active { transform: translateY(1px); }
.size-btn:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.size-sm { padding: 8px 12px; border-radius: 7px; font-size: 13px; }
.size-md { padding: 11px 18px; border-radius: 8px; font-size: 15px; }
.size-lg { padding: 14px 24px; border-radius: 10px; font-size: 17px; }
.size-block { width: 100%; }`,
    js: ''
  },

  {
    id: 'icon-buttons',
    title: 'Icon buttons',
    category: 'Buttons',
    description: 'Compact icon-only actions with accessible labels, a pressed bookmark state and a solid primary action.',
    height: 190,
    html: `<div class="icon-demo">
  <div class="icon-row">
    <button class="icon-btn" type="button" id="bookmark" aria-label="Bookmark this page" aria-pressed="false">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 4h12v17l-6-4-6 4Z"></path>
      </svg>
    </button>

    <button class="icon-btn" type="button" id="share" aria-label="Share this page">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="6" r="3"></circle>
        <circle cx="18" cy="18" r="3"></circle>
        <path d="m8.7 10.6 6.6-3.2M8.7 13.4l6.6 3.2"></path>
      </svg>
    </button>

    <button class="icon-btn icon-btn-solid" type="button" id="more" aria-label="More actions">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <circle cx="5" cy="12" r="1.8"></circle>
        <circle cx="12" cy="12" r="1.8"></circle>
        <circle cx="19" cy="12" r="1.8"></circle>
      </svg>
    </button>
  </div>

  <p class="icon-note" id="icon-note" role="status">Icon-only buttons still need an accessible name.</p>
</div>`,
    css: `.icon-demo { display: grid; justify-items: center; gap: 18px; }

.icon-row { display: flex; gap: 10px; }

.icon-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1.5px solid #d3dbe6;
  border-radius: 10px;
  background: #fff;
  color: #14233b;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.1s;
}
.icon-btn:hover { border-color: #0a7a75; background: #f5f8fb; }
.icon-btn:active { transform: translateY(1px); }
.icon-btn:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }
.icon-btn[aria-pressed="true"] { border-color: #0a7a75; background: #0a7a75; color: #fff; }

.icon-btn-solid { border-color: #14233b; background: #14233b; color: #fff; }
.icon-btn-solid:hover { border-color: #0a7a75; background: #0a7a75; }

.icon-note { margin: 0; color: #55657c; font-size: 13px; text-align: center; }`,
    js: `const bookmark = document.getElementById('bookmark');
const share = document.getElementById('share');
const note = document.getElementById('icon-note');

bookmark.addEventListener('click', () => {
  const saved = bookmark.getAttribute('aria-pressed') === 'true';
  bookmark.setAttribute('aria-pressed', String(!saved));
  note.textContent = saved ? 'Bookmark removed.' : 'Bookmarked for later.';
});

share.addEventListener('click', () => {
  note.textContent = 'Share action triggered.';
});

document.getElementById('more').addEventListener('click', () => {
  note.textContent = 'More actions would open here.';
});`
  },

  {
    id: 'split-button',
    title: 'Split button',
    category: 'Buttons',
    description: 'A primary action joined to a menu toggle, with keyboard navigation, Escape to close and click-outside handling.',
    height: 310,
    layout: 'top',
    html: `<div class="split-demo">
  <div class="split">
    <button class="split-main" type="button" id="publish-main">Publish</button>
    <button class="split-toggle" type="button" id="publish-toggle" aria-label="More publish options" aria-haspopup="menu" aria-expanded="false" aria-controls="publish-menu">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </button>

    <div class="split-menu" id="publish-menu" role="menu" hidden>
      <button type="button" role="menuitem">Schedule for later</button>
      <button type="button" role="menuitem">Save as draft</button>
      <button type="button" role="menuitem">Publish and notify</button>
    </div>
  </div>

  <p class="split-note" id="split-note" role="status">Publish now, or open the menu for more options.</p>
</div>`,
    css: `.split-demo {
  display: grid;
  justify-items: center;
  gap: 18px;
  padding: 32px 24px;
}

.split { position: relative; display: inline-flex; }

.split-main,
.split-toggle {
  border: 0;
  background: #0a7a75;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.split-main { padding: 12px 20px; border-radius: 8px 0 0 8px; }
.split-toggle {
  display: grid;
  place-items: center;
  width: 44px;
  padding: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 0 8px 8px 0;
}
.split-main:hover,
.split-toggle:hover { background: #07605c; }
.split-main:active,
.split-toggle:active { transform: translateY(1px); }
.split-main:focus-visible,
.split-toggle:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }
.split-toggle[aria-expanded="true"] { background: #07605c; }
.split-toggle[aria-expanded="true"] svg { transform: rotate(180deg); }
.split-toggle svg { transition: transform 0.15s; }

.split-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 2;
  width: 210px;
  padding: 6px;
  border: 1px solid #d3dbe6;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(20, 35, 59, 0.16);
}
.split-menu[hidden] { display: none; }

.split-menu button {
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #14233b;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}
.split-menu button:hover,
.split-menu button:focus-visible { background: #edf1f5; }
.split-menu button:focus-visible { outline: 2px solid #0a7a75; outline-offset: -2px; }

.split-note { margin: 0; color: #55657c; font-size: 13px; text-align: center; }`,
    js: `const main = document.getElementById('publish-main');
const toggle = document.getElementById('publish-toggle');
const menu = document.getElementById('publish-menu');
const note = document.getElementById('split-note');
const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));

function closeMenu(returnFocus) {
  if (menu.hidden) return;
  menu.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  note.hidden = false;
  if (returnFocus) toggle.focus();
}

function openMenu() {
  menu.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
  note.hidden = true;
  items[0].focus();
}

toggle.addEventListener('click', () => {
  if (menu.hidden) openMenu();
  else closeMenu(true);
});

main.addEventListener('click', () => {
  note.textContent = 'Published to production.';
});

items.forEach((item) => {
  item.addEventListener('click', () => {
    note.textContent = item.textContent + '.';
    closeMenu(true);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu(true);
});

document.addEventListener('click', (event) => {
  if (!menu.hidden && !event.target.closest('.split')) closeMenu(false);
});

menu.addEventListener('keydown', (event) => {
  const index = items.indexOf(document.activeElement);
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    items[(index + 1) % items.length].focus();
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    items[(index - 1 + items.length) % items.length].focus();
  }
});`
  },

  {
    id: 'segmented-control',
    title: 'Segmented control',
    category: 'Buttons',
    description: 'A compact group of toggle buttons for switching a view, with the selected option marked for assistive tech.',
    height: 180,
    html: `<div class="segment-demo">
  <div class="segmented" role="group" aria-label="Chart range">
    <button type="button" data-range="day" aria-pressed="true">Day</button>
    <button type="button" data-range="week" aria-pressed="false">Week</button>
    <button type="button" data-range="month" aria-pressed="false">Month</button>
  </div>

  <p class="segment-note" id="segment-note" role="status">Showing the last 24 hours.</p>
</div>`,
    css: `.segment-demo { display: grid; justify-items: center; gap: 16px; }

.segmented {
  display: flex;
  width: min(300px, 100%);
  padding: 4px;
  border-radius: 12px;
  background: #edf1f5;
}

.segmented button {
  flex: 1;
  padding: 9px 14px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #55657c;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
}
.segmented button:hover { color: #14233b; }
.segmented button[aria-pressed="true"] {
  background: #fff;
  color: #14233b;
  box-shadow: 0 1px 3px rgba(20, 35, 59, 0.18);
}
.segmented button:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.segment-note { margin: 0; color: #55657c; font-size: 13px; }`,
    js: `const rangeButtons = Array.from(document.querySelectorAll('.segmented button'));
const rangeNote = document.getElementById('segment-note');
const messages = {
  day: 'Showing the last 24 hours.',
  week: 'Showing the last 7 days.',
  month: 'Showing the last 30 days.'
};

rangeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    rangeButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    rangeNote.textContent = messages[button.dataset.range];
  });
});`
  },

  {
    id: 'social-buttons',
    title: 'Social sign-in buttons',
    category: 'Buttons',
    description: 'Provider buttons with recognizable brand marks, full-width hit areas and a clear secondary note.',
    height: 220,
    html: `<div class="social-demo">
  <button class="social-btn" type="button">
    <svg class="social-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#4285f4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.38Z"></path>
      <path fill="#34a853" d="M12 22c2.7 0 4.96-.9 6.62-2.39l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A9.99 9.99 0 0 0 12 22Z"></path>
      <path fill="#fbbc05" d="M6.41 13.94a6 6 0 0 1 0-3.88V7.47H3.07a10 10 0 0 0 0 9.06l3.34-2.59Z"></path>
      <path fill="#ea4335" d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a9.99 9.99 0 0 0-8.93 5.47l3.34 2.59C7.2 7.7 9.4 5.94 12 5.94Z"></path>
    </svg>
    <span>Continue with Google</span>
  </button>

  <button class="social-btn" type="button">
    <svg class="social-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#14233b" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.55 2.87 8.4 6.84 9.76.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"></path>
    </svg>
    <span>Continue with GitHub</span>
  </button>

  <p class="social-note">We never post without your permission.</p>
</div>`,
    css: `.social-demo {
  display: grid;
  gap: 10px;
  width: min(320px, 100%);
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 11px 16px;
  border: 1.5px solid #d3dbe6;
  border-radius: 10px;
  background: #fff;
  color: #14233b;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
}
.social-btn:hover { border-color: #14233b; background: #f7f9fb; }
.social-btn:active { transform: translateY(1px); }
.social-btn:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.social-icon { flex-shrink: 0; }

.social-note {
  margin: 2px 0 0;
  color: #55657c;
  font-size: 12px;
  text-align: center;
}`,
    js: ''
  },

  {
    id: 'destructive-button',
    title: 'Two-step delete button',
    category: 'Buttons',
    description: 'A destructive action that asks for a second click before it commits, then resets the confirmation after four seconds.',
    height: 190,
    html: `<div class="danger-demo">
  <button class="danger-btn" id="delete-project" type="button">Delete project</button>
  <p class="danger-note" id="delete-note" role="status">This action cannot be undone.</p>
</div>`,
    css: `.danger-demo { display: grid; justify-items: center; gap: 14px; }

.danger-btn {
  min-width: 190px;
  padding: 12px 20px;
  border: 2px solid #b3261e;
  border-radius: 8px;
  background: #fff;
  color: #b3261e;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.danger-btn:hover { background: #fdeceb; }
.danger-btn.is-armed { background: #b3261e; color: #fff; }
.danger-btn.is-armed:hover { border-color: #8f1d17; background: #8f1d17; }
.danger-btn:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }
.danger-btn:disabled { border-color: #d3dbe6; background: #edf1f5; color: #55657c; cursor: default; }

.danger-note { margin: 0; color: #55657c; font-size: 13px; text-align: center; }`,
    js: `const deleteButton = document.getElementById('delete-project');
const deleteNote = document.getElementById('delete-note');
let armed = false;
let resetTimer;

function resetDelete() {
  armed = false;
  deleteButton.classList.remove('is-armed');
  deleteButton.textContent = 'Delete project';
  deleteNote.textContent = 'This action cannot be undone.';
}

deleteButton.addEventListener('click', () => {
  if (!armed) {
    armed = true;
    deleteButton.classList.add('is-armed');
    deleteButton.textContent = 'Click again to delete';
    deleteNote.textContent = 'Click once more within 4 seconds to confirm.';
    clearTimeout(resetTimer);
    resetTimer = setTimeout(resetDelete, 4000);
    return;
  }

  clearTimeout(resetTimer);
  armed = false;
  deleteButton.disabled = true;
  deleteButton.classList.remove('is-armed');
  deleteButton.textContent = 'Project deleted';
  deleteNote.textContent = 'The project and its files were removed.';
});`
  }
);
