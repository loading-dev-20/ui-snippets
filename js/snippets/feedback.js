/* ------------------------------------------------------------------
   Feedback snippets

   Components in this file:
   - toast-notifications: Toast notifications
   - confirm-dialog: Confirm dialog
   - loaders: Loaders
   - skeleton-loader: Skeleton loader
   - empty-state: Empty state

   Shared setup and the entry format live in base.js. Add or edit
   entries inside the window.UI_SNIPPETS.push(...) call below.
   ------------------------------------------------------------------ */

window.UI_SNIPPETS = window.UI_SNIPPETS || [];

window.UI_SNIPPETS.push(
  {
    id: 'toast-notifications',
    title: 'Toast notifications',
    category: 'Feedback',
    description: 'Short messages that appear in the corner and dismiss themselves after four seconds.',
    height: 280,
    html: `<div class="actions">
  <button class="btn" id="save" type="button">Save profile</button>
  <button class="btn btn-danger" id="upload" type="button">Upload file</button>
</div>

<div class="toasts" id="toasts" role="status" aria-live="polite"></div>`,
    css: `.actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }

.btn {
  padding: 12px 20px;
  border: 0;
  border-radius: 8px;
  background: #0a7a75;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.btn:hover { background: #07605c; }
.btn-danger { background: #b3261e; }
.btn-danger:hover { background: #8f1d17; }
.btn:focus-visible { outline: 3px solid #ffc93c; outline-offset: 2px; }

.toasts {
  position: fixed;
  right: 16px;
  bottom: 16px;
  display: grid;
  gap: 8px;
  width: min(320px, calc(100% - 32px));
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-left: 4px solid #3fd0a0;
  border-radius: 10px;
  background: #14233b;
  color: #fff;
  box-shadow: 0 6px 18px rgba(20, 35, 59, 0.25);
  animation: toast-in 0.25s ease-out;
}
.toast.error { border-left-color: #ff7b72; }

.toast-close {
  margin-left: auto;
  padding: 0 4px;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.toast-close:focus-visible { outline: 2px solid #ffc93c; }

@keyframes toast-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .toast { animation: none; }
}`,
    js: `const toasts = document.getElementById('toasts');

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ' ' + type : '');

  const text = document.createElement('span');
  text.textContent = message;

  const close = document.createElement('button');
  close.className = 'toast-close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Dismiss message');
  close.innerHTML = '&times;';

  const remove = () => toast.remove();
  close.addEventListener('click', remove);
  setTimeout(remove, 4000);

  toast.append(text, close);
  toasts.appendChild(toast);
}

document.getElementById('save').addEventListener('click', () => {
  showToast('Profile saved.');
});

document.getElementById('upload').addEventListener('click', () => {
  showToast('Upload failed. The file is larger than 5 MB. Choose a smaller file.', 'error');
});`
  },

  {
    id: 'confirm-dialog',
    title: 'Confirm dialog',
    category: 'Feedback',
    description: 'A confirmation modal built on the native dialog element. It keeps focus inside and closes with Escape.',
    height: 340,
    html: `<button class="open" id="open-dialog" type="button">Delete project</button>
<p class="result" id="result" role="status"></p>

<dialog id="confirm" aria-labelledby="confirm-title">
  <form method="dialog">
    <h3 id="confirm-title">Delete this project?</h3>
    <p>This permanently removes the project and its 14 files. You cannot undo this.</p>
    <div class="buttons">
      <button class="secondary" value="cancel">Keep project</button>
      <button class="danger" value="delete">Delete project</button>
    </div>
  </form>
</dialog>`,
    css: `.open,
.buttons button {
  padding: 11px 18px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.open { background: #14233b; color: #fff; }
.open:focus-visible,
.buttons button:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.result { min-height: 22px; margin: 14px 0 0; text-align: center; color: #55657c; }

dialog {
  width: min(400px, calc(100% - 32px));
  padding: 0;
  border: 0;
  border-radius: 14px;
  box-shadow: 0 20px 50px rgba(20, 35, 59, 0.35);
}
dialog::backdrop { background: rgba(20, 35, 59, 0.55); }

dialog form { padding: 24px; }
dialog h3 { margin: 0 0 8px; font-size: 20px; }
dialog p { margin: 0 0 22px; color: #55657c; line-height: 1.55; }

.buttons { display: flex; justify-content: flex-end; gap: 10px; }
.secondary { border-color: #b6c2d1; background: #fff; color: #14233b; }
.secondary:hover { border-color: #14233b; }
.danger { background: #b3261e; color: #fff; }
.danger:hover { background: #8f1d17; }`,
    js: `const dialog = document.getElementById('confirm');
const result = document.getElementById('result');

document.getElementById('open-dialog').addEventListener('click', () => {
  dialog.returnValue = '';
  dialog.showModal();
});

// Clicking the dark area outside the box closes the dialog
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close('cancel');
});

dialog.addEventListener('close', () => {
  result.textContent = dialog.returnValue === 'delete'
    ? 'Project deleted.'
    : 'Project kept.';
});`
  },

  {
    id: 'loaders',
    title: 'Loaders',
    category: 'Feedback',
    description: 'A spinner, bouncing dots and an indeterminate progress bar. CSS only.',
    height: 180,
    html: `<div class="loaders">
  <div class="spinner" role="status" aria-label="Loading"></div>

  <div class="dots" role="status" aria-label="Loading">
    <span></span>
    <span></span>
    <span></span>
  </div>

  <div class="bar" role="progressbar" aria-label="Uploading">
    <span></span>
  </div>
</div>`,
    css: `.loaders { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 40px; }

/* Spinner */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #d3dbe6;
  border-top-color: #0a7a75;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Bouncing dots */
.dots { display: flex; gap: 6px; }
.dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0a7a75;
  animation: bounce 0.9s ease-in-out infinite;
}
.dots span:nth-child(2) { animation-delay: 0.15s; }
.dots span:nth-child(3) { animation-delay: 0.3s; }

/* Indeterminate progress bar */
.bar { width: 180px; height: 6px; overflow: hidden; border-radius: 999px; background: #d3dbe6; }
.bar span {
  display: block;
  width: 40%;
  height: 100%;
  border-radius: 999px;
  background: #0a7a75;
  animation: slide 1.2s ease-in-out infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } }
@keyframes slide { from { transform: translateX(-100%); } to { transform: translateX(250%); } }

@media (prefers-reduced-motion: reduce) {
  .spinner, .dots span, .bar span { animation-duration: 3s; }
}`,
    js: ''
  },

  {
    id: 'skeleton-loader',
    title: 'Skeleton loader',
    category: 'Feedback',
    description: 'A shimmering placeholder card that shows the shape of content before it loads. CSS only.',
    height: 390,
    html: `<div class="skeleton-card" role="status" aria-label="Loading article">
  <div class="sk sk-cover"></div>

  <div class="sk-body">
    <div class="sk sk-line sk-line-title"></div>
    <div class="sk sk-line"></div>
    <div class="sk sk-line sk-line-short"></div>

    <div class="sk-footer">
      <div class="sk sk-avatar"></div>
      <div class="sk sk-line"></div>
    </div>
  </div>
</div>`,
    css: `.skeleton-card {
  width: min(360px, 100%);
  overflow: hidden;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
}

.sk {
  border-radius: 8px;
  background: linear-gradient(90deg, #e6ebf2 25%, #f4f7fa 50%, #e6ebf2 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

.sk-cover { height: 140px; border-radius: 0; }

.sk-body { padding: 20px; }

.sk-line { height: 12px; margin-bottom: 10px; }
.sk-line-title { width: 72%; height: 18px; }
.sk-line-short { width: 55%; margin-bottom: 20px; }

.sk-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #e3e9f0;
}
.sk-footer .sk-line { flex: 1; margin: 0; }

.sk-avatar { flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; }

@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .sk { animation: none; }
}`,
    js: ''
  },

  {
    id: 'empty-state',
    title: 'Empty state',
    category: 'Feedback',
    description: 'A friendly placeholder for lists with nothing in them yet, including a clear next action.',
    height: 390,
    html: `<div class="empty-card">
  <div class="empty-art" aria-hidden="true">
    <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20a4 4 0 0 1 4-4h12l5 6h23a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4Z"></path>
      <path d="M24 40h16M32 32v16"></path>
    </svg>
  </div>

  <h3 id="empty-title">No projects yet</h3>
  <p id="empty-text">Create your first project to see it here. You can always rename or move it later.</p>
  <button class="empty-action" id="empty-action" type="button">New project</button>
</div>`,
    css: `.empty-card {
  display: grid;
  justify-items: center;
  width: min(400px, 100%);
  padding: 34px 28px 30px;
  border: 2px dashed #d3dbe6;
  border-radius: 16px;
  background: #fff;
  text-align: center;
}

.empty-art {
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  margin-bottom: 18px;
  border-radius: 50%;
  background: #edf1f5;
  color: #0a7a75;
}

.empty-card h3 { margin: 0; font-size: 20px; }
.empty-card p {
  max-width: 34ch;
  margin: 8px 0 20px;
  color: #55657c;
  font-size: 14px;
  line-height: 1.55;
}

.empty-action {
  padding: 10px 18px;
  border: 0;
  border-radius: 8px;
  background: #0a7a75;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.empty-action:hover { background: #07605c; }
.empty-action:focus-visible { outline: 3px solid #ffc93c; outline-offset: 2px; }
.empty-action:disabled { background: #edf1f5; color: #55657c; cursor: default; }`,
    js: `const action = document.getElementById('empty-action');
const title = document.getElementById('empty-title');
const text = document.getElementById('empty-text');

action.addEventListener('click', () => {
  title.textContent = 'Your first project is ready';
  text.textContent = 'Open it from the list to start adding pages and components.';
  action.textContent = 'Project created';
  action.disabled = true;
});`
  }
);
