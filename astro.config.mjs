import { defineConfig } from 'astro/config';

// Every page is built to plain HTML at deploy time; no client framework.
export default defineConfig({
  site: 'https://dhanawada.org',
  // about.astro → about.html, served at /about (vercel.json has cleanUrls)
  build: { format: 'file' },
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  // Code blocks use the site's own plain styling (see .prose-note in global.css), in both themes
  markdown: { syntaxHighlight: false },
});
