# Agent Engineering & Design Playbook

> **Audience:** All AI coding and design agents working on Jatin Bhatt's projects (Claude, Codex, Antigravity, Grok, etc.).
> **Origin:** Battle-tested mistakes, root causes, design & engineering principles, and mandatory pre-ship verification distilled from building **Atlas of Lives** (`jatinbhatt.me/vault/atlas-of-lives/`), **The Product YouTube** (`product.jatinbhatt.me`), and the **Weekend Vault** suite.
> **Companion Docs:** [AGENTS.md](./AGENTS.md) · [DESIGN_BENCHMARK.md](./DESIGN_BENCHMARK.md)

---

## 1. Mistakes Made & Permanent Fixes (Do Not Repeat)

### A. Visual Craft, Icons & Anti-AI-Slop

| # | What Went Wrong | Root Cause | Permanent Rule |
| :-: | :--- | :--- | :--- |
| 1 | **Ugly blue iOS emoji `▶️` appeared on iPhone** even though macOS Chrome looked fine. | Unicode symbols like `▶` (`U+25B6`), `⏸`, `▾`, `❦`, `◆`, `✓`, `✕` are hijacked by iOS **Apple Color Emoji** when rendered as text. | **Never use Unicode characters for UI icons or ornaments.** Render all icons as crisp inline `<svg fill="currentColor">` and set `font-variant-emoji: text;` on `body`. Run a Unicode glyph audit across every `.html`/`.js`/`.css` file before shipping. |
| 2 | **First drafts looked generic / "AI-generated" and cluttered.** | Boxed gray fact callouts, markdown left-border quote bars (`border-left: 2px solid`), white bordered SaaS card prisons with inner footer dividers, header stat counters (`366 videos`), secondary meta links crowding top bars, and vanity scores (`98% distinct`). | Treat phenomenal visual authorship as the #1 north star. Use frameless editorial plates or unboxed marginalia, strip vanity metrics and header bloat, and never ship raw algorithmic fallback strings (e.g., raw NLP bigrams like `"Tech Every · Every Must"`) into the UI. |
| 3 | **Reused the dark historic serif theme on a modern product tool.** | Copied the dark obsidian/sepia/serif benchmark blindly onto a modern video & study app. | **Carry forward the craft discipline (restraint, zero slop, tactile hierarchy), NOT a single cloned theme.** Match the aesthetic to the soul of the product (e.g., dark archival monograph for historical atlases vs. frameless daylight Swiss/Braun studio `#F4F2EC` + carbon ink + signal vermilion for modern tools). Always snapshot the prior UI (`fallback-vN/`) before major redesigns. |
| 4 | **Jarring focus rings on clicked pins/buttons and double focus boxes on search inputs.** | Default `:focus` outlines on clicked SVG/buttons; applying `:focus-visible` outline to an `<input>` inside a container that already shows `:focus-within`. | Suppress click focus outlines (`button:focus:not(:focus-visible), svg *:focus { outline: none; }`), blur on pointer click, reserve `:focus-visible` for keyboard navigation, and suppress inner input outlines when the outer input wrapper handles `:focus-within`. |
| 5 | **Apocryphal / cinema quotes crept into historical drafts.** | Relying on memory produced viral internet paraphrases or film lines instead of archival sources. | Every quotation must trace to a verified primary source (letter, treatise, inscription, decree, or dated contemporary account) with explicit provenance. |

### B. Mobile-First Ergonomics & Layout Integrity

| # | What Went Wrong | Root Cause | Permanent Rule |
| :-: | :--- | :--- | :--- |
| 6 | **Desktop-first layouts broke on portrait phones (`390×844` / `375×667`).** | Wrapping 4-row topic lists ate `187px` of mobile screens; desktop modals (`padding: 20px`) cramped video players into tiny boxes with multi-line wrapped headers; hover tooltips stole first taps; Safari URL-bar shifts triggered map rebuilds; `height: 100%` clipped behind iOS browser chrome. | **Design mobile-first from line 1.** Use `100dvh` + `viewport-fit=cover` + `env(safe-area-inset-*)`; convert multi-row filter lists into single-row horizontal swipe rails (and hide them during active search); open mobile detail/theater views as edge-to-edge native sheets (`100dvh` or `72dvh` bottom sheet) with single-line headers; disable hover tooltips on `(hover: none), (pointer: coarse)`; hide desktop-only hints (`/` kbd tags, redundant search bars in secondary modes); ignore resize height deltas `< 95px`. |
| 7 | **Horizontal swipe strips silently zoomed out the entire mobile viewport (`innerWidth` jumped from `390` → `910`).** | `flex-wrap: nowrap` children inside flex/grid parents lacked `min-width: 0; max-width: 100%` and `html, body` lacked `overflow-x: clip`, expanding intrinsic page width past `390px` so mobile Chrome zoomed out. | Always set `overflow-x: clip` on `html, body` and `min-width: 0; max-width: 100%` on every flex/grid ancestor of a horizontal scroll strip. Assert **`window.innerWidth === viewport.width`** AND **`scrollWidth <= innerWidth`** in automated mobile tests. |
| 8 | **Proportional timeline bar collapsed to `14px` and clipped text on mobile.** | Switching a flex container with inline `flex: <pct> 1 0` to `flex-direction: column` gave every item `flex-basis: 0` vertically. | Never flip a weighted `flex-basis: 0` horizontal bar into `flex-direction: column`. Keep proportional bars horizontal with compact mobile typography and clean `min-width`. |
| 9 | **Mobile inputs triggered iOS Safari auto-zoom.** | `<input>` font sizes `< 16px` (`13px`/`14px`) cause iOS Safari to zoom in on tap. | Set `font-size: 16px` minimum on **every** mobile text/search/number `<input>`, and give interactive controls `>= 36–44px` comfortable touch heights. |
| 10 | **Headless Chrome `--window-size=390,844 --screenshot` produced cropped false positives on macOS.** | macOS enforces a ~500px minimum browser window width, rendering a 500px layout and cropping it to 390px. | **Always test mobile via Playwright (`is_mobile=True, has_touch=True, device_scale_factor=2`) or Chrome DevTools Protocol (CDP) `Emulation.setDeviceMetricsOverride`** at both `390×844` and `375×667`, and visually inspect every rendered screenshot. |

