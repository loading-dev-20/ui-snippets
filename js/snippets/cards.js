/* ------------------------------------------------------------------
   Cards snippets

   Components in this file:
   - profile-card: Profile card
   - pricing-card: Pricing card
   - testimonial-card: Testimonial card
   - blog-card: Blog post card
   - product-card: Product card
   - sale-product-card: Sale product card
   - cart-line-item: Cart line item

   Shared setup and the entry format live in base.js. Add or edit
   entries inside the window.UI_SNIPPETS.push(...) call below.
   ------------------------------------------------------------------ */

window.UI_SNIPPETS = window.UI_SNIPPETS || [];

window.UI_SNIPPETS.push(
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

  {
    id: 'product-card',
    title: 'Product card',
    category: 'Cards',
    description: 'An ecommerce product card with wishlist toggle, size options that update the price, rating and an add-to-bag confirmation.',
    height: 520,
    html: `<article class="product-card" id="product-card">
  <div class="product-media">
    <span class="product-badge">Best seller</span>

    <button class="wish" id="wish" type="button" aria-label="Save Iced Americano to wishlist" aria-pressed="false">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 22l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"></path>
      </svg>
    </button>

    <img class="product-art" src="assets/Ice-Americano.jpg" alt="Iced Americano in a clear cup with ice">
  </div>

  <div class="product-body">
    <h3><a href="#">Iced Americano</a></h3>

    <div class="rating">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="#b77900" aria-hidden="true">
        <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.3l6.5-.9Z"></path>
      </svg>
      <span>4.8</span>
      <span class="rating-count">(126 reviews)</span>
    </div>

    <p class="price"><strong id="product-price" aria-live="polite">$4.50</strong></p>

    <fieldset class="sizes">
      <legend>Size: <span id="size-name">12 oz</span></legend>
      <div class="size-options">
        <label class="size-option">
          <input type="radio" name="drink-size" value="12 oz" data-price="4.50" aria-label="12 ounces" checked>
          <span>12 oz</span>
        </label>
        <label class="size-option">
          <input type="radio" name="drink-size" value="16 oz" data-price="5.25" aria-label="16 ounces">
          <span>16 oz</span>
        </label>
        <label class="size-option">
          <input type="radio" name="drink-size" value="20 oz" data-price="6.00" aria-label="20 ounces">
          <span>20 oz</span>
        </label>
      </div>
    </fieldset>

    <button class="add" id="add" type="button">Add to bag</button>
    <p class="product-status" id="product-status" role="status"></p>
  </div>
</article>`,
    css: `.product-card {
  width: min(300px, 100%);
  overflow: hidden;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
  transition: box-shadow 0.2s, transform 0.2s;
}
.product-card:hover { transform: translateY(-3px); box-shadow: 0 16px 32px rgba(20, 35, 59, 0.12); }

.product-media {
  position: relative;
  display: grid;
  place-items: center;
  height: 210px;
  overflow: hidden;
  background: linear-gradient(135deg, #fbf8f4, #efe5d8);
}

/* The photo has a white studio background; multiply blends it into the warm stage. */
.product-art {
  display: block;
  width: 210px;
  height: 210px;
  object-fit: contain;
  mix-blend-mode: multiply;
  transition: transform 0.25s;
}
.product-card:hover .product-art { transform: translateY(-4px) scale(1.02); }

.product-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 4px 9px;
  border-radius: 999px;
  background: #ffc93c;
  color: #14233b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.wish {
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid #d3dbe6;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #14233b;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.wish:hover { border-color: #b3261e; color: #b3261e; }
.wish[aria-pressed="true"] { border-color: #b3261e; color: #b3261e; }
.wish[aria-pressed="true"] svg { fill: currentColor; }
.wish:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.product-body { padding: 20px; }
.product-card h3 { margin: 0; font-size: 19px; line-height: 1.25; letter-spacing: -0.01em; }
.product-card h3 a { color: #14233b; text-decoration: none; }
.product-card h3 a:hover { color: #0a7a75; text-decoration: underline; text-underline-offset: 3px; }
.product-card h3 a:focus-visible { border-radius: 4px; outline: 3px solid #0a7a75; outline-offset: 2px; }

.rating { display: flex; align-items: center; gap: 5px; margin-top: 8px; color: #55657c; font-size: 13px; }
.rating svg { flex-shrink: 0; }
.rating span:first-of-type { color: #14233b; font-weight: 600; }
.rating-count { color: #55657c; }

.price { margin: 10px 0 0; }
.price strong { font-size: 22px; letter-spacing: -0.01em; }

.sizes { display: grid; gap: 8px; margin: 14px 0 0; padding: 0; border: 0; }
.sizes legend { padding: 0; color: #55657c; font-size: 12px; }
.size-options { display: flex; flex-wrap: wrap; gap: 6px; }
.size-option { position: relative; display: inline-flex; cursor: pointer; }
.size-option input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.size-option span {
  display: block;
  padding: 6px 11px;
  border: 1px solid #d3dbe6;
  border-radius: 8px;
  background: #fff;
  color: #14233b;
  font-size: 12px;
  font-weight: 600;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.size-option:hover span { border-color: #0a7a75; }
.size-option input:checked + span { border-color: #0a7a75; background: #0a7a75; color: #fff; }
.size-option input:focus-visible + span { outline: 3px solid #0a7a75; outline-offset: 2px; }

.add {
  width: 100%;
  margin-top: 16px;
  padding: 11px;
  border: 0;
  border-radius: 9px;
  background: #0a7a75;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.add:hover { background: #07605c; }
.add:active { transform: translateY(1px); }
.add:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }
.add.is-added { background: #07605c; }

.product-status { min-height: 18px; margin: 8px 0 0; color: #07605c; font-size: 12px; font-weight: 600; }

@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-art,
  .wish,
  .add { transition: none; }
  .product-card:hover,
  .product-card:hover .product-art { transform: none; }
}`,
    js: `const wish = document.getElementById('wish');
const add = document.getElementById('add');
const status = document.getElementById('product-status');
const price = document.getElementById('product-price');
const sizeName = document.getElementById('size-name');
const sizes = Array.from(document.querySelectorAll('input[name="drink-size"]'));
let addTimer;

wish.addEventListener('click', () => {
  const saved = wish.getAttribute('aria-pressed') === 'true';
  wish.setAttribute('aria-pressed', String(!saved));
  status.textContent = saved ? 'Removed from wishlist.' : 'Saved to wishlist.';
});

sizes.forEach((input) => {
  input.addEventListener('change', () => {
    sizeName.textContent = input.value;
    price.textContent = '$' + input.dataset.price;
  });
});

add.addEventListener('click', () => {
  clearTimeout(addTimer);
  add.textContent = 'Added to bag';
  add.classList.add('is-added');
  status.textContent = 'Iced Americano added to your bag.';
  addTimer = setTimeout(() => {
    add.textContent = 'Add to bag';
    add.classList.remove('is-added');
  }, 1800);
});`
  },

  {
    id: 'sale-product-card',
    title: 'Sale product card',
    category: 'Cards',
    description: 'A compact ecommerce card with a discount badge, low-stock label, crossed-out price and a quick add-to-bag action.',
    height: 260,
    html: `<article class="deal-card">
  <div class="deal-media">
    <span class="deal-badge">-25%</span>

    <svg class="deal-art" viewBox="0 0 120 160" role="img" aria-label="Insulated trail bottle">
      <rect x="44" y="14" width="32" height="18" rx="6" fill="#14233b"></rect>
      <path d="M40 36h40l5 12v84a14 14 0 0 1-14 14H49a14 14 0 0 1-14-14V48Z" fill="#0a7a75"></path>
      <path d="M40 36h40l5 12H35Z" fill="#07605c"></path>
      <rect x="45" y="64" width="30" height="44" rx="4" fill="#fff" opacity="0.9"></rect>
      <path d="M52 78h16M52 86h16M52 94h10" stroke="#0a7a75" stroke-width="3" stroke-linecap="round"></path>
      <circle cx="60" cy="120" r="3" fill="#fff" opacity="0.55"></circle>
    </svg>
  </div>

  <div class="deal-body">
    <span class="deal-stock">Low stock</span>
    <h3><a href="#">Trail Bottle 750ml</a></h3>

    <div class="deal-rating">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="#b77900" aria-hidden="true">
        <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.3l6.5-.9Z"></path>
      </svg>
      <span>4.6</span>
      <span class="deal-reviews">(89)</span>
    </div>

    <p class="deal-price"><strong>$24</strong> <del>$32</del></p>
    <button class="deal-add" id="deal-add" type="button">Add to bag</button>
    <p class="deal-status" id="deal-status" role="status"></p>
  </div>
</article>`,
    css: `.deal-card {
  display: grid;
  grid-template-columns: 126px minmax(0, 1fr);
  width: min(400px, 100%);
  overflow: hidden;
  border: 1px solid #d3dbe6;
  border-radius: 16px;
  background: #fff;
  transition: box-shadow 0.2s, transform 0.2s;
}
.deal-card:hover { transform: translateY(-3px); box-shadow: 0 16px 32px rgba(20, 35, 59, 0.12); }

.deal-media {
  position: relative;
  display: grid;
  place-items: center;
  padding: 16px;
  background: linear-gradient(160deg, #fff5dc, #fde7b0);
}

.deal-art { width: 82px; height: auto; transition: transform 0.25s; }
.deal-card:hover .deal-art { transform: translateY(-3px) scale(1.03); }

.deal-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #b3261e;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.deal-body { padding: 18px; }
.deal-stock {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 999px;
  background: #fff5dc;
  color: #8a5b00;
  font-size: 11px;
  font-weight: 700;
}

.deal-card h3 { margin: 8px 0 0; font-size: 17px; line-height: 1.3; }
.deal-card h3 a { color: #14233b; text-decoration: none; }
.deal-card h3 a:hover { color: #0a7a75; text-decoration: underline; text-underline-offset: 3px; }
.deal-card h3 a:focus-visible { border-radius: 4px; outline: 3px solid #0a7a75; outline-offset: 2px; }

.deal-rating { display: flex; align-items: center; gap: 4px; margin-top: 6px; color: #55657c; font-size: 12px; }
.deal-rating span:first-of-type { color: #14233b; font-weight: 600; }

.deal-price { display: flex; align-items: baseline; gap: 6px; margin: 8px 0 0; }
.deal-price strong { font-size: 20px; }
.deal-price del { color: #55657c; font-size: 13px; }

.deal-add {
  width: 100%;
  margin-top: 12px;
  padding: 9px 12px;
  border: 0;
  border-radius: 8px;
  background: #0a7a75;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.deal-add:hover { background: #07605c; }
.deal-add:active { transform: translateY(1px); }
.deal-add:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }
.deal-add.is-added { background: #07605c; }

.deal-status { min-height: 18px; margin: 6px 0 0; color: #07605c; font-size: 12px; font-weight: 600; }

@media (max-width: 360px) {
  .deal-card { grid-template-columns: 108px minmax(0, 1fr); }
  .deal-body { padding: 14px; }
}

@media (prefers-reduced-motion: reduce) {
  .deal-card,
  .deal-art,
  .deal-add { transition: none; }
  .deal-card:hover,
  .deal-card:hover .deal-art { transform: none; }
}`,
    js: `const dealAdd = document.getElementById('deal-add');
const dealStatus = document.getElementById('deal-status');
let dealTimer;

dealAdd.addEventListener('click', () => {
  clearTimeout(dealTimer);
  dealAdd.textContent = 'Added to bag';
  dealAdd.classList.add('is-added');
  dealStatus.textContent = 'Trail Bottle added to your bag.';
  dealTimer = setTimeout(() => {
    dealAdd.textContent = 'Add to bag';
    dealAdd.classList.remove('is-added');
  }, 1800);
});`
  },

  {
    id: 'cart-line-item',
    title: 'Cart line item',
    category: 'Cards',
    description: 'A cart row with a quantity stepper, live line total, remove action and an undo state.',
    height: 240,
    html: `<div class="cart-demo">
  <article class="cart-item" id="cart-item">
    <div class="cart-media">
      <svg viewBox="0 0 120 140" role="img" aria-label="Natural canvas tote bag">
        <path d="M28 42h64l8 84H20Z" fill="#e8dcc8" stroke="#14233b" stroke-width="4" stroke-linejoin="round"></path>
        <path d="M44 42V30a16 16 0 0 1 32 0v12" fill="none" stroke="#14233b" stroke-width="6" stroke-linecap="round"></path>
        <rect x="42" y="70" width="36" height="24" rx="4" fill="#fff" opacity="0.7"></rect>
        <path d="M50 82h20" stroke="#0a7a75" stroke-width="4" stroke-linecap="round"></path>
      </svg>
    </div>

    <div class="cart-body">
      <div class="cart-top">
        <div>
          <h3><a href="#">Canvas Tote Bag</a></h3>
          <p class="cart-variant">Natural / One size</p>
        </div>
        <button class="cart-remove" id="cart-remove" type="button" aria-label="Remove Canvas Tote Bag from bag">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13h10l1-13"></path>
          </svg>
        </button>
      </div>

      <div class="cart-bottom">
        <div class="qty" role="group" aria-label="Quantity">
          <button class="qty-btn" id="qty-minus" type="button" aria-label="Decrease quantity">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M3 8h10"></path>
            </svg>
          </button>
          <span class="qty-value" id="qty-value" aria-live="polite">1</span>
          <button class="qty-btn" id="qty-plus" type="button" aria-label="Increase quantity">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M8 3v10M3 8h10"></path>
            </svg>
          </button>
        </div>

        <p class="cart-price"><strong id="line-total">$28.00</strong><span>$28 each</span></p>
      </div>
    </div>
  </article>

  <div class="cart-empty" id="cart-empty" hidden>
    <p id="cart-status" role="status">Canvas Tote Bag removed from your bag.</p>
    <button class="cart-undo" id="cart-undo" type="button">Undo</button>
  </div>
</div>`,
    css: `.cart-demo { display: grid; justify-items: center; gap: 12px; width: 100%; }

.cart-item {
  display: flex;
  gap: 14px;
  width: min(420px, 100%);
  padding: 14px;
  border: 1px solid #d3dbe6;
  border-radius: 14px;
  background: #fff;
}
.cart-item[hidden],
.cart-empty[hidden] { display: none; }

.cart-media {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 92px;
  height: 92px;
  border-radius: 12px;
  background: #f7f9fb;
}
.cart-media svg { width: 72px; height: auto; }

.cart-body { flex: 1; min-width: 0; }
.cart-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.cart-top h3 { margin: 0; font-size: 16px; line-height: 1.3; }
.cart-top h3 a { color: #14233b; text-decoration: none; }
.cart-top h3 a:hover { color: #0a7a75; text-decoration: underline; text-underline-offset: 3px; }
.cart-top h3 a:focus-visible { border-radius: 4px; outline: 3px solid #0a7a75; outline-offset: 2px; }

.cart-variant { margin: 3px 0 0; color: #55657c; font-size: 12px; }

.cart-remove {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #55657c;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.cart-remove:hover { background: #fdeceb; color: #b3261e; }
.cart-remove:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

.cart-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.qty {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid #d3dbe6;
  border-radius: 9px;
  background: #fff;
}
.qty-btn {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #14233b;
  cursor: pointer;
}
.qty-btn:hover:not(:disabled) { background: #edf1f5; }
.qty-btn:disabled { color: #a9b6c7; cursor: not-allowed; }
.qty-btn:focus-visible { outline: 2px solid #0a7a75; outline-offset: -2px; }

.qty-value {
  min-width: 28px;
  color: #14233b;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.cart-price { display: grid; gap: 1px; margin: 0; text-align: right; }
.cart-price strong { font-size: 16px; line-height: 1.2; font-variant-numeric: tabular-nums; }
.cart-price span { color: #55657c; font-size: 12px; }

.cart-empty {
  display: grid;
  justify-items: center;
  gap: 10px;
  width: min(420px, 100%);
  padding: 22px;
  border: 1.5px dashed #d3dbe6;
  border-radius: 14px;
  text-align: center;
}
.cart-empty p { margin: 0; color: #55657c; font-size: 14px; }

.cart-undo {
  padding: 8px 14px;
  border: 1.5px solid #0a7a75;
  border-radius: 999px;
  background: #fff;
  color: #0a7a75;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.cart-undo:hover { background: #ecfdf5; }
.cart-undo:focus-visible { outline: 3px solid #0a7a75; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .cart-remove,
  .cart-undo { transition: none; }
}`,
    js: `const item = document.getElementById('cart-item');
const empty = document.getElementById('cart-empty');
const remove = document.getElementById('cart-remove');
const undo = document.getElementById('cart-undo');
const minus = document.getElementById('qty-minus');
const plus = document.getElementById('qty-plus');
const qtyValue = document.getElementById('qty-value');
const total = document.getElementById('line-total');
const unit = 28;
let qty = 1;

function renderQty() {
  qtyValue.textContent = String(qty);
  total.textContent = '$' + (qty * unit).toFixed(2);
  minus.disabled = qty === 1;
  plus.disabled = qty === 9;
}

minus.addEventListener('click', () => {
  if (qty > 1) {
    qty--;
    renderQty();
  }
});

plus.addEventListener('click', () => {
  if (qty < 9) {
    qty++;
    renderQty();
  }
});

remove.addEventListener('click', () => {
  item.hidden = true;
  empty.hidden = false;
  undo.focus();
});

undo.addEventListener('click', () => {
  empty.hidden = true;
  item.hidden = false;
  remove.focus();
});

renderQty();`
  }
);
