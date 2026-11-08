/* ------------------------------------------------------------------
   Forms snippets

   Components in this file:
   - toggle-switch: Toggle switch
   - floating-label-input: Floating label input
   - search-field: Search field
   - choice-controls: Checkbox and radio group
   - select-menu: Select menu
   - login-form: Login form with validation

   Shared setup and the entry format live in base.js. Add or edit
   entries inside the window.UI_SNIPPETS.push(...) call below.
   ------------------------------------------------------------------ */

window.UI_SNIPPETS = window.UI_SNIPPETS || [];

window.UI_SNIPPETS.push(
  {
    id: 'toggle-switch',
    title: 'Toggle switch',
    category: 'Forms',
    description: 'An on/off switch built on a real checkbox, so it works with a keyboard and a screen reader.',
    height: 150,
    html: `<label class="switch">
  <input class="switch-input" type="checkbox" id="notify" checked>
  <span class="switch-track"><span class="switch-thumb"></span></span>
  <span class="switch-text">Email notifications are <strong id="notify-state">on</strong></span>
</label>`,
    css: `.switch {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;
}

/* Hide the checkbox visually but keep it focusable */
.switch-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.switch-track {
  position: relative;
  flex-shrink: 0;
  width: 52px;
  height: 30px;
  border-radius: 999px;
  background: #7b8ba1;
  transition: background 0.2s;
}

.switch-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}

.switch-input:checked + .switch-track { background: #0a7a75; }
.switch-input:checked + .switch-track .switch-thumb { transform: translateX(22px); }
.switch-input:focus-visible + .switch-track { outline: 3px solid #ffc93c; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .switch-track,
  .switch-thumb { transition: none; }
}`,
    js: `const notify = document.getElementById('notify');
const state = document.getElementById('notify-state');

notify.addEventListener('change', () => {
  state.textContent = notify.checked ? 'on' : 'off';
});`
  },

  {
    id: 'floating-label-input',
    title: 'Floating label input',
    category: 'Forms',
    description: 'Labels that sit inside the field and move up when someone starts typing. CSS only.',
    height: 260,
    html: `<form class="fields">
  <div class="field">
    <input id="full-name" type="text" placeholder=" " autocomplete="name">
    <label for="full-name">Full name</label>
  </div>
  <div class="field">
    <input id="work-email" type="email" placeholder=" " autocomplete="email">
    <label for="work-email">Email address</label>
  </div>
</form>`,
    css: `.fields {
  display: grid;
  gap: 16px;
  width: min(340px, 100%);
}

.field { position: relative; }

.field input {
  width: 100%;
  padding: 24px 14px 8px;
  border: 2px solid #b6c2d1;
  border-radius: 10px;
  background: #fff;
  color: #14233b;
  font-size: 16px;
}

.field input:focus {
  border-color: #0a7a75;
  outline: 3px solid rgba(10, 122, 117, 0.25);
  outline-offset: 0;
}

.field label {
  position: absolute;
  top: 17px;
  left: 16px;
  color: #55657c;
  pointer-events: none;
  transition: top 0.15s, font-size 0.15s, color 0.15s;
}

/* The empty placeholder (a single space) lets CSS tell if the field has text */
.field input:focus + label,
.field input:not(:placeholder-shown) + label {
  top: 7px;
  font-size: 12px;
  color: #0a7a75;
}`,
    js: ''
  },

  {
    id: 'search-field',
    title: 'Search field',
    category: 'Forms',
    description: 'A roomy search input with an icon and a slash shortcut, plus a live hint as you type.',
    height: 200,
    html: `<form class="search-demo" role="search">
  <label class="search-label" for="docs-search">Search the docs</label>

  <div class="search-box">
    <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"></circle>
      <path d="m20 20-3.5-3.5"></path>
    </svg>
    <input id="docs-search" type="search" placeholder="Search components, tokens, guides" autocomplete="off">
    <kbd class="search-key" aria-hidden="true">/</kbd>
  </div>

  <p class="search-hint" id="search-hint">Press / to focus the field from anywhere.</p>
</form>`,
    css: `.search-demo { width: min(420px, 100%); }

.search-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
}

.search-box { position: relative; display: flex; align-items: center; }

.search-box input {
  width: 100%;
  height: 50px;
  padding: 0 48px 0 44px;
  border: 2px solid #b6c2d1;
  border-radius: 12px;
  background: #fff;
  color: #14233b;
  font-size: 16px;
}
.search-box input::placeholder { color: #6b7b91; }
.search-box input:focus {
  border-color: #0a7a75;
  outline: 3px solid rgba(10, 122, 117, 0.25);
  outline-offset: 0;
}

.search-icon {
  position: absolute;
  left: 15px;
  color: #55657c;
  pointer-events: none;
}

.search-key {
  position: absolute;
  right: 12px;
  padding: 2px 7px;
  border: 1px solid #d3dbe6;
  border-bottom-width: 2px;
  border-radius: 6px;
  background: #edf1f5;
  color: #55657c;
  font: 600 12px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.search-hint { margin: 10px 0 0; color: #55657c; font-size: 13px; }`,
    js: `const input = document.getElementById('docs-search');
const hint = document.getElementById('search-hint');
const idle = 'Press / to focus the field from anywhere.';

document.addEventListener('keydown', (event) => {
  if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
  if (document.activeElement === input) return;
  event.preventDefault();
  input.focus();
});

input.addEventListener('input', () => {
  const value = input.value.trim();
  hint.textContent = value ? 'Filtering for "' + value + '". Press Escape to clear.' : idle;
});

input.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  input.value = '';
  hint.textContent = idle;
});`
  },

  {
    id: 'choice-controls',
    title: 'Checkbox and radio group',
    category: 'Forms',
    description: 'Custom checkboxes and radios built on native inputs, with full keyboard and screen reader support.',
    height: 420,
    html: `<form class="choices">
  <fieldset class="group">
    <legend>Email notifications</legend>

    <label class="choice">
      <input type="checkbox" name="updates" checked>
      <span class="control" aria-hidden="true"></span>
      <span class="choice-text">
        <strong>Product updates</strong>
        <small>Release notes and new features.</small>
      </span>
    </label>

    <label class="choice">
      <input type="checkbox" name="digest">
      <span class="control" aria-hidden="true"></span>
      <span class="choice-text">
        <strong>Weekly digest</strong>
        <small>A short summary every Friday.</small>
      </span>
    </label>
  </fieldset>

  <fieldset class="group">
    <legend>Default plan</legend>

    <label class="choice">
      <input type="radio" name="plan" value="starter" checked>
      <span class="control" aria-hidden="true"></span>
      <span class="choice-text">
        <strong>Starter</strong>
        <small>For personal projects.</small>
      </span>
    </label>

    <label class="choice">
      <input type="radio" name="plan" value="team">
      <span class="control" aria-hidden="true"></span>
      <span class="choice-text">
        <strong>Team</strong>
        <small>Shared projects and billing.</small>
      </span>
    </label>
  </fieldset>
</form>`,
    css: `.choices { display: grid; gap: 22px; width: min(400px, 100%); }

.group {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: 0;
}
.group legend {
  margin-bottom: 4px;
  padding: 0;
  color: #55657c;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.choice {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid #d3dbe6;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.choice:hover { border-color: #b6c2d1; background: #f7f9fb; }

.choice input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.control {
  position: relative;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  border: 2px solid #b6c2d1;
  border-radius: 6px;
  background: #fff;
  transition: border-color 0.15s, background 0.15s;
}
.choice input[type="radio"] + .control { border-radius: 50%; }

.choice input:checked + .control { border-color: #0a7a75; background: #0a7a75; }

.choice input[type="checkbox"]:checked + .control::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 0;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.choice input[type="radio"]:checked + .control::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: #fff;
}

.choice input:focus-visible + .control { outline: 3px solid #ffc93c; outline-offset: 2px; }

.choice-text { display: grid; gap: 1px; }
.choice-text strong { font-size: 15px; }
.choice-text small { color: #55657c; font-size: 13px; line-height: 1.45; }`,
    js: ''
  },

  {
    id: 'select-menu',
    title: 'Select menu',
    category: 'Forms',
    description: 'A styled native select with a custom arrow. The hint below updates when the choice changes.',
    height: 210,
    html: `<div class="select-demo">
  <label class="select-label" for="team-size">How big is your team?</label>

  <div class="select-wrap">
    <select id="team-size">
      <option value="" selected>Choose a range</option>
      <option value="1-10">1-10 people</option>
      <option value="11-50">11-50 people</option>
      <option value="51-200">51-200 people</option>
      <option value="200+">More than 200 people</option>
    </select>
    <svg class="select-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  </div>

  <p class="select-hint" id="select-hint">We use this to estimate your monthly price.</p>
</div>`,
    css: `.select-demo { width: min(360px, 100%); }

.select-label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600; }

.select-wrap { position: relative; }

.select-wrap select {
  width: 100%;
  height: 48px;
  padding: 0 44px 0 14px;
  border: 2px solid #b6c2d1;
  border-radius: 10px;
  background: #fff;
  color: #14233b;
  font-size: 16px;
  cursor: pointer;
  appearance: none;
}
.select-wrap select:focus {
  border-color: #0a7a75;
  outline: 3px solid rgba(10, 122, 117, 0.25);
  outline-offset: 0;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 14px;
  color: #55657c;
  transform: translateY(-50%);
  pointer-events: none;
}

.select-hint { margin: 10px 0 0; color: #55657c; font-size: 13px; }`,
    js: `const select = document.getElementById('team-size');
const hint = document.getElementById('select-hint');

select.addEventListener('change', () => {
  hint.textContent = select.value
    ? 'Great, we will size the plan for ' + select.value + ' people. You can change this later.'
    : 'We use this to estimate your monthly price.';
});`
  },

  {
    id: 'login-form',
    title: 'Login form with validation',
    category: 'Forms',
    description: 'A sign-in form with inline error messages and a show or hide password button.',
    height: 470,
    html: `<form class="login" id="login" novalidate>
  <h3>Sign in</h3>

  <div class="field">
    <label for="email">Email</label>
    <input id="email" type="email" required autocomplete="email" aria-describedby="email-hint">
    <p class="hint" id="email-hint"></p>
  </div>

  <div class="field">
    <label for="password">Password</label>
    <div class="pw-wrap">
      <input id="password" type="password" required autocomplete="current-password" aria-describedby="password-hint">
      <button class="pw-toggle" id="toggle-pw" type="button" aria-pressed="false">Show</button>
    </div>
    <p class="hint" id="password-hint"></p>
  </div>

  <button class="submit" type="submit">Sign in</button>
  <p class="status" id="status" role="status"></p>
</form>`,
    css: `.login {
  width: min(340px, 100%);
  padding: 28px;
  border: 1px solid #d3dbe6;
  border-radius: 14px;
  background: #fff;
}

.login h3 { margin: 0 0 20px; font-size: 22px; }

.field { margin-bottom: 6px; }
.field label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 600; }

.field input {
  width: 100%;
  padding: 11px 12px;
  border: 2px solid #b6c2d1;
  border-radius: 8px;
  font-size: 16px;
}
.field input:focus { border-color: #0a7a75; outline: 3px solid rgba(10, 122, 117, 0.25); outline-offset: 0; }
.field input[aria-invalid="true"] { border-color: #b3261e; }

.hint { min-height: 20px; margin: 6px 0 0; color: #b3261e; font-size: 13px; }

.pw-wrap { position: relative; }
.pw-wrap input { padding-right: 64px; }
.pw-toggle {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  padding: 4px 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #0a7a75;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.pw-toggle:focus-visible { outline: 3px solid #ffc93c; }

.submit {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border: 0;
  border-radius: 8px;
  background: #0a7a75;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
.submit:hover { background: #07605c; }
.submit:focus-visible { outline: 3px solid #ffc93c; outline-offset: 2px; }

.status { min-height: 20px; margin: 12px 0 0; color: #0a7a75; font-size: 14px; font-weight: 600; }`,
    js: `const form = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');
const togglePw = document.getElementById('toggle-pw');
const status = document.getElementById('status');

function setError(input, message) {
  document.getElementById(input.id + '-hint').textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

togglePw.addEventListener('click', () => {
  const show = password.type === 'password';
  password.type = show ? 'text' : 'password';
  togglePw.textContent = show ? 'Hide' : 'Show';
  togglePw.setAttribute('aria-pressed', String(show));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  let valid = true;

  if (email.validity.valueMissing) {
    setError(email, 'Enter your email address.');
    valid = false;
  } else if (email.validity.typeMismatch) {
    setError(email, 'Enter an email like name@example.com.');
    valid = false;
  } else {
    setError(email, '');
  }

  if (password.value.length < 8) {
    setError(password, 'Use at least 8 characters.');
    valid = false;
  } else {
    setError(password, '');
  }

  if (valid) {
    // Send the form data to your server here
    status.textContent = 'Signed in.';
  }
});`
  }
);