### C. Interaction, Search, Data & Backend Architecture

| # | What Went Wrong | Root Cause | Permanent Rule |
| :-: | :--- | :--- | :--- |
| 11 | **Map pins refused to open on click; overlapping pins & silent missing country fills.** | Re-appending SVG `<g>` on `mouseenter` detached nodes between `mousedown` and `mouseup`; D3 zoom intercepted clicks; same-city stages collided; country name typos failed silently. | Never mutate/reorder SVG DOM on hover; exclude pins in `d3.zoom().filter()`; use `subStages` for shared cities; validate every country key against bundled TopoJSON and verify pairwise pixel spacing on desktop and mobile. |
| 12 | **Curated domain search leaked distractions (`csat` returned UPSC exam & math videos).** | Falling back to raw open YouTube search without an intent gate or domain boundary check; single ambiguous words (`product`, `strategy`, `roadmap`, `csat`) collide across domains. | Enforce a **two-stage distraction gate**: (1) upfront **Intent Gate** (hard blocklist + fast LLM classifier) blocking off-domain queries *before* calling external APIs and disambiguating acronyms (`csat` → Customer Satisfaction Score, `api` → API Product Management); (2) **Result Gatekeeper** requiring verified channels OR multi-word domain signals + quality floors (`>= 3 min`, `>= 85%` approval, no summary/bootcamp mills). |
| 13 | **Substring & sponsor-ad false positives polluted search (`upsc` matched `startupschool.org`; `api` matched podcast sponsor reads).** | Raw `LIKE '%term%'` matched substrings inside URLs and 1-word throwaway mentions inside *"Brought to you by..."* sponsor tails. | Strip URLs and sponsor/boilerplate tails before matching; require full word boundaries on short acronyms (`<= 4` chars, allowing plural `s`); require a match in primary metadata (title, creator, topic, concepts) OR `>= 2` mentions in the core synopsis. |
| 14 | **Multi-video marathon player did not autoplay into the next video.** | Swapping plain `<iframe src=".../embed/...">` cannot detect when a video finishes. | Always use the **YouTube IFrame Player API** (`YT.Player`), listen for `YT.PlayerState.ENDED` (`0`) to advance automatically until the final item completes, auto-skip on embed `onError`, and render a clean completion state. |
| 15 | **Cloudflare Workers AI model call silently fell back; Cloudflare DNS import proxied Hostinger email records.** | Used an unavailable Workers AI model slug and assumed `out.response` was always a string (Cloudflare returns parsed objects on structured JSON responses); Cloudflare's auto-imported DNS set `proxied: true` on Hostinger DKIM/autoconfig CNAMEs. | Verify Workers AI model IDs via `/ai/models/search` and handle both object and string `out.response`; use `keep_bindings: ["secret_text"]` when updating Workers with secrets; before switching nameservers to Cloudflare, verify ALL email records (`MX`, `SPF`, `DMARC`, `DKIM _domainkey`, `autoconfig`, `autodiscover`) are **`proxied: false` (DNS-only)** and set SSL/TLS mode to **`Full`** (never `Flexible`) when fronting GitHub Pages to avoid redirect loops. |

---

## 2. Core Design & Engineering Principles

