/* ------------------------------------------------------------------
   Content snippets

   Components in this file:
   - tabs: Tabs
   - accordion: Accordion
   - tooltip: Tooltip
   - alert-banner: Alert banner
   - data-table: Data table

   Shared setup and the entry format live in base.js. Add or edit
   entries inside the window.UI_SNIPPETS.push(...) call below.
   ------------------------------------------------------------------ */

window.UI_SNIPPETS = window.UI_SNIPPETS || [];

window.UI_SNIPPETS.push(
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
  }
);
