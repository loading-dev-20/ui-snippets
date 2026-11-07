/* ------------------------------------------------------------------
   Snippet library

   Each entry in UI_SNIPPETS has this shape:
   {
     id:          unique, lowercase, no spaces
     title:       shown as the heading
     category:    one of: Buttons, Forms, Cards, Navigation, Content, Feedback
     description: one plain sentence
     height:      preview height in pixels
     layout:      'center' (default) or 'top'
     html, css:   the source shown in the HTML and CSS tabs
     js:          optional, shown in the JavaScript tab
   }

   To add a component, copy an entry, change the fields and save.
   Do not use backticks or ${ } inside the code strings.
   ------------------------------------------------------------------ */

window.UI_BASE_CSS = `*,
*::before,
*::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: #14233b;
}

button,
input,
textarea { font: inherit; }`;

window.UI_SNIPPETS = [
  /* ------------------------------ Buttons ------------------------------ */
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
.btn:focus-visible { outline: 3px solid #ffc93c; outline-offset: 2px; }

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

  /* ------------------------------- Forms ------------------------------- */
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
  },

  /* ------------------------------- Cards ------------------------------- */
  {
    id: 'profile-card',
    title: 'Profile card',
    category: 'Cards',
    description: 'A profile summary with stats and a follow button that updates the follower count.',
    height: 400,
    html: `<article class="profile">
  <div class="avatar" aria-hidden="true">DC</div>
  <h3>Dara Chan</h3>
  <p class="role">Front-end developer</p>

  <dl class="stats">
    <div><dt>Projects</dt><dd>42</dd></div>
    <div><dt>Followers</dt><dd id="followers">1,280</dd></div>
    <div><dt>Following</dt><dd>180</dd></div>
  </dl>

  <button class="follow" id="follow" type="button" aria-pressed="false">Follow</button>
</article>`,
    css: `.profile {
  width: 300px;
  padding: 28px 24px 24px;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
  text-align: center;
}

.avatar {
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: #14233b;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
}

.profile h3 { margin: 0; font-size: 22px; }
.role { margin: 2px 0 0; color: #55657c; }

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 22px 0;
  padding: 14px 0;
  border-block: 1px solid #e3e9f0;
}
.stats dt { color: #55657c; font-size: 13px; }
.stats dd { margin: 2px 0 0; font-size: 18px; font-weight: 700; }

.follow {
  width: 100%;
  padding: 11px;
  border: 2px solid #0a7a75;
  border-radius: 10px;
  background: #0a7a75;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.follow:hover { background: #07605c; border-color: #07605c; }
.follow[aria-pressed="true"] { background: transparent; color: #0a7a75; }
.follow:focus-visible { outline: 3px solid #ffc93c; outline-offset: 2px; }`,
    js: `const follow = document.getElementById('follow');
const followers = document.getElementById('followers');
let count = 1280;

follow.addEventListener('click', () => {
  const following = follow.getAttribute('aria-pressed') === 'true';
  follow.setAttribute('aria-pressed', String(!following));
  follow.textContent = following ? 'Follow' : 'Following';
  count += following ? -1 : 1;
  followers.textContent = count.toLocaleString('en-US');
});`
  },

  {
    id: 'pricing-card',
    title: 'Pricing card',
    category: 'Cards',
    description: 'A plan card with a monthly and yearly switch that changes the price.',
    height: 480,
    html: `<section class="plan" aria-labelledby="plan-name">
  <div class="period" role="group" aria-label="Billing period">
    <button type="button" data-period="monthly" aria-pressed="true">Monthly</button>
    <button type="button" data-period="yearly" aria-pressed="false">Yearly</button>
  </div>

  <h3 id="plan-name">Starter</h3>
  <p class="price"><span id="amount">$12</span><span class="per" id="per">per month</span></p>
  <p class="note" id="note">Billed monthly. Cancel any time.</p>

  <ul class="features">
    <li>5 projects</li>
    <li>10 GB storage</li>
    <li>Email support</li>
  </ul>

  <a class="cta" href="#">Start free trial</a>
</section>`,
    css: `.plan {
  width: 300px;
  padding: 24px;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
}

.period {
  display: flex;
  margin-bottom: 20px;
  padding: 3px;
  border-radius: 10px;
  background: #edf1f5;
}
.period button {
  flex: 1;
  padding: 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #55657c;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.period button[aria-pressed="true"] { background: #fff; color: #14233b; box-shadow: 0 1px 3px rgba(20, 35, 59, 0.15); }
.period button:focus-visible { outline: 3px solid #ffc93c; }

.plan h3 { margin: 0; font-size: 20px; }

.price { margin: 8px 0 0; }
.price #amount { font-size: 44px; font-weight: 800; letter-spacing: -0.02em; }
.per { margin-left: 6px; color: #55657c; }
.note { margin: 4px 0 20px; color: #55657c; font-size: 14px; }

.features { margin: 0 0 24px; padding: 0; list-style: none; }
.features li { position: relative; padding: 6px 0 6px 26px; }
.features li::before {
  content: "";
  position: absolute;
  top: 9px;
  left: 6px;
  width: 6px;
  height: 11px;
  border: solid #0a7a75;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.cta {
  display: block;
  padding: 12px;
  border-radius: 10px;
  background: #0a7a75;
  color: #fff;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
}
.cta:hover { background: #07605c; }
.cta:focus-visible { outline: 3px solid #ffc93c; outline-offset: 2px; }`,
    js: `const prices = {
  monthly: { amount: '$12', per: 'per month', note: 'Billed monthly. Cancel any time.' },
  yearly: { amount: '$9', per: 'per month', note: 'Billed as $108 once a year.' }
};

const buttons = document.querySelectorAll('.period button');
const amount = document.getElementById('amount');
const per = document.getElementById('per');
const note = document.getElementById('note');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const plan = prices[button.dataset.period];
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    amount.textContent = plan.amount;
    per.textContent = plan.per;
    note.textContent = plan.note;
  });
});`
  },

  {
    id: 'testimonial-card',
    title: 'Testimonial card',
    category: 'Cards',
    description: 'A customer quote with a five star rating, avatar and attribution line.',
    height: 380,
    html: `<figure class="quote-card">
  <div class="quote-stars" role="img" aria-label="Rated 5 out of 5">
    <span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
  </div>

  <blockquote>
    <p>We shipped a new settings page in two days. The components handled the details so our team could focus on the product.</p>
  </blockquote>

  <figcaption>
    <span class="quote-avatar" aria-hidden="true">MR</span>
    <span class="quote-person">
      <strong>Maya Rivera</strong>
      <small>Design lead at Northwind</small>
    </span>
  </figcaption>
</figure>`,
    css: `.quote-card {
  position: relative;
  width: min(360px, 100%);
  margin: 0;
  padding: 30px 26px 24px;
  overflow: hidden;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
}

/* Decorative quote mark */
.quote-card::before {
  content: "“";
  position: absolute;
  top: -18px;
  right: 18px;
  color: #edf1f5;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 110px;
  line-height: 1;
  pointer-events: none;
}

.quote-stars {
  color: #d99a00;
  font-size: 15px;
  letter-spacing: 2px;
}

blockquote { position: relative; margin: 14px 0 22px; }
blockquote p { margin: 0; font-size: 17px; line-height: 1.55; }

figcaption {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 18px;
  border-top: 1px solid #e3e9f0;
}

.quote-avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #14233b;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.quote-person { display: grid; }
.quote-person strong { font-size: 14px; }
.quote-person small { color: #55657c; font-size: 13px; }`,
    js: ''
  },

  {
    id: 'blog-card',
    title: 'Blog post card',
    category: 'Cards',
    description: 'An article teaser with a CSS-only cover image, category label, excerpt and reading time.',
    height: 460,
    html: `<article class="post-card">
  <div class="post-cover" aria-hidden="true">
    <span class="post-cover-tag">CSS</span>
    <span class="post-cover-shape"></span>
  </div>

  <div class="post-body">
    <p class="post-kicker">Tutorial</p>
    <h3><a href="#">Build a responsive card grid</a></h3>
    <p class="post-excerpt">A practical walkthrough of auto-fit, minmax and container queries, with a layout that holds up from phones to wide screens.</p>
    <div class="post-meta">
      <time datetime="2026-03-12">Mar 12, 2026</time>
      <span aria-hidden="true">&middot;</span>
      <span>6 min read</span>
    </div>
  </div>
</article>`,
    css: `.post-card {
  width: min(360px, 100%);
  overflow: hidden;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
}

/* Cover made from gradients and shapes, no image file needed */
.post-cover {
  position: relative;
  height: 150px;
  overflow: hidden;
  background: linear-gradient(135deg, #0a7a75, #14233b);
}
.post-cover::before,
.post-cover::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}
.post-cover::before {
  top: -50px;
  right: -30px;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.16);
}
.post-cover::after {
  bottom: -40px;
  left: 24px;
  width: 90px;
  height: 90px;
  background: rgba(255, 201, 60, 0.35);
}

.post-cover-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 1;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #14233b;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.post-cover-shape {
  position: absolute;
  right: 36px;
  bottom: -26px;
  z-index: 1;
  width: 110px;
  height: 110px;
  border: 12px solid rgba(255, 255, 255, 0.22);
  border-radius: 24px;
  transform: rotate(18deg);
}

.post-body { padding: 20px; }

.post-kicker {
  margin: 0;
  color: #0a7a75;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.post-card h3 { margin: 6px 0 8px; font-size: 20px; line-height: 1.3; }
.post-card h3 a { color: #14233b; text-decoration: none; }
.post-card h3 a:hover { color: #0a7a75; text-decoration: underline; text-underline-offset: 3px; }
.post-card h3 a:focus-visible { border-radius: 4px; outline: 3px solid #ffc93c; outline-offset: 2px; }

.post-excerpt { margin: 0 0 16px; color: #55657c; font-size: 14px; line-height: 1.55; }

.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: #55657c;
  font-size: 13px;
}`,
    js: ''
  },

  /* ----------------------------- Navigation ---------------------------- */
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

  /* ------------------------------ Content ------------------------------ */
  {
    id: 'tabs',
    title: 'Tabs',
    category: 'Content',
    description: 'Keyboard-friendly tabs. Use the arrow keys, Home and End to move between them.',
    height: 280,
    html: `<div class="tabs">
  <div class="tab-list" role="tablist" aria-label="Course details">
    <button role="tab" id="tab-overview" aria-controls="panel-overview" aria-selected="true" tabindex="0">Overview</button>
    <button role="tab" id="tab-syllabus" aria-controls="panel-syllabus" aria-selected="false" tabindex="-1">Syllabus</button>
    <button role="tab" id="tab-reviews" aria-controls="panel-reviews" aria-selected="false" tabindex="-1">Reviews</button>
  </div>

  <div class="tab-panel" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
    <p>Learn to build responsive pages with HTML, CSS and JavaScript. No experience needed.</p>
  </div>
  <div class="tab-panel" id="panel-syllabus" role="tabpanel" aria-labelledby="tab-syllabus" hidden>
    <p>Eight weeks: page structure, styling, layout, forms, scripting, and a final project.</p>
  </div>
  <div class="tab-panel" id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" hidden>
    <p>Rated 4.8 out of 5 by 312 students.</p>
  </div>
</div>`,
    css: `.tabs { width: min(460px, 100%); }

.tab-list { display: flex; gap: 4px; border-bottom: 2px solid #d3dbe6; }

.tab-list button {
  margin-bottom: -2px;
  padding: 10px 16px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #55657c;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.tab-list button:hover { color: #14233b; }
.tab-list button[aria-selected="true"] { border-bottom-color: #0a7a75; color: #0a7a75; }
.tab-list button:focus-visible { outline: 3px solid #0a7a75; outline-offset: -3px; }

.tab-panel { padding: 20px 4px; line-height: 1.6; }
.tab-panel[hidden] { display: none; }`,
    js: `const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

function activate(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  });
  tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activate(tab));

  tab.addEventListener('keydown', (event) => {
    let target = null;
    if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') target = tabs[0];
    if (event.key === 'End') target = tabs[tabs.length - 1];
    if (target) {
      event.preventDefault();
      activate(target);
    }
  });
});`
  },

  {
    id: 'accordion',
    title: 'Accordion',
    category: 'Content',
    description: 'Expandable questions built on the native details element. No JavaScript needed.',
    height: 360,
    html: `<div class="accordion">
  <details name="faq" open>
    <summary>Do I need to install anything?</summary>
    <p>No. Everything runs in the browser, so a text editor is all you need.</p>
  </details>
  <details name="faq">
    <summary>Can I use these in a commercial project?</summary>
    <p>Yes. Copy, change and ship them however you like.</p>
  </details>
  <details name="faq">
    <summary>Does it work on phones?</summary>
    <p>Yes. The layout adapts to any screen width.</p>
  </details>
</div>`,
    css: `.accordion { width: min(460px, 100%); border: 1px solid #d3dbe6; border-radius: 12px; background: #fff; overflow: hidden; }

.accordion details + details { border-top: 1px solid #d3dbe6; }

.accordion summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}
.accordion summary::-webkit-details-marker { display: none; }
.accordion summary:hover { background: #f5f8fb; }
.accordion summary:focus-visible { outline: 3px solid #0a7a75; outline-offset: -3px; }

/* Plus icon that turns into a minus when open */
.accordion summary::after {
  content: "";
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  background:
    linear-gradient(#14233b, #14233b) center / 100% 2px no-repeat,
    linear-gradient(#14233b, #14233b) center / 2px 100% no-repeat;
}
.accordion details[open] summary::after {
  background: linear-gradient(#14233b, #14233b) center / 100% 2px no-repeat;
}

.accordion p { margin: 0; padding: 0 18px 18px; color: #55657c; line-height: 1.6; }`,
    js: ''
  },

  {
    id: 'tooltip',
    title: 'Tooltip',
    category: 'Content',
    description: 'Small labels that appear above or below a control on hover and keyboard focus, with no JavaScript.',
    height: 230,
    html: `<div class="tooltip-demo">
  <div class="tooltip-row">
    <span class="tip">
      <button class="tip-trigger" type="button" aria-describedby="tip-copy">Copy link</button>
      <span class="tip-bubble" role="tooltip" id="tip-copy">Copy a shareable link</span>
    </span>

    <span class="tip tip--bottom">
      <button class="tip-trigger" type="button" aria-describedby="tip-archive">Archive</button>
      <span class="tip-bubble" role="tooltip" id="tip-archive">Move this item to the archive</span>
    </span>
  </div>

  <p class="tooltip-note">Hover a button, or reach it with the Tab key.</p>
</div>`,
    css: `.tooltip-demo { display: grid; justify-items: center; gap: 20px; }

.tooltip-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding-top: 12px;
}

.tip { position: relative; display: inline-flex; }

.tip-trigger {
  padding: 10px 16px;
  border: 1.5px solid #b6c2d1;
  border-radius: 8px;
  background: #fff;
  color: #14233b;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.tip-trigger:hover { border-color: #0a7a75; }
.tip-trigger:focus-visible { outline: 3px solid #ffc93c; outline-offset: 2px; }

.tip-bubble {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  padding: 7px 11px;
  border-radius: 8px;
  background: #14233b;
  color: #fff;
  font-size: 13px;
  line-height: 1.4;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s, transform 0.15s;
}
.tip-bubble::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border: 5px solid transparent;
  border-top-color: #14233b;
}

.tip:hover .tip-bubble,
.tip:focus-within .tip-bubble { opacity: 1; transform: translate(-50%, 0); }

/* Variant that opens below the trigger */
.tip--bottom .tip-bubble { top: calc(100% + 10px); bottom: auto; transform: translate(-50%, -4px); }
.tip--bottom .tip-bubble::after {
  top: auto;
  bottom: 100%;
  border-top-color: transparent;
  border-bottom-color: #14233b;
}
.tip--bottom:hover .tip-bubble,
.tip--bottom:focus-within .tip-bubble { transform: translate(-50%, 0); }

.tooltip-note { margin: 0; color: #55657c; font-size: 13px; }

@media (prefers-reduced-motion: reduce) {
  .tip-bubble { transition: none; }
}`,
    js: ''
  },

  {
    id: 'alert-banner',
    title: 'Alert banner',
    category: 'Content',
    description: 'Info, success and error banners with icons and dismiss buttons that remove the message.',
    height: 360,
    html: `<div class="alerts">
  <div class="alert alert-info">
    <svg class="alert-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 11v5M12 8h.01"></path>
    </svg>
    <div class="alert-body">
      <strong>Trial ends in 3 days</strong>
      <p>Add a payment method to keep your projects online.</p>
    </div>
    <button class="alert-close" type="button" aria-label="Dismiss trial notice">&times;</button>
  </div>

  <div class="alert alert-success">
    <svg class="alert-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="m8 12 3 3 5-6"></path>
    </svg>
    <div class="alert-body">
      <strong>Changes saved</strong>
      <p>Your publishing settings are up to date.</p>
    </div>
    <button class="alert-close" type="button" aria-label="Dismiss saved notice">&times;</button>
  </div>

  <div class="alert alert-danger">
    <svg class="alert-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3 2.8 20h18.4L12 3Z"></path>
      <path d="M12 9v4M12 17h.01"></path>
    </svg>
    <div class="alert-body">
      <strong>Payment failed</strong>
      <p>We could not charge the card ending in 4242.</p>
    </div>
    <button class="alert-close" type="button" aria-label="Dismiss payment notice">&times;</button>
  </div>
</div>`,
    css: `.alerts { display: grid; gap: 12px; width: min(460px, 100%); }

.alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 14px 14px 16px;
  border: 1px solid #d3dbe6;
  border-left-width: 4px;
  border-radius: 10px;
  background: #fff;
}

.alert-info { border-left-color: #3b82f6; background: #eff6ff; }
.alert-success { border-left-color: #0a7a75; background: #ecfdf5; }
.alert-danger { border-left-color: #b3261e; background: #fef2f2; }

.alert-icon { flex-shrink: 0; margin-top: 1px; }
.alert-info .alert-icon { color: #2563eb; }
.alert-success .alert-icon { color: #0a7a75; }
.alert-danger .alert-icon { color: #b3261e; }

.alert-body { flex: 1; }
.alert-body strong { display: block; font-size: 14px; }
.alert-body p { margin: 2px 0 0; color: #55657c; font-size: 13px; line-height: 1.45; }

.alert-close {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #55657c;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.alert-close:hover { background: rgba(20, 35, 59, 0.08); color: #14233b; }
.alert-close:focus-visible { outline: 3px solid #ffc93c; outline-offset: 1px; }`,
    js: `document.querySelectorAll('.alert-close').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.alert').remove();
  });
});`
  },

  {
    id: 'data-table',
    title: 'Data table',
    category: 'Content',
    description: 'A compact invoice table with a caption, row headers, aligned numbers and status badges.',
    height: 400,
    html: `<div class="table-wrap" role="region" aria-labelledby="invoices-caption" tabindex="0">
  <table>
    <caption id="invoices-caption">Recent invoices</caption>
    <thead>
      <tr>
        <th scope="col">Invoice</th>
        <th scope="col">Client</th>
        <th scope="col">Date</th>
        <th scope="col" class="num">Amount</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">INV-1042</th>
        <td>Acme Studio</td>
        <td>Mar 4, 2026</td>
        <td class="num">$1,240.00</td>
        <td><span class="badge badge-paid">Paid</span></td>
      </tr>
      <tr>
        <th scope="row">INV-1041</th>
        <td>Northwind Labs</td>
        <td>Mar 3, 2026</td>
        <td class="num">$860.00</td>
        <td><span class="badge badge-pending">Pending</span></td>
      </tr>
      <tr>
        <th scope="row">INV-1040</th>
        <td>Dara Chan</td>
        <td>Feb 28, 2026</td>
        <td class="num">$2,100.00</td>
        <td><span class="badge badge-paid">Paid</span></td>
      </tr>
      <tr>
        <th scope="row">INV-1039</th>
        <td>Pine and Co</td>
        <td>Feb 26, 2026</td>
        <td class="num">$415.00</td>
        <td><span class="badge badge-overdue">Overdue</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
    css: `.table-wrap {
  width: min(560px, 100%);
  overflow-x: auto;
  border: 1px solid #d3dbe6;
  border-radius: 12px;
  background: #fff;
}
.table-wrap:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

table {
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  font-size: 14px;
}

caption {
  padding: 16px 18px 12px;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
}

th,
td {
  padding: 11px 18px;
  text-align: left;
  white-space: nowrap;
}

thead th {
  border-block: 1px solid #d3dbe6;
  background: #f7f9fb;
  color: #55657c;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

tbody tr + tr { border-top: 1px solid #e3e9f0; }
tbody tr:hover { background: #f7f9fb; }
tbody th { font-weight: 600; }
tbody td { color: #55657c; }

.num { text-align: right; font-variant-numeric: tabular-nums; }
tbody .num { color: #14233b; font-weight: 600; }

.badge {
  display: inline-block;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}
.badge-paid { background: #e6f7f3; color: #07605c; }
.badge-pending { background: #fff5dc; color: #8a5b00; }
.badge-overdue { background: #fdeceb; color: #b3261e; }`,
    js: ''
  },

  /* ----------------------------- Feedback ------------------------------ */
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
];
