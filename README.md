# jatinbhatt personal site

Static HTML, CSS and vanilla JS. No build step, no dependencies, no analytics, fonts self-hosted.

## Run locally
    cd site && python3 -m http.server 8000   # then open http://localhost:8000

## Deploy
- Live at https://jatinbhatt.me (apex). www.jatinbhatt.me and creator-at-work.github.io redirect to it. HTTPS is enforced.
- Hosting: GitHub Pages, repo `creator-at-work/creator-at-work.github.io`, branch `main`, root, with a `.nojekyll` file. The `CNAME` file in this folder holds `jatinbhatt.me`; keep it, or Pages drops the custom domain.
- To publish: in the deploy clone, delete everything except `.git`, copy the contents of `site/` in, touch `.nojekyll`, commit and push.
- DNS (Hostinger): A records for `@` to 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; CNAME `www` to `creator-at-work.github.io`. The MX (mx1/mx2.hostinger.com), SPF and DKIM records are for the business email hello@jatinbhatt.me; leave them alone.
- Netlify / Vercel also work: no build command, `site` as the output directory.

## SEO
- Each page has a title with the full name, a meta description, a canonical URL on https://jatinbhatt.me/, Open Graph and Twitter card tags.
- Share image: `assets/og.png` (1200x630, the name and the ring).
- Home has JSON-LD (WebSite and Person). `sitemap.xml` lists all seven pages; `robots.txt` points to it. Add new pages to both.

## Pages
- `index.html`: who Jatin is. Product-first hero, how I'm wired, three of the seven rules, off the clock (a small bookshelf, watching, practising), work in one line, now.
- `work.html`: the Miracle of Mind case (problem, what changed, result), six notebook entries (anchors like `work.html#n05`) and the record.
- `miracle-of-mind.html`: the full case study.
- `practice.html`: Hatha Yoga, iResetLife, 1,750 dots.
- `principles.html`: all seven rules.
- `shelf.html`: the full bookshelf. Stillness keeps the books in the order he remembered them; Signal sorts them into threads with counts and shows a threads chart. Linked from the footer, the mobile menu and the home shelf.
- `contact.html`: now, email, LinkedIn. Contact is also in every footer.
Nothing to download (the PDF and its links were removed 2026-10-08): the site is a quiet place that's his own. Keep it that way.
All links are relative, so the site works from a zip, from `file://`, on GitHub Pages and on Vercel or Netlify.
Header, footer, the breathing dialog and the "ads" joke are repeated in each page; edit all seven if you change them.
Books are generated from the `BOOKS` list in `build/shelf.py` in the source project (title, author, thread). The spines, captions and threads chart are plain HTML in `index.html` and `shelf.html`, so a new book can also be added by copying one `<li class="book">` by hand.

## How it works
- One breath cycle is 10 seconds (4s in, 6s out). The ring, the section waves and the mode dot share it (`--breath` in styles.css).
- Two modes: Stillness (default) and Signal. Signal shows the data layer (`.sig` elements): bases, cohorts and method notes. On the home page the ring becomes a five-year timeline (building outside, practice inside) and short "receipts" appear under claims; on the case page it becomes the 69% to 80% activation gauge. The choice is remembered in localStorage across pages.
- The footer breath count runs from when the visitor opened the site in this tab (sessionStorage), across pages.
- Keys: `S` toggles the mode, `B` opens a three-breath exercise (tapping the ring does the same on phones), typing `ads` shows a small joke.
- `prefers-reduced-motion` stops all motion; the content is identical.

## Adding a portrait
Search index.html for `PORTRAIT SLOT`. Put a square photo at `assets/portrait.jpg` and replace the `portrait-slot` div with the `<img class="portrait">` line from the comment. It sits inside the ring.

## Editing copy
All copy is in index.html. House rules: no em dashes, no emoji, numbers instead of adjectives.
