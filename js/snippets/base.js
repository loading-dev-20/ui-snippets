/* ------------------------------------------------------------------
   Snippet library: shared setup

   Every snippet entry has this shape:
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

   Snippets are split by category:
   buttons.js, forms.js, cards.js, navigation.js, content.js, feedback.js

   To add a component, copy an entry in its category file, change the
   fields, and save. Do not use backticks or ${ } inside the code strings.
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

window.UI_SNIPPETS = window.UI_SNIPPETS || [];
