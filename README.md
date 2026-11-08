# UI Snippets

A small site that shows UI components as live previews, with the HTML, CSS and JavaScript source next to each one so people can copy it into their own projects.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## What's included

- 37 components across Buttons, Forms, Cards, Navigation, Content and Feedback, including seven button patterns, seven navigation patterns and three ecommerce card patterns.
- Ecommerce examples: product card with wishlist and size options, sale card and cart line item with quantity and undo.
- Navigation examples: responsive navbar, breadcrumbs, pagination, a scrollspy section menu, a dropdown shop menu, a bottom tab bar and a checkout stepper.
- Live previews in sandboxed iframes, with HTML, CSS and JavaScript tabs.
- Search that matches titles, descriptions, categories and the actual snippet source. Press `/` to jump to the search box.
- A dark theme that follows your system setting until you pick one, then remembers the choice.
- Category deep links such as `#forms`, with working browser back and forward.
- Copy buttons for one language, the full page, or a downloadable standalone `.html` file.

## Project structure

```
ui-snippets/
  index.html        Page shell
  css/style.css     Styles for the site itself
  js/snippets.js    The component library (edit this to add components)
  js/app.js         Gallery, search, previews, copy and download
  assets/           Images used by component previews
  vercel.json       Vercel settings
```

## Run it locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Add a component

Open `js/snippets.js`, copy any entry in `window.UI_SNIPPETS`, and change the fields:

| Field | Meaning |
| --- | --- |
| `id` | Unique, lowercase, no spaces |
| `title` | Heading shown on the page |
| `category` | `Buttons`, `Forms`, `Cards`, `Navigation`, `Content` or `Feedback` |
| `description` | One plain sentence |
| `height` | Preview height in pixels |
| `layout` | `'center'` (default) or `'top'` for full-width bars |
| `html`, `css` | The source shown in the tabs |
| `js` | Optional. Leave as `''` if the component needs no script |

Do not use backticks or `${ }` inside the code strings.

To add a new category, add its name to the `CATEGORIES` list at the top of `js/app.js`.

## Deploy on Vercel

**Option 1: from GitHub**

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New, Project** and import the repository.
3. Leave Framework Preset as **Other**. Leave Build Command and Output Directory empty.
4. Select **Deploy**.

**Option 2: from the command line**

```
npm install -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

Run the commands from inside the `ui-snippets` folder.

## How the previews work

Each preview is an `iframe` built from the component's own HTML, CSS and JavaScript plus a short base reset (shown in the "Base reset" block on the page). The iframe keeps one component's styles and scripts from affecting the others or the site. Relative asset paths resolve from the gallery page; when `index.html` is opened directly from disk, previews enable same-origin so local images such as `assets/Ice-Americano.jpg` can load. The "Copy full page" and "Download .html" buttons produce a complete standalone page from the same pieces, so keep the `assets/` folder next to a downloaded snippet if it uses an image. The site's dark theme does not change the previews, so components always appear on the light stage they were designed for.