1. **Authored Artifact Over Generated Template:** Every project must feel intentionally designed—a museum monograph, print specimen, or Braun/Swiss instrument—never a generic SaaS dashboard, bordered card grid, or AI boilerplate.
2. **Match Aesthetic to the Medium:** Reuse craft standards (restraint, typography, zero slop), not a single template. Dark candlelit serif folios suit historical/cultural subjects; frameless daylight Swiss modernism suits modern study/productivity tools.
3. **Mobile-First, Native Feel:** Assume mobile is the primary surface. Single-row swipe rails, full-width segmented controls, edge-to-edge `100dvh` sheets/theaters, `>= 16px` inputs, safe-area insets, and immediate first-tap response are non-negotiable.
4. **Clarity First, Depth on Demand:** Open on one calm, immediately scannable primary frame. Eliminate redundant tabs (e.g., unify Feed + global Command Search) and strip header bloat (`video counts`, secondary links, decorative badges).
5. **Hybrid Edge Architecture for Dynamic Apps (`$0/month`):** For tools that need live search, databases, AI gating, secrets, or scheduled refreshes under `jatinbhatt.me`, prefer **Cloudflare Workers + D1 + KV + Workers AI + Cron** (same-origin at `<app>.jatinbhatt.me` or `jatinbhatt.me/<app>/`, zero cold starts, zero credit card). For pure editorial/static artifacts, keep zero-dependency self-contained static HTML/CSS/JS.
6. **Protect Backups & Ship Safely:** Snapshot working versions (`fallback-vN/`) before major redesigns. Never break existing email (`hello@jatinbhatt.me`) or live routes when touching DNS or Workers.
7. **Verified Substance Only:** Real data, verified primary sources, strict domain boundaries, and zero fabricated metrics or placeholder filler.

---

## 3. Mandatory Pre-Ship Checklist for All Agents

Run through every applicable section **before** telling the user a build is ready or pushing to production:

### A. Visual Craft & Anti-AI-Slop
- [ ] Zero boxed gray callout cards, zero markdown left-border quote bars, zero bordered SaaS card prisons around media thumbnails.
- [ ] Zero generic defaults (`Inter` / `Roboto` / `Space Grotesk`), zero glassmorphism blurs, zero neon glows, zero pulsing rings, zero header stat/utility clutter.
- [ ] Zero raw algorithmic fallback strings (`"Tech Every · Every Must"`) or fake vanity scores exposed in UI.
- [ ] Zero browser blue/red click focus rings or double-bordered input focus states (`:focus-visible` cleanly styled for keyboard only).
- [ ] **Zero Unicode icon/ornament glyphs** (`▶`, `⏸`, `◀`, `▾`, `❦`, `◆`, `✓`, `✕`, `★`, emojis) anywhere in HTML, JS, or CSS — **100% inline `<svg fill="currentColor">`** + `font-variant-emoji: text;` on `body`.

### B. Mobile-First & Native Polish (`390×844` & `375×667`)
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">` + safe-area inset padding (`env(safe-area-inset-*)`).
- [ ] `overflow-x: clip` on `html, body` and `min-width: 0; max-width: 100%` on all flex/grid containers holding horizontal scroll rails.
- [ ] Every mobile `<input>` has `font-size >= 16px` (zero iOS Safari auto-zoom).
- [ ] Multi-item filter lists use single-row horizontal swipe rails (not multi-row walls) and step aside during active search.
- [ ] Mobile detail/player views open as native full-bleed sheets (`100dvh` or `72dvh` bottom sheet) with clean single-line headers, `36–44px+` touch targets, and no nested scroll traps.
- [ ] Desktop-only hints (`/` shortcut badges, hover tooltips, redundant search bars in secondary modes) hidden on touch/mobile.

### C. Functionality, Data & Domain Integrity
- [ ] All JS files pass syntax check (`node --check`) with `0` errors.
- [ ] Curated search strips URLs & sponsor tails, enforces word boundaries on short acronyms (`<= 4` chars), and blocks off-domain distractions upfront (verified with intentional distraction test queries).
- [ ] Media playlists/marathons use `YT.Player` IFrame API for real continuous autoplay through the final video + `onError` auto-skip.
- [ ] Cartographic builds validate 100% of country keys against bundled TopoJSON and verify pairwise marker spacing on desktop and mobile.

### D. Cloudflare, DNS & Deployment Safety
- [ ] When updating Workers with secrets, preserve secrets via `keep_bindings: ["secret_text"]` and verify live `/api/stats` after deploy.
- [ ] Temporary bootstrap/upload Workers are deleted immediately after asset/D1 upload; production Workers reject `PUT`/`DELETE` (`405`).
- [ ] Before any DNS/nameserver change: verify all email records (`MX`, `SPF`, `DMARC`, `DKIM`, `autoconfig`, `autodiscover`) are `proxied: false` (DNS-only) and SSL/TLS is **`Full`** (never `Flexible`) for GitHub Pages origins.

### E. Automated Real-Browser Verification Before Reporting Done
- [ ] Verified in real headless Chrome via Playwright (`is_mobile=True, has_touch=True, device_scale_factor=2`) at **`390×844`** and **`375×667`** across **every primary user flow**:
  - `window.innerWidth === viewport.width` (no silent mobile zoom-out)
  - `scrollWidth <= innerWidth` (`0` horizontal overflow)
  - `0` console / page runtime errors
  - Every modal/sheet open, navigate, and close interaction succeeds via real tap/click
- [ ] Visually inspected rendered mobile screenshots of every screen before declaring done.
- [ ] Updated site-level links/counts (`index.html`, `vault.html`, `sitemap.xml`) when shipping to `jatinbhatt.me`.
