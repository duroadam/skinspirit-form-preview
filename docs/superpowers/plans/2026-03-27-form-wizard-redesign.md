# SkinSpirit Form Wizard Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing form-preview.html into a polished step-by-step wizard with progress bar, animations, dynamic pricing, modal support, and summary — deployable via WPCode.

**Architecture:** Single HTML file (`forms/form-wizard.html`) containing all CSS + JS inline. The form is a 5-step wizard controlled by JS state. Prices fetched from a WP REST API endpoint (separate PHP snippet). Two display modes: inline embed and modal overlay, sharing the same form code.

**Tech Stack:** Vanilla HTML/CSS/JS (no frameworks), Google Fonts (Oswald + Playfair Display), WPCode for WP deployment, PHP for REST endpoint.

---

## File Structure

| File | Responsibility |
|------|---------------|
| `forms/form-wizard.html` | Complete wizard form — HTML structure, CSS styles, JS logic. Standalone preview file. |
| `forms/ss logo.png` | Logo asset (already exists) |
| `forms/wp-pricing-api.php` | PHP snippet for WP REST API endpoint (copy-paste into WPCode) |

---

### Task 1: HTML Skeleton — Header, Progress Bar, Step Containers

**Files:**
- Create: `forms/form-wizard.html`

This task creates the base HTML file with the document head, fonts, header (logo + title), progress bar markup, 5 empty step containers, and navigation buttons (Back/Next). No CSS yet, no step content yet — just structure.

- [ ] **Step 1: Create the base HTML skeleton**

```html
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SkinSpirit — Konzultáció</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Playfair+Display:wght@500;800&display=swap" rel="stylesheet" />
  <style>
    /* CSS will be added in Task 2 */
  </style>
</head>
<body>

<div id="ss-form-root">
  <div class="ss-wizard">

    <!-- HEADER -->
    <div class="ss-header">
      <img src="ss%20logo.png" alt="SkinSpirit" class="ss-logo" />
      <h1 class="ss-title">Ismerd meg a számodra ideális kezelést</h1>
      <p class="ss-subtitle">2 perc, és kiderül melyik megoldás illik hozzád</p>
    </div>

    <!-- PROGRESS BAR -->
    <div class="ss-progress">
      <div class="ss-progress-track">
        <div class="ss-progress-dot completed" data-step="0"><span class="ss-dot-check">✓</span></div>
        <div class="ss-progress-line"><div class="ss-progress-fill" id="ss-progress-fill"></div></div>
        <div class="ss-progress-dot" data-step="1"></div>
        <div class="ss-progress-line"><div class="ss-progress-fill"></div></div>
        <div class="ss-progress-dot" data-step="2"></div>
        <div class="ss-progress-line"><div class="ss-progress-fill"></div></div>
        <div class="ss-progress-dot" data-step="3"></div>
        <div class="ss-progress-line"><div class="ss-progress-fill"></div></div>
        <div class="ss-progress-dot" data-step="4"></div>
      </div>
      <p class="ss-progress-label" id="ss-progress-label">1/5 — Bőrtípus</p>
    </div>

    <!-- FORM -->
    <form id="ss-form" autocomplete="on" onsubmit="return false;">

      <!-- STEP 1: Bőrtípus & Szőrszín -->
      <div class="ss-step active" data-step="0" id="step-0">
        <!-- Content added in Task 3 -->
      </div>

      <!-- STEP 2: Személyes adatok -->
      <div class="ss-step" data-step="1" id="step-1">
        <!-- Content added in Task 4 -->
      </div>

      <!-- STEP 3: Kérdések -->
      <div class="ss-step" data-step="2" id="step-2">
        <!-- Content added in Task 5 -->
      </div>

      <!-- STEP 4: Kezelés választó -->
      <div class="ss-step" data-step="3" id="step-3">
        <!-- Content added in Task 6 -->
      </div>

      <!-- STEP 5: Időpont & Összegző & Küldés -->
      <div class="ss-step" data-step="4" id="step-4">
        <!-- Content added in Task 7 -->
      </div>

    </form>

    <!-- NAVIGATION -->
    <div class="ss-nav">
      <button type="button" class="ss-nav-back" id="ss-back" style="visibility:hidden;">← Vissza</button>
      <button type="button" class="ss-nav-next" id="ss-next" disabled>Tovább →</button>
    </div>

  </div>
</div>

<!-- MODAL OVERLAY (hidden by default) -->
<div class="ss-modal-backdrop" id="ss-modal-backdrop" style="display:none;">
  <div class="ss-modal-close" id="ss-modal-close">✕</div>
</div>

<script>
  // JS will be added in subsequent tasks
</script>
</body>
</html>
```

- [ ] **Step 2: Open in browser to verify structure renders**

Open `forms/form-wizard.html` in browser. Expect: white page with logo path broken (expected — local file), title text visible, 5 dots, Back/Tovább buttons visible but unstyled. No errors in console.

- [ ] **Step 3: Commit**

```bash
git add forms/form-wizard.html
git commit -m "feat: form wizard HTML skeleton with header, progress bar, step containers"
```

---

### Task 2: Core CSS — Layout, Progress Bar, Cards, Navigation, Animations

**Files:**
- Modify: `forms/form-wizard.html` (add CSS inside `<style>` tag)

Add all core CSS: base styles, wizard layout, progress bar, card styling, navigation buttons, step transition animations, and responsive breakpoints. This reuses the design tokens from form-preview.html.

- [ ] **Step 1: Add all core CSS inside the `<style>` tag**

Replace the `/* CSS will be added in Task 2 */` comment with:

```css
*, *::before, *::after { box-sizing: border-box; }

/* ── BASE ── */
#ss-form-root { font-family: 'Oswald', sans-serif; background: #EBE6DC; margin: 0; padding: 24px 16px 60px; color: #685736; }
.ss-wizard { max-width: 640px; margin: 0 auto; }

/* ── HEADER ── */
.ss-header { text-align: center; margin-bottom: 20px; }
.ss-logo { height: 48px; margin-bottom: 14px; }
.ss-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 800; margin: 0 0 4px; color: #685736; line-height: 1.3; }
.ss-subtitle { font-size: .88rem; color: #978A73; margin: 0; }

/* ── PROGRESS BAR ── */
.ss-progress { margin-bottom: 22px; }
.ss-progress-track { display: flex; align-items: center; gap: 0; padding: 0 8px; }
.ss-progress-dot {
  width: 28px; height: 28px; border-radius: 50%; border: 2px solid #EBE6DC;
  background: #f7f4ee; display: flex; align-items: center; justify-content: center;
  font-size: .65rem; color: #978A73; flex-shrink: 0; transition: all .3s ease;
  position: relative;
}
.ss-progress-dot.active { border-color: #bb9f6d; background: #bb9f6d; color: #fff; }
.ss-progress-dot.completed { border-color: #bb9f6d; background: #fff; color: #bb9f6d; }
.ss-dot-check { display: none; font-size: .7rem; }
.ss-progress-dot.completed .ss-dot-check { display: block; }
.ss-progress-line { flex: 1; height: 2px; background: #EBE6DC; position: relative; overflow: hidden; }
.ss-progress-fill { height: 100%; width: 0; background: #bb9f6d; transition: width .4s ease; border-radius: 1px; }
.ss-progress-label { text-align: center; font-size: .78rem; color: #978A73; margin: 8px 0 0; font-weight: 500; }

/* ── CARD (each step) ── */
.ss-step { display: none; }
.ss-step.active { display: block; animation: ssSlideIn .3s ease; }
.ss-step.slide-out { animation: ssSlideOut .3s ease forwards; }
.ss-card { background: #fff; border-radius: 8px; padding: 24px; margin-bottom: 14px; border: 1px solid #EBE6DC; }
.ss-card-label { font-size: .67rem; font-weight: 500; text-transform: uppercase; letter-spacing: .1em; color: #978A73; margin: 0 0 16px; }
.ss-divider { border: none; border-top: 1px solid #EBE6DC; margin: 22px 0; }
.ss-section-title { font-size: 1rem; font-weight: 500; color: #685736; margin: 0 0 3px; }
.ss-section-sub { font-size: .82rem; color: #978A73; margin: 0 0 14px; }

/* ── FORM FIELDS ── */
.ss-field-group { margin-bottom: 18px; }
.ss-field-group:last-child { margin-bottom: 0; }
.ss-field-label { display: block; font-size: .87rem; font-weight: 400; color: #685736; margin-bottom: 7px; }
.ss-field-label small { font-weight: 400; color: #978A73; }
.ss-field-input {
  width: 100%; padding: 10px 13px; border: 1.5px solid #EBE6DC; border-radius: 6px;
  font-size: .92rem; color: #685736; outline: none; transition: border-color .15s;
  font-family: 'Oswald', sans-serif; background: #fff;
}
.ss-field-input:focus { border-color: #bb9f6d; }
.ss-name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

/* ── RADIO PILLS ── */
.ss-radio-group { display: flex; flex-wrap: wrap; gap: 7px; }
.ss-radio-pill { display: none; }
.ss-radio-pill + label {
  display: inline-flex; align-items: center; padding: 7px 15px;
  border: 1.5px solid #EBE6DC; border-radius: 20px; font-size: .87rem;
  font-weight: 500; cursor: pointer; color: #685736; transition: all .15s; user-select: none;
}
.ss-radio-pill:checked + label { background: #627476; color: #fff; border-color: #627476; }
.ss-radio-pill + label:hover { border-color: #bb9f6d; }

/* ── TONE TILES (Fitzpatrick + Hair) ── */
.ss-tone-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 14px; }
.ss-tone-radio { display: none; }
.ss-tone-tile {
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  padding: 10px 4px; border: 2px solid #EBE6DC; border-radius: 8px;
  cursor: pointer; text-align: center; background: #f7f4ee;
  transition: all .15s; user-select: none;
}
.ss-tone-tile:hover { border-color: #bb9f6d; background: #fff; transform: translateY(-1px); }
.ss-tone-radio:checked + .ss-tone-tile { border-color: #bb9f6d; background: #fff; box-shadow: 0 0 0 1px #8B7346; transform: scale(1.02); }
.ss-tone-circle { width: 38px; height: 38px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.07); flex-shrink: 0; }
.ss-tone-main { font-size: .73rem; font-weight: 500; color: #685736; line-height: 1.2; }

/* ── TONE RESULT CARD ── */
.ss-tone-result {
  display: flex; align-items: flex-start; gap: 14px; background: #f7f4ee;
  border: 1px solid #EBE6DC; border-radius: 8px; padding: 14px 16px;
  margin-top: 0; animation: ssFadeIn .2s ease;
}
.ss-res-circle { width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0; border: 2px solid rgba(0,0,0,0.07); }
.ss-hair-swatch { width: 40px; height: 40px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.07); }
.ss-res-type { font-size: .72rem; text-transform: uppercase; letter-spacing: .06em; color: #bb9f6d; margin: 0 0 2px; font-weight: 500; }
.ss-res-desc { font-size: .93rem; font-weight: 500; color: #685736; margin: 0 0 6px; }
.ss-res-proto { font-size: .85rem; color: #575757; margin: 0; line-height: 1.5; }

/* ── COMPATIBILITY BOX ── */
.ss-compat-placeholder { margin-top: 18px; padding: 14px 16px; background: #f7f4ee; border-radius: 8px; font-size: .84rem; color: #978A73; text-align: center; }
.ss-compat-box {
  margin-top: 18px; padding: 14px 18px; border-radius: 8px;
  display: flex; align-items: center; gap: 13px; border: 1.5px solid; transition: all .3s;
}
.ss-compat-box.ok      { background: #f0fdf4; border-color: #86efac; }
.ss-compat-box.consult { background: #fffbeb; border-color: #fcd34d; }
.ss-compat-box.special { background: #fff7ed; border-color: #fdba74; }
.ss-compat-box.notok   { background: #fff5f5; border-color: #fca5a5; }
.ss-compat-icon {
  width: 34px; height: 34px; border-radius: 50%; display: flex;
  align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;
}
.ss-compat-box.ok      .ss-compat-icon { background: #dcfce7; }
.ss-compat-box.consult .ss-compat-icon { background: #fef9c3; }
.ss-compat-box.special .ss-compat-icon { background: #ffedd5; }
.ss-compat-box.notok   .ss-compat-icon { background: #fee2e2; }
.ss-compat-status { font-size: .9rem; font-weight: 500; color: #685736; margin: 0 0 2px; }
.ss-compat-detail { font-size: .82rem; color: #575757; margin: 0; line-height: 1.4; }
.ss-compat-link { display: inline-block; margin-top: 8px; font-size: .84rem; color: #bb9f6d; font-weight: 500; cursor: pointer; text-decoration: underline; }

/* ── SESSION TOGGLE ── */
.ss-session-toggle { display: inline-flex; background: #EBE6DC; border-radius: 8px; padding: 3px; gap: 2px; }
.ss-sess-btn {
  border: none; background: transparent; border-radius: 6px; padding: 7px 18px;
  font-size: .87rem; font-weight: 600; cursor: pointer; color: #978A73;
  transition: all .15s; font-family: 'Oswald', sans-serif;
}
.ss-sess-btn.active { background: #627476; color: #fff; }

/* ── PACKAGE CARDS ── */
.ss-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
.ss-pkg-check { display: none; }
.ss-pkg-check + .ss-pkg-lbl {
  display: flex; flex-direction: column; height: 100%; border: 2px solid #EBE6DC;
  border-radius: 8px; padding: 13px 11px; cursor: pointer; transition: all .15s;
  background: #f7f4ee; user-select: none; position: relative;
}
.ss-pkg-check:checked + .ss-pkg-lbl { border-color: #bb9f6d; background: #fff; box-shadow: 0 0 0 1px #8B7346; }
.ss-pkg-lbl:hover { border-color: #bb9f6d; background: #fff; }
.ss-pkg-checkmark {
  position: absolute; top: 9px; right: 9px; width: 17px; height: 17px;
  border-radius: 50%; border: 1.5px solid #EBE6DC; transition: all .15s;
}
.ss-pkg-check:checked + .ss-pkg-lbl .ss-pkg-checkmark { background: #bb9f6d; border-color: #8B7346; }
.ss-pkg-check:checked + .ss-pkg-lbl .ss-pkg-checkmark::after { content: '✓'; color: #fff; font-size: .6rem; display: flex; align-items: center; justify-content: center; height: 100%; }
.ss-pkg-tier { font-size: .6rem; font-weight: 600; letter-spacing: .09em; text-transform: uppercase; color: #fff; padding: 2px 7px; border-radius: 4px; display: inline-block; margin-bottom: 7px; align-self: flex-start; }
.ss-pkg-tier.soft    { background: #978A73; }
.ss-pkg-tier.comfort { background: #627476; }
.ss-pkg-tier.premium { background: #685736; }
.ss-pkg-name { font-size: .84rem; font-weight: 500; color: #685736; margin-bottom: 7px; }
.ss-pkg-areas { list-style: none; padding: 0; margin: 0 0 9px; flex: 1; }
.ss-pkg-areas li { font-size: .76rem; color: #575757; padding: 1px 0; display: flex; align-items: center; gap: 4px; }
.ss-pkg-areas li::before { content: '—'; color: #EBE6DC; font-size: .65rem; }
.ss-pkg-price { font-size: .82rem; font-weight: 700; color: #685736; margin-top: auto; }
.ss-pkg-price-old { text-decoration: line-through; color: #978A73; font-weight: 400; font-size: .75rem; margin-right: 6px; }
.ss-pkg-per { font-size: .7rem; color: #978A73; font-weight: 400; }

/* ── INDIVIDUAL TREATMENT PILLS ── */
.ss-single-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 7px; }
.ss-single-check { display: none; }
.ss-single-check + .ss-single-lbl {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 11px 8px; border: 1.5px solid #EBE6DC; border-radius: 8px;
  cursor: pointer; transition: all .15s; background: #f7f4ee; user-select: none; min-height: 58px;
}
.ss-single-check:checked + .ss-single-lbl { background: #bb9f6d; border-color: #8B7346; color: #fff; }
.ss-single-lbl:hover { border-color: #bb9f6d; background: #fff; }
.ss-single-check:checked + .ss-single-lbl .ss-single-price { color: rgba(255,255,255,0.75); }
.ss-single-name { font-size: .87rem; font-weight: 400; }
.ss-single-price { font-size: .72rem; color: #978A73; margin-top: 2px; transition: color .15s; }
.ss-single-price-old { text-decoration: line-through; font-size: .65rem; margin-right: 4px; }
.ss-treat-group-label { font-size: .7rem; font-weight: 500; text-transform: uppercase; letter-spacing: .08em; color: #978A73; margin: 16px 0 10px; }
.ss-treat-group-label:first-child { margin-top: 0; }
.ss-treatment-section { display: none; animation: ssFadeIn .2s ease; }
.ss-treatment-section.visible { display: block; }

/* ── CALENDAR ── */
.ss-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; max-width: 390px; }
.ss-cal-hdr { font-size: .67rem; font-weight: 700; color: #bb9f6d; text-align: center; padding: 3px 0; text-transform: uppercase; }
.ss-cal-day {
  aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
  border-radius: 6px; font-size: .84rem; font-weight: 500; cursor: pointer;
  border: 1.5px solid transparent; transition: all .15s; background: #f7f4ee; color: #685736;
}
.ss-cal-day:hover:not(.ss-disabled):not(.ss-empty) { background: #bb9f6d; color: #fff; }
.ss-cal-day.ss-selected { background: #fff; color: #685736; border-color: #bb9f6d; box-shadow: 0 0 0 1px #bb9f6d; }
.ss-cal-day.ss-disabled { background: transparent; color: #EBE6DC; cursor: default; }
.ss-cal-day.ss-empty { background: transparent; cursor: default; }
.ss-cal-nav-btn { background: #f7f4ee; border: 1px solid #EBE6DC; border-radius: 6px; padding: 4px 10px; cursor: pointer; font-size: .9rem; color: #685736; transition: background .15s; }
.ss-cal-nav-btn:hover { background: #EBE6DC; }
.ss-month-label { font-size: .9rem; font-weight: 600; color: #685736; }
.ss-time-grid { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }
.ss-time-btn {
  padding: 8px 13px; border-radius: 6px; border: 1.5px solid #EBE6DC; background: #fff;
  font-size: .85rem; font-weight: 500; cursor: pointer; transition: all .15s;
  color: #685736; font-family: 'Oswald', sans-serif;
}
.ss-time-btn:hover { border-color: #bb9f6d; color: #bb9f6d; }
.ss-time-btn.selected { background: #fff; color: #685736; border-color: #bb9f6d; box-shadow: 0 0 0 1px #bb9f6d; }

/* ── AVAILABILITY SLOTS (sávos) ── */
.ss-slot-grid { display: flex; flex-wrap: wrap; gap: 7px; }
.ss-slot-check { display: none; }
.ss-slot-check + label {
  display: inline-flex; align-items: center; padding: 9px 16px;
  border: 1.5px solid #EBE6DC; border-radius: 8px; font-size: .85rem;
  font-weight: 500; cursor: pointer; color: #685736; transition: all .15s; user-select: none;
  background: #f7f4ee;
}
.ss-slot-check:checked + label { background: #627476; color: #fff; border-color: #627476; }
.ss-slot-check + label:hover { border-color: #bb9f6d; }

/* ── SUMMARY CARD ── */
.ss-summary { background: #f7f4ee; border-radius: 8px; padding: 18px 20px; margin-bottom: 14px; }
.ss-summary-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid #EBE6DC; }
.ss-summary-row:last-child { border-bottom: none; }
.ss-summary-label { font-size: .75rem; text-transform: uppercase; letter-spacing: .06em; color: #978A73; font-weight: 500; }
.ss-summary-value { font-size: .88rem; color: #685736; font-weight: 500; text-align: right; max-width: 60%; }
.ss-summary-edit { font-size: .75rem; color: #bb9f6d; cursor: pointer; margin-left: 8px; text-decoration: underline; }

/* ── NOT ELIGIBLE ── */
.ss-not-eligible { border-radius: 8px; padding: 22px 20px; text-align: center; background: #fff5f5; border: 1.5px solid #fca5a5; }
.ss-not-icon { font-size: 1.8rem; margin-bottom: 10px; color: #dc2626; }
.ss-not-title { font-size: 1rem; font-weight: 500; margin: 0 0 7px; color: #685736; }
.ss-not-reason { font-size: .88rem; color: #575757; margin: 0 0 10px; line-height: 1.55; }
.ss-cta-btn { display: inline-block; padding: 10px 30px; background: #627476; color: #fff; border-radius: 6px; font-size: .85rem; font-weight: 600; text-decoration: none; text-transform: uppercase; letter-spacing: .04em; }

/* ── NAVIGATION ── */
.ss-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
.ss-nav-back {
  background: none; border: 1.5px solid #EBE6DC; border-radius: 6px; padding: 10px 22px;
  font-size: .9rem; font-weight: 500; cursor: pointer; color: #978A73;
  font-family: 'Oswald', sans-serif; transition: all .15s;
}
.ss-nav-back:hover { border-color: #bb9f6d; color: #685736; }
.ss-nav-next {
  background: #627476; color: #fff; border: none; border-radius: 6px; padding: 10px 30px;
  font-size: .9rem; font-weight: 600; cursor: pointer; letter-spacing: .03em;
  font-family: 'Oswald', sans-serif; transition: all .15s; text-transform: uppercase;
}
.ss-nav-next:hover:not(:disabled) { background: #8B7346; }
.ss-nav-next:disabled { opacity: .45; cursor: not-allowed; }

/* ── SUBMIT BUTTON (replaces Next on last step) ── */
.ss-submit-btn {
  width: 100%; padding: 13px 40px; background: #627476; color: #fff; border: none;
  border-radius: 6px; font-size: .97rem; font-weight: 700; cursor: pointer;
  letter-spacing: .05em; text-transform: uppercase; transition: background .15s;
  font-family: 'Oswald', sans-serif;
}
.ss-submit-btn:hover { background: #8B7346; }
.ss-submit-error { color: #dc2626; font-size: .84rem; text-align: center; margin-top: 10px; display: none; }

/* ── MODAL ── */
.ss-modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
  z-index: 99999; display: flex; align-items: flex-start; justify-content: center;
  padding: 20px; overflow-y: auto; animation: ssFadeIn .2s ease;
}
.ss-modal-backdrop #ss-form-root {
  background: #EBE6DC; border-radius: 12px; max-width: 680px; width: 100%;
  margin: 20px auto; animation: ssSlideUp .3s ease; position: relative;
}
.ss-modal-close {
  position: fixed; top: 16px; right: 20px; width: 36px; height: 36px;
  background: rgba(255,255,255,0.9); border-radius: 50%; display: flex;
  align-items: center; justify-content: center; cursor: pointer; font-size: 1rem;
  color: #685736; z-index: 100000; transition: background .15s;
}
.ss-modal-close:hover { background: #fff; }

/* ── ANIMATIONS ── */
@keyframes ssFadeIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes ssSlideIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes ssSlideOut { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-30px); } }
@keyframes ssSlideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

/* ── RESPONSIVE ── */
@media (max-width: 460px) {
  .ss-tone-grid { grid-template-columns: repeat(3, 1fr); }
  .ss-pkg-grid  { grid-template-columns: 1fr; }
  .ss-name-row  { grid-template-columns: 1fr; }
  .ss-modal-backdrop { padding: 0; }
  .ss-modal-backdrop #ss-form-root { border-radius: 0; margin: 0; min-height: 100vh; }
}
```

- [ ] **Step 2: Verify in browser**

Open `forms/form-wizard.html`. Expect: styled header with title/subtitle, 5 gray dots for progress, styled Back/Tovább buttons (Tovább disabled). Cream background, centered layout.

- [ ] **Step 3: Commit**

```bash
git add forms/form-wizard.html
git commit -m "feat: add all core CSS — layout, progress, cards, animations, responsive"
```

---

### Task 3: Step 1 Content — Fitzpatrick Tiles, Hair Tiles, Compatibility

**Files:**
- Modify: `forms/form-wizard.html` (add HTML inside `step-0` div + JS data arrays + render functions)

Port the Fitzpatrick tile selector, hair color tile selector, compatibility matrix, and result cards from form-preview.html. Add "Nézd meg az árainkat" link for not-eligible cases.

- [ ] **Step 1: Add Step 1 HTML inside `<div id="step-0">`**

```html
<div class="ss-card">
  <p class="ss-card-label">Bőrtípus &amp; szőrszín</p>

  <p class="ss-section-title">Milyen a bőrtónusod?</p>
  <p class="ss-section-sub">Válaszd ki a bőrszínedhez és napozási szokásodhoz legközelebb álló típust</p>
  <div class="ss-tone-grid" id="ss-fitz-grid"></div>
  <div id="ss-fitz-result" style="display:none;" class="ss-tone-result">
    <div class="ss-res-circle" id="ss-fitz-swatch"></div>
    <div>
      <p class="ss-res-type" id="ss-fitz-type"></p>
      <p class="ss-res-desc" id="ss-fitz-desc"></p>
      <p class="ss-res-proto" id="ss-fitz-proto"></p>
    </div>
  </div>

  <hr class="ss-divider" />

  <p class="ss-section-title">Milyen színű a szőrzeted?</p>
  <p class="ss-section-sub">A természetes, nem festett szőrzeted árnyalatát válaszd ki</p>
  <div class="ss-tone-grid" id="ss-hair-grid"></div>
  <div id="ss-hair-result" style="display:none;" class="ss-tone-result">
    <div class="ss-hair-swatch" id="ss-hair-swatch"></div>
    <div>
      <p class="ss-res-type" id="ss-hair-type"></p>
      <p class="ss-res-desc" id="ss-hair-desc"></p>
      <p class="ss-res-proto" id="ss-hair-proto"></p>
    </div>
  </div>

  <div class="ss-compat-placeholder" id="ss-compat-ph">Válaszd ki a bőr- és szőrszínt a kompatibilitás megtekintéséhez</div>
  <div class="ss-compat-box" id="ss-compat-box" style="display:none;">
    <div class="ss-compat-icon" id="ss-compat-icon"></div>
    <div>
      <p class="ss-compat-status" id="ss-compat-status"></p>
      <p class="ss-compat-detail" id="ss-compat-detail"></p>
      <span class="ss-compat-link" id="ss-compat-link" style="display:none;" onclick="ssWizard.goToStep(3)">Nézd meg az árainkat →</span>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add JS data arrays and Step 1 render functions inside `<script>`**

Replace `// JS will be added in subsequent tasks` with the full JS. Start with the data + Step 1 logic:

```js
// ══════════════════════════════════════════
// SKINSPIRIT WIZARD — MAIN JS
// ══════════════════════════════════════════

// ── PRICE FORMATTER ──
function ssFmt(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0'); }

// ── FITZPATRICK DATA ──
var SS_FITZ = [
  { val:1, swatch:'#F9EAE0', main:'Mindig leég', sub:'Sosem barnul', type:'Fitzpatrick I.', desc:'Nagyon világos, szőke vagy vörös haj', proto:'Világos bőrödre speciálisan kalibrált, alacsonyabb energiájú protokollt alkalmazunk — biztonságos és hatékony kezelés.' },
  { val:2, swatch:'#F0C8A8', main:'Általában leég', sub:'Néha barnul', type:'Fitzpatrick II.', desc:'Világos bőr, barnás vagy szőke haj', proto:'Világos bőrtónusodhoz finomhangolt beállításokkal dolgozunk — a legjobb eredményt megbízható protokollal érjük el.' },
  { val:3, swatch:'#D4956A', main:'Néha leég', sub:'Fokozatosan barnul', type:'Fitzpatrick III.', desc:'Közép bőrszín, barna haj', proto:'Ideális bőrtípus lézer szőrtelenítéshez — optimalizált protokollal kiváló eredmény érhető el.' },
  { val:4, swatch:'#A8693E', main:'Ritkán leég', sub:'Könnyen megbarnul', type:'Fitzpatrick IV.', desc:'Olíva vagy közepes barna bőr', proto:'Gazdag melanintartalmú bőröd kiválóan reagál a lézer kezelésre — professzionális protokollal hosszú tartós eredmény.' },
  { val:5, swatch:'#7B4228', main:'Szinte sosem ég le', sub:'Mindig megbarnul', type:'Fitzpatrick V.', desc:'Sötétbarna bőr', proto:'Sötétebb bőrtónusodhoz egyedi energiabeállítással dolgozunk — a biztonság és a hatékonyság egyaránt garantált.' },
  { val:6, swatch:'#3E1F0F', main:'Sosem ég le', sub:'Mélybarna vagy fekete bőr', type:'Fitzpatrick VI.', desc:'Nagyon sötét, mélybarna bőr', proto:'Mélybarna bőrödre specializált protokollt alkalmazunk — maximális biztonság és látható, tartós eredmény.' },
];

// ── HAIR DATA ──
var SS_HAIR = [
  { val:1, swatch:'#ECEAE6', main:'Fehér / Ősz', type:'Fehér / Ősz szőrzet', desc:'Fehér vagy ősz szőr', proto:'Sajnos fehér és ősz szőrzet esetén a lézer szőrtelenítés nem elvégezhető — nincs elegendő melanintartalom a szőrzetben.' },
  { val:2, swatch:'#C9A96E', main:'Szőke', type:'Szőke szőrzet', desc:'Szőke vagy aranyszőke szőr', proto:'Szőke szőrzetnél személyre szabott kezelési tervet állítunk össze — konzultáción pontosítjuk a várható eredményt.' },
  { val:3, swatch:'#B5564D', main:'Vörös', type:'Vörös szőrzet', desc:'Vörös vagy rézvörös szőr', proto:'Vörös szőrzetnél személyre szabott kezelési tervet állítunk össze — konzultáción pontosítjuk a várható eredményt.' },
  { val:4, swatch:'#8B5E3C', main:'Barna', type:'Barna szőrzet', desc:'Gesztenye vagy középbarna szőr', proto:'Barna szőrzet esetén jó hatékonysággal végezhetjük a lézer szőrtelenítést — megfelelő melanintartalom, szép és tartós eredmény.' },
  { val:5, swatch:'#3D1F0E', main:'Sötétbarna', type:'Sötétbarna szőrzet', desc:'Mélybarna szőr', proto:'Sötétbarna szőrzet — kiváló jelölt vagy lézer szőrtelenítésre! Erős melanintartalom, nagyon hatékony kezelés és tartós eredmény.' },
  { val:6, swatch:'#100808', main:'Fekete', type:'Fekete szőrzet', desc:'Fekete szőr', proto:'Fekete szőrzet — a legjobb jelölt lézer szőrtelenítésre! Maximum melanintartalom, legjobb hatékonyság, leglátványosabb eredmény.' },
];

// ── COMPATIBILITY MATRIX [hair-1][fitz-1] ──
var SS_COMPAT_MATRIX = [
  ['X','X','X','X','X','X'],
  ['X','X','X','X','X','X'],
  ['C','C','C','S','S','S'],
  ['OK','OK','OK','OK','OK','OK'],
  ['OK','OK','OK','OK','OK','OK'],
  ['OK','OK','OK','OK','OK','OK'],
];

// ── WIZARD STATE ──
var ssWizard = {
  currentStep: 0,
  totalSteps: 5,
  stepNames: ['Bőrtípus', 'Adatok', 'Kérdések', 'Kezelés', 'Összegző'],
  selFitz: null,
  selHair: null,
  compatCode: null,
  isEligible: true,

  // ── NAVIGATION ──
  goToStep: function(step) {
    if (step < 0 || step >= this.totalSteps) return;
    var current = document.getElementById('step-' + this.currentStep);
    var target = document.getElementById('step-' + step);
    current.classList.remove('active');
    current.classList.add('slide-out');
    var self = this;
    setTimeout(function() {
      current.classList.remove('slide-out');
      target.classList.add('active');
      self.currentStep = step;
      self.updateProgress();
      self.updateNav();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 280);
  },

  nextStep: function() { if (this.canProceed()) this.goToStep(this.currentStep + 1); },
  prevStep: function() { this.goToStep(this.currentStep - 1); },

  updateProgress: function() {
    var dots = document.querySelectorAll('.ss-progress-dot');
    var fills = document.querySelectorAll('.ss-progress-fill');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active', 'completed');
      if (i < this.currentStep) dots[i].classList.add('completed');
      else if (i === this.currentStep) dots[i].classList.add('active');
    }
    for (var j = 0; j < fills.length; j++) {
      fills[j].style.width = (j < this.currentStep) ? '100%' : '0';
    }
    document.getElementById('ss-progress-label').textContent =
      (this.currentStep + 1) + '/' + this.totalSteps + ' — ' + this.stepNames[this.currentStep];
  },

  updateNav: function() {
    var back = document.getElementById('ss-back');
    var next = document.getElementById('ss-next');
    back.style.visibility = this.currentStep === 0 ? 'hidden' : 'visible';
    if (this.currentStep === this.totalSteps - 1) {
      next.style.display = 'none';
    } else {
      next.style.display = '';
      next.disabled = !this.canProceed();
    }
  },

  canProceed: function() {
    switch (this.currentStep) {
      case 0: return this.selFitz !== null && this.selHair !== null;
      case 1: return this.validateStep1();
      case 2: return this.validateStep2();
      case 3: return this.validateStep3();
      case 4: return true;
      default: return false;
    }
  },

  validateStep1: function() {
    var ln = document.getElementById('ss-lastname').value.trim();
    var fn = document.getElementById('ss-firstname').value.trim();
    var em = document.getElementById('ss-email').value.trim();
    var ph = document.getElementById('ss-phone').value.trim();
    return ln && fn && em && ph && em.indexOf('@') > 0;
  },

  validateStep2: function() {
    var q1 = document.querySelector('[name="ss_szortelenites"]:checked');
    var q2 = document.querySelector('[name="ss_fenyerzekeny"]:checked');
    var q3 = document.querySelector('[name="ss_borbetegseg"]:checked');
    return q1 && q2 && q3;
  },

  validateStep3: function() {
    var gender = document.querySelector('[name="ss_nem"]:checked');
    var treatments = document.querySelectorAll('[name="ss_kezelesek[]"]:checked');
    return gender && treatments.length > 0;
  },

  refreshNextButton: function() { this.updateNav(); }
};

// ── RENDER FITZPATRICK TILES ──
function ssRenderFitzTiles() {
  var grid = document.getElementById('ss-fitz-grid');
  SS_FITZ.forEach(function(d) {
    var r = document.createElement('input');
    r.type = 'radio'; r.className = 'ss-tone-radio'; r.id = 'ss-fitz-' + d.val; r.name = 'ss_fitzpatrick'; r.value = d.val;
    var l = document.createElement('label');
    l.htmlFor = 'ss-fitz-' + d.val; l.className = 'ss-tone-tile';
    l.innerHTML = '<div class="ss-tone-circle" style="background:' + d.swatch + '"></div><span class="ss-tone-main">' + d.main + '</span>';
    r.addEventListener('change', function() {
      ssWizard.selFitz = d.val;
      document.getElementById('ss-fitz-swatch').style.background = d.swatch;
      document.getElementById('ss-fitz-type').textContent = d.type;
      document.getElementById('ss-fitz-desc').textContent = d.desc;
      document.getElementById('ss-fitz-proto').textContent = d.proto;
      document.getElementById('ss-fitz-result').style.display = 'flex';
      ssUpdateCompat();
      ssWizard.refreshNextButton();
    });
    grid.appendChild(r); grid.appendChild(l);
  });
}

// ── RENDER HAIR TILES ──
function ssRenderHairTiles() {
  var grid = document.getElementById('ss-hair-grid');
  SS_HAIR.forEach(function(d) {
    var r = document.createElement('input');
    r.type = 'radio'; r.className = 'ss-tone-radio'; r.id = 'ss-hair-' + d.val; r.name = 'ss_hair'; r.value = d.val;
    var l = document.createElement('label');
    l.htmlFor = 'ss-hair-' + d.val; l.className = 'ss-tone-tile';
    l.innerHTML = '<div class="ss-tone-circle" style="background:' + d.swatch + '"></div><span class="ss-tone-main">' + d.main + '</span>';
    r.addEventListener('change', function() {
      ssWizard.selHair = d.val;
      document.getElementById('ss-hair-swatch').style.background = d.swatch;
      document.getElementById('ss-hair-type').textContent = d.type;
      document.getElementById('ss-hair-desc').textContent = d.desc;
      document.getElementById('ss-hair-proto').textContent = d.proto;
      document.getElementById('ss-hair-result').style.display = 'flex';
      ssUpdateCompat();
      ssWizard.refreshNextButton();
    });
    grid.appendChild(r); grid.appendChild(l);
  });
}

// ── COMPATIBILITY ──
function ssUpdateCompat() {
  var ph = document.getElementById('ss-compat-ph');
  var box = document.getElementById('ss-compat-box');
  var link = document.getElementById('ss-compat-link');
  if (!ssWizard.selFitz || !ssWizard.selHair) { ph.style.display = 'block'; box.style.display = 'none'; return; }
  ph.style.display = 'none'; box.style.display = 'flex';

  var code = SS_COMPAT_MATRIX[ssWizard.selHair - 1][ssWizard.selFitz - 1];
  ssWizard.compatCode = code;
  box.classList.remove('ok', 'consult', 'special', 'notok');
  var icon = document.getElementById('ss-compat-icon');
  var status = document.getElementById('ss-compat-status');
  var detail = document.getElementById('ss-compat-detail');

  if (code === 'OK') {
    box.classList.add('ok'); icon.textContent = '✓';
    status.textContent = 'Alkalmas kombináció';
    detail.textContent = (ssWizard.selHair >= 5 && ssWizard.selFitz >= 5)
      ? 'Kezelés elvégezhető. Sötétebb bőrtípushoz egyedi energiabeállítással dolgozunk.'
      : 'Ideális kombináció — a kezelés elvégezhető, szép és tartós eredmény várható.';
    link.style.display = 'none';
    ssWizard.isEligible = true;
  } else if (code === 'X') {
    box.classList.add('notok'); icon.textContent = '✗';
    status.textContent = 'Nem alkalmas';
    detail.textContent = 'Sajnos fehér/ősz vagy szőke szőrzet esetén a lézer szőrtelenítés nem elvégezhető.';
    link.style.display = 'inline-block';
    ssWizard.isEligible = false;
  } else if (code === 'C') {
    box.classList.add('consult'); icon.textContent = '~';
    status.textContent = 'Egyéni konzultáció ajánlott';
    detail.textContent = ssWizard.selHair === 3
      ? 'Szőke szőrzetnél a hatékonyság egyéni felmérést igényel — konzultáción pontosítjuk a lehetőségeket.'
      : 'Barna szőr + mélybarna bőr kombinációhoz speciális beállítás szükséges — egyéni konzultáció ajánlott.';
    link.style.display = 'none';
    ssWizard.isEligible = true;
  } else {
    box.classList.add('special'); icon.textContent = '!';
    status.textContent = 'Speciális protokoll szükséges';
    detail.textContent = 'Szőke szőrzet + sötétebb bőrtónus esetén speciális protokoll szükséges — egyéni felmérés alapján dolgozunk.';
    link.style.display = 'none';
    ssWizard.isEligible = true;
  }
}

// ── INIT ──
ssRenderFitzTiles();
ssRenderHairTiles();
ssWizard.updateProgress();
ssWizard.updateNav();

// ── NAV BUTTONS ──
document.getElementById('ss-next').addEventListener('click', function() { ssWizard.nextStep(); });
document.getElementById('ss-back').addEventListener('click', function() { ssWizard.prevStep(); });
```

- [ ] **Step 3: Verify in browser**

Open `forms/form-wizard.html`. Expected: Step 1 visible with 6 Fitzpatrick tiles and 6 hair tiles. Clicking tiles shows result cards. Selecting both shows compatibility box. "Tovább" enables after both selected. Clicking Tovább navigates to empty Step 2 with slide animation.

- [ ] **Step 4: Commit**

```bash
git add forms/form-wizard.html
git commit -m "feat: Step 1 — Fitzpatrick tiles, hair tiles, compatibility matrix"
```

---

### Task 4: Step 2 Content — Personal Details Form

**Files:**
- Modify: `forms/form-wizard.html` (add HTML inside `step-1` div + validation listeners)

- [ ] **Step 1: Add Step 2 HTML inside `<div id="step-1">`**

```html
<div class="ss-card">
  <p class="ss-card-label">Személyes adatok</p>
  <div class="ss-name-row">
    <div class="ss-field-group">
      <label class="ss-field-label" for="ss-lastname">Vezetéknév *</label>
      <input type="text" id="ss-lastname" class="ss-field-input" placeholder="Kovács" autocomplete="family-name" />
    </div>
    <div class="ss-field-group">
      <label class="ss-field-label" for="ss-firstname">Keresztnév *</label>
      <input type="text" id="ss-firstname" class="ss-field-input" placeholder="Anna" autocomplete="given-name" />
    </div>
  </div>
  <div class="ss-field-group">
    <label class="ss-field-label" for="ss-email">Email cím *</label>
    <input type="email" id="ss-email" class="ss-field-input" placeholder="kovacs.anna@email.hu" autocomplete="email" />
  </div>
  <div class="ss-field-group">
    <label class="ss-field-label" for="ss-phone">Telefonszám *</label>
    <input type="tel" id="ss-phone" class="ss-field-input" placeholder="+36 30 123 4567" autocomplete="tel" />
  </div>
</div>
```

- [ ] **Step 2: Add input listeners for real-time validation**

Add after the nav button listeners in the `<script>`:

```js
// ── STEP 2 VALIDATION LISTENERS ──
['ss-lastname', 'ss-firstname', 'ss-email', 'ss-phone'].forEach(function(id) {
  document.getElementById(id).addEventListener('input', function() {
    ssWizard.refreshNextButton();
  });
});
```

- [ ] **Step 3: Verify in browser**

Navigate to Step 2. Expected: 4 input fields visible with placeholders. "Tovább" disabled until all 4 filled and email contains @. Back button visible and works.

- [ ] **Step 4: Commit**

```bash
git add forms/form-wizard.html
git commit -m "feat: Step 2 — personal details form with real-time validation"
```

---

### Task 5: Step 3 Content — Eligibility Questions

**Files:**
- Modify: `forms/form-wizard.html` (add HTML inside `step-2` div + listeners)

- [ ] **Step 1: Add Step 3 HTML inside `<div id="step-2">`**

```html
<div class="ss-card">
  <p class="ss-card-label">Néhány kérdés</p>
  <div class="ss-field-group">
    <label class="ss-field-label">Mivel szőrtelenítesz jelenleg? *</label>
    <div class="ss-radio-group">
      <input type="radio" class="ss-radio-pill" id="ss-sz-b" name="ss_szortelenites" value="Borotva" /><label for="ss-sz-b">Borotva</label>
      <input type="radio" class="ss-radio-pill" id="ss-sz-e" name="ss_szortelenites" value="Epilátor" /><label for="ss-sz-e">Epilátor</label>
      <input type="radio" class="ss-radio-pill" id="ss-sz-g" name="ss_szortelenites" value="Gyanta" /><label for="ss-sz-g">Gyanta</label>
      <input type="radio" class="ss-radio-pill" id="ss-sz-c" name="ss_szortelenites" value="Csipesz" /><label for="ss-sz-c">Csipesz</label>
      <input type="radio" class="ss-radio-pill" id="ss-sz-k" name="ss_szortelenites" value="Krém" /><label for="ss-sz-k">Krém</label>
    </div>
  </div>
  <hr class="ss-divider" />
  <div class="ss-field-group">
    <label class="ss-field-label">Szedsz fényérzékeny gyógyszert? *</label>
    <div class="ss-radio-group">
      <input type="radio" class="ss-radio-pill" id="ss-fe-i" name="ss_fenyerzekeny" value="Igen" /><label for="ss-fe-i">Igen</label>
      <input type="radio" class="ss-radio-pill" id="ss-fe-n" name="ss_fenyerzekeny" value="Nem szedek" /><label for="ss-fe-n">Nem szedek</label>
    </div>
  </div>
  <div class="ss-field-group">
    <label class="ss-field-label">Van-e aktív bőrbetegséged? <small>(kivéve szőrtüszőgyulladás)</small> *</label>
    <div class="ss-radio-group">
      <input type="radio" class="ss-radio-pill" id="ss-bb-i" name="ss_borbetegseg" value="Igen" /><label for="ss-bb-i">Igen</label>
      <input type="radio" class="ss-radio-pill" id="ss-bb-n" name="ss_borbetegseg" value="Nem" /><label for="ss-bb-n">Nem</label>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add change listeners for radio groups**

Add after Step 2 validation listeners:

```js
// ── STEP 3 VALIDATION LISTENERS ──
['ss_szortelenites', 'ss_fenyerzekeny', 'ss_borbetegseg'].forEach(function(name) {
  document.querySelectorAll('[name="' + name + '"]').forEach(function(el) {
    el.addEventListener('change', function() {
      // Update eligibility based on answers
      var med = document.querySelector('[name="ss_fenyerzekeny"]:checked');
      var skin = document.querySelector('[name="ss_borbetegseg"]:checked');
      if (med && med.value === 'Igen') ssWizard.isEligible = false;
      else if (skin && skin.value === 'Igen') ssWizard.isEligible = false;
      else if (ssWizard.compatCode !== 'X') ssWizard.isEligible = true;
      ssWizard.refreshNextButton();
    });
  });
});
```

- [ ] **Step 3: Verify in browser**

Navigate to Step 3. Expected: 3 question groups with radio pills. Tovább disabled until all 3 answered. Clicking answers activates pills (teal fill). Back works.

- [ ] **Step 4: Commit**

```bash
git add forms/form-wizard.html
git commit -m "feat: Step 3 — eligibility questions with radio pills"
```

---

### Task 6: Step 4 Content — Treatment Picker with Dynamic Pricing

**Files:**
- Modify: `forms/form-wizard.html` (add HTML inside `step-3` div + treatment data + render + pricing fetch)

This is the largest task. Includes gender selector, session toggle, package cards, individual treatment pills, and the dynamic pricing fetch logic.

- [ ] **Step 1: Add Step 4 HTML inside `<div id="step-3">`**

```html
<div class="ss-card">
  <p class="ss-card-label">Kezelés</p>
  <div class="ss-field-group">
    <label class="ss-field-label">Nemed *</label>
    <div class="ss-radio-group">
      <input type="radio" class="ss-radio-pill" id="ss-nem-no" name="ss_nem" value="Nő" /><label for="ss-nem-no">Nő</label>
      <input type="radio" class="ss-radio-pill" id="ss-nem-fi" name="ss_nem" value="Férfi" /><label for="ss-nem-fi">Férfi</label>
    </div>
  </div>

  <div id="ss-sess-wrap" style="display:none;">
    <hr class="ss-divider" />
    <label class="ss-field-label">Melyik kezelés érdekel? <small>(több is választható)</small></label>
    <div style="margin-bottom:14px;">
      <div class="ss-session-toggle">
        <button type="button" class="ss-sess-btn active" id="ss-sess-6" data-sess="6">6 alkalom</button>
        <button type="button" class="ss-sess-btn" id="ss-sess-1" data-sess="1">1 alkalom</button>
      </div>
    </div>
  </div>

  <div class="ss-treatment-section" id="ss-treat-no"></div>
  <div class="ss-treatment-section" id="ss-treat-ferfi"></div>
</div>
```

- [ ] **Step 2: Add treatment data arrays with fallback prices**

Add before the `// ── INIT ──` section:

```js
// ══════════════════════════════════════════
// TREATMENT DATA (fallback prices — overwritten by API)
// ══════════════════════════════════════════
var SS_TREAT_NO = {
  packages: [
    { id:'no-soft',    name:'Soft bérlet',    tier:'soft',    areas:['Hónalj','Bikini'],                          p1:47000,  p6:240000,  slug6:'noi-soft-berlet-arak',    slug1:'noi-soft-1alk-arak' },
    { id:'no-comfort', name:'Comfort bérlet', tier:'comfort', areas:['Hónalj','Bikini','Lábszár','Comb'],          p1:115000, p6:570000,  slug6:'noi-comfort-berlet-arak', slug1:'noi-comfort-1alk-arak' },
    { id:'no-premium', name:'Prémium bérlet', tier:'premium', areas:['Teljes kar','Teljes láb','Bikini','Hónalj'], p1:147000, p6:720000,  slug6:'noi-premium-berlet-arak', slug1:'noi-premium-1alk-arak' },
  ],
  singles: [
    { id:'no-honalj',  name:'Hónalj',  p1:23000,  p6:115000, slug6:'noi-honalj-berlet-arak',  slug1:'noi-honalj-1alk-arak' },
    { id:'no-bikini',  name:'Bikini',  p1:27000,  p6:140000, slug6:'noi-bikini-berlet-arak',  slug1:'noi-bikini-1alk-arak' },
    { id:'no-intim',   name:'Intim',   p1:35000,  p6:180000, slug6:'noi-intim-berlet-arak',   slug1:'noi-intim-1alk-arak' },
    { id:'no-bajusz',  name:'Bajusz',  p1:17000,  p6:84000,  slug6:'noi-bajusz-berlet-arak',  slug1:'noi-bajusz-1alk-arak' },
    { id:'no-labszar', name:'Lábszár', p1:54000,  p6:270000, slug6:'noi-labszar-berlet-arak', slug1:'noi-labszar-1alk-arak' },
    { id:'no-comb',    name:'Comb',    p1:54000,  p6:270000, slug6:'noi-comb-berlet-arak',    slug1:'noi-comb-1alk-arak' },
    { id:'no-alkar',   name:'Alkar',   p1:28000,  p6:138000, slug6:'noi-alkar-berlet-arak',   slug1:'noi-alkar-1alk-arak' },
    { id:'no-fenek',   name:'Fenék',   p1:54000,  p6:270000, slug6:'noi-fenek-berlet-arak',   slug1:'noi-fenek-1alk-arak' },
  ]
};

var SS_TREAT_FERFI = {
  packages: [
    { id:'fi-soft',    name:'Soft bérlet',    tier:'soft',    areas:['Hát','Nyak','Vállak'],               p1:76000,  p6:390000,  slug6:'ferfi-soft-berlet-arak',    slug1:'ferfi-soft-1alk-arak' },
    { id:'fi-comfort', name:'Comfort bérlet', tier:'comfort', areas:['Hát','Nyak + váll','Mellkas','Has'], p1:108000, p6:540000,  slug6:'ferfi-comfort-berlet-arak', slug1:'ferfi-comfort-1alk-arak' },
    { id:'fi-premium', name:'Prémium bérlet', tier:'premium', areas:['Láb','Kar','Törzs','Hónalj'],       p1:210000, p6:1120000, slug6:'ferfi-premium-berlet-arak', slug1:'ferfi-premium-1alk-arak' },
  ],
  singles: [
    { id:'fi-hat',     name:'Hát',        p1:61000,  p6:300000, slug6:'ferfi-hat-berlet-arak',     slug1:'ferfi-hat-1alk-arak' },
    { id:'fi-nyak',    name:'Nyak, váll', p1:50000,  p6:250000, slug6:'ferfi-nyak-berlet-arak',    slug1:'ferfi-nyak-1alk-arak' },
    { id:'fi-intim',   name:'Intim',      p1:47000,  p6:240000, slug6:'ferfi-intim-berlet-arak',   slug1:'ferfi-intim-1alk-arak' },
    { id:'fi-mellkas', name:'Mellkas',    p1:47000,  p6:240000, slug6:'ferfi-mellkas-berlet-arak', slug1:'ferfi-mellkas-1alk-arak' },
    { id:'fi-has',     name:'Has',        p1:45000,  p6:225000, slug6:'ferfi-has-berlet-arak',     slug1:'ferfi-has-1alk-arak' },
    { id:'fi-honalj',  name:'Hónalj',     p1:29000,  p6:145000, slug6:'ferfi-honalj-berlet-arak',  slug1:'ferfi-honalj-1alk-arak' },
    { id:'fi-fenek',   name:'Fenék',      p1:54000,  p6:270000, slug6:'ferfi-fenek-berlet-arak',   slug1:'ferfi-fenek-1alk-arak' },
    { id:'fi-comb',    name:'Comb',       p1:54000,  p6:280000, slug6:'ferfi-comb-berlet-arak',    slug1:'ferfi-comb-1alk-arak' },
  ]
};

var ssCurrentSess = 6;
var ssPriceData = null; // populated by API fetch

// ── RENDER TREATMENTS ──
function ssRenderTreatments(data, containerId) {
  var cont = document.getElementById(containerId);
  cont.innerHTML = '';

  // Packages
  var pkgLabel = document.createElement('p');
  pkgLabel.className = 'ss-treat-group-label'; pkgLabel.textContent = 'Bérletek';
  cont.appendChild(pkgLabel);

  var pkgGrid = document.createElement('div');
  pkgGrid.className = 'ss-pkg-grid';
  data.packages.forEach(function(d) {
    var price = ssCurrentSess === 1 ? d.p1 : d.p6;
    var salePrice = ssGetSalePrice(d, ssCurrentSess);
    var areas = d.areas.map(function(a) { return '<li>' + a + '</li>'; }).join('');
    var sessLabel = ssCurrentSess === 1 ? '1 alkalom' : '6 alkalom';
    var priceHtml = salePrice
      ? '<span class="ss-pkg-price-old">' + ssFmt(price) + '</span>' + ssFmt(salePrice)
      : ssFmt(price);

    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<input type="checkbox" class="ss-pkg-check" id="' + d.id + '" name="ss_kezelesek[]" value="' + d.name + ' — ' + sessLabel + ' (' + ssFmt(salePrice || price) + ' Ft)" />' +
      '<label class="ss-pkg-lbl" for="' + d.id + '"><div class="ss-pkg-checkmark"></div>' +
      '<span class="ss-pkg-tier ' + d.tier + '">' + d.tier.toUpperCase() + '</span>' +
      '<span class="ss-pkg-name">' + d.name + '</span>' +
      '<ul class="ss-pkg-areas">' + areas + '</ul>' +
      '<span class="ss-pkg-price">' + priceHtml + ' Ft <span class="ss-pkg-per">/ ' + sessLabel + '</span></span></label>';
    pkgGrid.appendChild(wrap);
  });
  cont.appendChild(pkgGrid);

  // Singles
  var sLabel = document.createElement('p');
  sLabel.className = 'ss-treat-group-label'; sLabel.style.marginTop = '20px'; sLabel.textContent = 'Egyedi kezelések';
  cont.appendChild(sLabel);

  var sGrid = document.createElement('div');
  sGrid.className = 'ss-single-grid';
  data.singles.forEach(function(d) {
    var price = ssCurrentSess === 1 ? d.p1 : d.p6;
    var salePrice = ssGetSalePrice(d, ssCurrentSess);
    var sessLabel = ssCurrentSess === 1 ? '1 alkalom' : '6 alkalom';
    var priceHtml = salePrice
      ? '<span class="ss-single-price-old">' + ssFmt(price) + '</span>' + ssFmt(salePrice) + ' Ft'
      : ssFmt(price) + ' Ft';

    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<input type="checkbox" class="ss-single-check" id="' + d.id + '" name="ss_kezelesek[]" value="' + d.name + ' — ' + sessLabel + ' (' + ssFmt(salePrice || price) + ' Ft)" />' +
      '<label class="ss-single-lbl" for="' + d.id + '">' +
      '<span class="ss-single-name">' + d.name + '</span>' +
      '<span class="ss-single-price">' + priceHtml + '</span></label>';
    sGrid.appendChild(wrap);
  });
  cont.appendChild(sGrid);

  // Add change listeners for treatment checkboxes
  cont.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
    cb.addEventListener('change', function() { ssWizard.refreshNextButton(); });
  });
}

// ── SALE PRICE LOOKUP ──
function ssGetSalePrice(treatment, sess) {
  if (!ssPriceData) return null;
  var slug = sess === 1 ? treatment.slug1 : treatment.slug6;
  if (!slug) return null;
  var entry = ssPriceData.find(function(p) { return p.slug === slug; });
  if (entry && entry.is_on_sale) return entry.sale_price;
  return null;
}

// ── SESSION TOGGLE ──
function ssApplySession(sess) {
  ssCurrentSess = sess;
  document.getElementById('ss-sess-6').classList.toggle('active', sess === 6);
  document.getElementById('ss-sess-1').classList.toggle('active', sess === 1);
  // Re-render both treatment sections to update prices
  ssRenderTreatments(SS_TREAT_NO, 'ss-treat-no');
  ssRenderTreatments(SS_TREAT_FERFI, 'ss-treat-ferfi');
  // Restore visibility
  var gender = document.querySelector('[name="ss_nem"]:checked');
  if (gender) {
    document.getElementById('ss-treat-no').classList.toggle('visible', gender.value === 'Nő');
    document.getElementById('ss-treat-ferfi').classList.toggle('visible', gender.value === 'Férfi');
  }
}

document.getElementById('ss-sess-6').addEventListener('click', function() { ssApplySession(6); });
document.getElementById('ss-sess-1').addEventListener('click', function() { ssApplySession(1); });

// ── GENDER TOGGLE ──
document.querySelectorAll('[name="ss_nem"]').forEach(function(el) {
  el.addEventListener('change', function() {
    document.getElementById('ss-treat-no').classList.toggle('visible', el.value === 'Nő');
    document.getElementById('ss-treat-ferfi').classList.toggle('visible', el.value === 'Férfi');
    document.getElementById('ss-sess-wrap').style.display = 'block';
    ssWizard.refreshNextButton();
  });
});

// ── DYNAMIC PRICING FETCH ──
function ssFetchPrices() {
  var apiUrl = '/wp-json/skinspirit/v1/prices';
  // In standalone preview mode, skip the fetch
  if (window.location.protocol === 'file:') return;

  fetch(apiUrl)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      ssPriceData = data;
      // Update fallback prices in treatment data with API values
      [SS_TREAT_NO, SS_TREAT_FERFI].forEach(function(treat) {
        treat.packages.concat(treat.singles).forEach(function(t) {
          var entry6 = data.find(function(p) { return p.slug === t.slug6; });
          var entry1 = data.find(function(p) { return p.slug === t.slug1; });
          if (entry6) t.p6 = entry6.is_on_sale ? entry6.sale_price : entry6.base_price;
          if (entry1) t.p1 = entry1.is_on_sale ? entry1.sale_price : entry1.base_price;
        });
      });
      // Re-render if treatments are already visible
      ssRenderTreatments(SS_TREAT_NO, 'ss-treat-no');
      ssRenderTreatments(SS_TREAT_FERFI, 'ss-treat-ferfi');
    })
    .catch(function() { /* fallback prices already in data arrays */ });
}
```

- [ ] **Step 3: Add render + fetch calls to INIT section**

Update the `// ── INIT ──` section:

```js
// ── INIT ──
ssRenderFitzTiles();
ssRenderHairTiles();
ssRenderTreatments(SS_TREAT_NO, 'ss-treat-no');
ssRenderTreatments(SS_TREAT_FERFI, 'ss-treat-ferfi');
ssFetchPrices();
ssWizard.updateProgress();
ssWizard.updateNav();
```

- [ ] **Step 4: Verify in browser**

Navigate to Step 4. Expected: Gender pills visible. After selecting Nő/Férfi, session toggle and treatment cards appear. Package cards show 3-column layout with tiers, areas, prices. Individual treatments show as pill grid. Session toggle switches prices. Tovább enables after gender + 1 treatment selected.

- [ ] **Step 5: Commit**

```bash
git add forms/form-wizard.html
git commit -m "feat: Step 4 — treatment picker with dynamic pricing, session toggle, gender filter"
```

---

### Task 7: Step 5 Content — Appointment, Summary, Submit

**Files:**
- Modify: `forms/form-wizard.html` (add HTML inside `step-4` div + calendar JS + summary builder + submit logic)

- [ ] **Step 1: Add Step 5 HTML inside `<div id="step-4">`**

```html
<!-- APPOINTMENT PREFERENCE -->
<div class="ss-card">
  <p class="ss-card-label">Időpont-preferencia</p>
  <p class="ss-section-sub">Visszaigazolást küldünk telefonon vagy emailben</p>

  <div style="margin-bottom:14px;">
    <div class="ss-session-toggle">
      <button type="button" class="ss-sess-btn active" id="ss-appt-cal">Válassz konkrét napot</button>
      <button type="button" class="ss-sess-btn" id="ss-appt-slot">Jelöld mikor érsz rá</button>
    </div>
  </div>

  <!-- Calendar mode -->
  <div id="ss-calendar-mode">
    <p class="ss-section-title">Preferált időpont</p>
    <p class="ss-section-sub">Hétfő és Szerda, legkorábban <strong id="ss-min-date"></strong></p>
    <div class="ss-cal-grid" id="ss-cal-grid"></div>
    <div id="ss-time-slots" style="display:none;">
      <p class="ss-section-title" style="margin-top:16px;">Szabad időpontok <span id="ss-sel-date"></span></p>
      <div class="ss-time-grid" id="ss-time-grid"></div>
    </div>
  </div>

  <!-- Slot mode -->
  <div id="ss-slot-mode" style="display:none;">
    <p class="ss-section-title">Mikor tudsz jönni?</p>
    <p class="ss-section-sub">Több is választható</p>
    <div class="ss-slot-grid">
      <input type="checkbox" class="ss-slot-check" id="ss-sl-hd" name="ss_idosav[]" value="Hétfő délelőtt (9-12)" /><label for="ss-sl-hd">Hétfő délelőtt</label>
      <input type="checkbox" class="ss-slot-check" id="ss-sl-hdu" name="ss_idosav[]" value="Hétfő délután (13-17)" /><label for="ss-sl-hdu">Hétfő délután</label>
      <input type="checkbox" class="ss-slot-check" id="ss-sl-szd" name="ss_idosav[]" value="Szerda délelőtt (9-12)" /><label for="ss-sl-szd">Szerda délelőtt</label>
      <input type="checkbox" class="ss-slot-check" id="ss-sl-szdu" name="ss_idosav[]" value="Szerda délután (13-17)" /><label for="ss-sl-szdu">Szerda délután</label>
    </div>
  </div>
</div>

<!-- SUMMARY -->
<div class="ss-card">
  <p class="ss-card-label">Összegző</p>
  <div class="ss-summary" id="ss-summary"></div>
</div>

<!-- SUBMIT -->
<div class="ss-card">
  <button type="button" class="ss-submit-btn" id="ss-submit-btn">Küldés →</button>
  <p class="ss-submit-error" id="ss-submit-error"></p>
</div>
```

- [ ] **Step 2: Add calendar, slot toggle, summary, and submit JS**

Add before `// ── INIT ──`:

```js
// ══════════════════════════════════════════
// STEP 5 — APPOINTMENT + SUMMARY + SUBMIT
// ══════════════════════════════════════════

var ssCal = { year: null, month: null, selDate: null, selTime: null };
var SS_HU_MONTHS = ['Január','Február','Március','Április','Május','Június','Július','Augusztus','Szeptember','Október','November','December'];
var SS_HU_DAYS = ['H','K','Sze','Cs','P','Szo','V'];
var ssApptMode = 'calendar'; // 'calendar' or 'slot'

// ── APPOINTMENT MODE TOGGLE ──
document.getElementById('ss-appt-cal').addEventListener('click', function() {
  ssApptMode = 'calendar';
  this.classList.add('active');
  document.getElementById('ss-appt-slot').classList.remove('active');
  document.getElementById('ss-calendar-mode').style.display = 'block';
  document.getElementById('ss-slot-mode').style.display = 'none';
});
document.getElementById('ss-appt-slot').addEventListener('click', function() {
  ssApptMode = 'slot';
  this.classList.add('active');
  document.getElementById('ss-appt-cal').classList.remove('active');
  document.getElementById('ss-calendar-mode').style.display = 'none';
  document.getElementById('ss-slot-mode').style.display = 'block';
});

// ── CALENDAR ──
function ssGetMinDate() { var d = new Date(); d.setDate(d.getDate() + 14); return d; }

function ssInitCal() {
  var m = ssGetMinDate();
  ssCal.year = m.getFullYear(); ssCal.month = m.getMonth();
  var lbl = document.getElementById('ss-min-date');
  if (lbl) lbl.textContent = m.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
  ssRenderCal();
}

function ssRenderCal() {
  var grid = document.getElementById('ss-cal-grid');
  if (!grid) return;
  grid.innerHTML = '';
  var y = ssCal.year, m = ssCal.month, min = ssGetMinDate();
  min.setHours(0, 0, 0, 0);

  // Nav
  var nav = document.createElement('div');
  nav.style.cssText = 'grid-column:1/-1;display:flex;align-items:center;gap:10px;margin-bottom:7px;';
  var prev = document.createElement('button'); prev.textContent = '‹'; prev.className = 'ss-cal-nav-btn'; prev.type = 'button';
  prev.onclick = function() { ssCal.month--; if (ssCal.month < 0) { ssCal.month = 11; ssCal.year--; } ssRenderCal(); };
  var next = document.createElement('button'); next.textContent = '›'; next.className = 'ss-cal-nav-btn'; next.type = 'button';
  next.onclick = function() { ssCal.month++; if (ssCal.month > 11) { ssCal.month = 0; ssCal.year++; } ssRenderCal(); };
  var ml = document.createElement('span'); ml.className = 'ss-month-label'; ml.textContent = y + '. ' + SS_HU_MONTHS[m];
  nav.appendChild(prev); nav.appendChild(ml); nav.appendChild(next);
  grid.appendChild(nav);

  // Day headers
  SS_HU_DAYS.forEach(function(d) { var h = document.createElement('div'); h.className = 'ss-cal-hdr'; h.textContent = d; grid.appendChild(h); });

  // Offset
  var fd = new Date(y, m, 1).getDay();
  var off = (fd === 0) ? 6 : fd - 1;
  for (var i = 0; i < off; i++) { var e = document.createElement('div'); e.className = 'ss-cal-day ss-empty'; grid.appendChild(e); }

  // Days
  var dim = new Date(y, m + 1, 0).getDate();
  for (var dd = 1; dd <= dim; dd++) {
    var date = new Date(y, m, dd), wd = date.getDay();
    var ok = [1, 3].indexOf(wd) !== -1, before = date < min;
    var iso = y + '-' + String(m + 1).padStart(2, '0') + '-' + String(dd).padStart(2, '0');
    var cell = document.createElement('div'); cell.textContent = dd; cell.className = 'ss-cal-day';
    if (!ok || before) { cell.classList.add('ss-disabled'); }
    else {
      if (iso === ssCal.selDate) cell.classList.add('ss-selected');
      (function(iv, dobj) {
        cell.onclick = function() {
          ssCal.selDate = iv;
          document.getElementById('ss-sel-date').textContent = '— ' + dobj.toLocaleDateString('hu-HU', { month: 'long', day: 'numeric', weekday: 'long' });
          ssRenderCal(); ssRenderTimes();
          document.getElementById('ss-time-slots').style.display = 'block';
        };
      })(iso, date);
    }
    grid.appendChild(cell);
  }
}

function ssRenderTimes() {
  var grid = document.getElementById('ss-time-grid');
  if (!grid) return;
  grid.innerHTML = '';
  ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].forEach(function(t) {
    var btn = document.createElement('button'); btn.type = 'button'; btn.textContent = t; btn.className = 'ss-time-btn';
    if (t === ssCal.selTime) btn.classList.add('selected');
    btn.onclick = function() { ssCal.selTime = t; ssRenderTimes(); ssBuildSummary(); };
    grid.appendChild(btn);
  });
}

// ── SUMMARY BUILDER ──
function ssBuildSummary() {
  var summary = document.getElementById('ss-summary');
  var rows = [];

  // Name
  var ln = document.getElementById('ss-lastname').value.trim();
  var fn = document.getElementById('ss-firstname').value.trim();
  rows.push({ label: 'Név', value: ln + ' ' + fn, step: 1 });

  // Contact
  rows.push({ label: 'Email', value: document.getElementById('ss-email').value.trim(), step: 1 });
  rows.push({ label: 'Telefon', value: document.getElementById('ss-phone').value.trim(), step: 1 });

  // Skin + Hair
  var fitzData = ssWizard.selFitz ? SS_FITZ[ssWizard.selFitz - 1] : null;
  var hairData = ssWizard.selHair ? SS_HAIR[ssWizard.selHair - 1] : null;
  if (fitzData) rows.push({ label: 'Bőrtípus', value: fitzData.type, step: 0 });
  if (hairData) rows.push({ label: 'Szőrszín', value: hairData.type, step: 0 });

  // Treatments
  var treatments = [];
  document.querySelectorAll('[name="ss_kezelesek[]"]:checked').forEach(function(cb) { treatments.push(cb.value); });
  if (treatments.length) rows.push({ label: 'Kezelés', value: treatments.join(', '), step: 3 });

  // Appointment
  if (ssApptMode === 'calendar' && ssCal.selDate) {
    var appt = ssCal.selDate + (ssCal.selTime ? ' ' + ssCal.selTime : '');
    rows.push({ label: 'Preferált időpont', value: appt, step: 4 });
  } else if (ssApptMode === 'slot') {
    var slots = [];
    document.querySelectorAll('[name="ss_idosav[]"]:checked').forEach(function(cb) { slots.push(cb.value); });
    if (slots.length) rows.push({ label: 'Elérhető időpontok', value: slots.join(', '), step: 4 });
  }

  // Render
  summary.innerHTML = rows.map(function(r) {
    return '<div class="ss-summary-row">' +
      '<div><span class="ss-summary-label">' + r.label + '</span></div>' +
      '<div><span class="ss-summary-value">' + r.value + '</span>' +
      '<span class="ss-summary-edit" onclick="ssWizard.goToStep(' + r.step + ')">Szerkesztés</span></div>' +
      '</div>';
  }).join('');
}

// ── BUILD SUMMARY ON STEP 5 ENTRY ──
var origGoToStep = ssWizard.goToStep;
ssWizard.goToStep = function(step) {
  origGoToStep.call(this, step);
  if (step === 4) {
    ssInitCal();
    ssBuildSummary();
    // Update submit button text
    var btn = document.getElementById('ss-submit-btn');
    btn.textContent = this.isEligible ? 'Küldés →' : 'Konzultációt kérek →';
  }
};

// ── SUBMIT ──
var SS_WEBHOOK_URL = 'https://YOUR-N8N-INSTANCE.com/webhook/PLACEHOLDER';

document.getElementById('ss-submit-btn').addEventListener('click', function() {
  var btn = this;
  var errEl = document.getElementById('ss-submit-error');
  errEl.style.display = 'none';
  btn.disabled = true; btn.textContent = 'Küldés...';

  var payload = {
    fitzpatrick_type: ssWizard.selFitz,
    hair_color: ssWizard.selHair,
    compatibility: ssWizard.compatCode,
    vezeteknev: document.getElementById('ss-lastname').value.trim(),
    keresztnev: document.getElementById('ss-firstname').value.trim(),
    email: document.getElementById('ss-email').value.trim(),
    telefon: document.getElementById('ss-phone').value.trim(),
    szortelenites: (document.querySelector('[name="ss_szortelenites"]:checked') || {}).value || '',
    fenyerzekeny: (document.querySelector('[name="ss_fenyerzekeny"]:checked') || {}).value || '',
    borbetegseg: (document.querySelector('[name="ss_borbetegseg"]:checked') || {}).value || '',
    nem: (document.querySelector('[name="ss_nem"]:checked') || {}).value || '',
    kivalasztott_kezelesek: [],
    idopont_tipus: ssApptMode,
    appointment_date: ssCal.selDate || '',
    appointment_time: ssCal.selTime || '',
    idosavok: [],
    bekuldes_datum: new Date().toLocaleString('hu-HU')
  };

  document.querySelectorAll('[name="ss_kezelesek[]"]:checked').forEach(function(cb) {
    payload.kivalasztott_kezelesek.push(cb.value);
  });
  document.querySelectorAll('[name="ss_idosav[]"]:checked').forEach(function(cb) {
    payload.idosavok.push(cb.value);
  });

  // In standalone preview mode, log and show
  if (window.location.protocol === 'file:') {
    console.log('WEBHOOK PAYLOAD:', JSON.stringify(payload, null, 2));
    alert('Preview mode — payload logged to console.');
    btn.disabled = false; btn.textContent = ssWizard.isEligible ? 'Küldés →' : 'Konzultációt kérek →';
    return;
  }

  fetch(SS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(res) {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    window.location.href = '/koszonjuk';
  })
  .catch(function(err) {
    errEl.textContent = 'Hiba történt a küldés során. Kérjük próbáld újra, vagy hívj minket!';
    errEl.style.display = 'block';
    btn.disabled = false; btn.textContent = ssWizard.isEligible ? 'Küldés →' : 'Konzultációt kérek →';
  });
});
```

- [ ] **Step 3: Verify in browser**

Navigate to Step 5. Expected: Appointment toggle (calendar vs slots), calendar renders with Mon/Wed only, time slots appear on date click, slot mode shows 4 checkbox pills. Summary card shows all previously entered data. Submit button shows "Küldés →" (or "Konzultációt kérek →" if not eligible). In file:// mode, submit logs to console.

- [ ] **Step 4: Commit**

```bash
git add forms/form-wizard.html
git commit -m "feat: Step 5 — calendar, slot picker, summary card, submit with webhook"
```

---

### Task 8: Modal Overlay System

**Files:**
- Modify: `forms/form-wizard.html` (add modal init JS)

Wire up the modal backdrop: any element with `data-ss-form="open"` opens the form as an overlay, close on X/ESC/backdrop click, body scroll lock.

- [ ] **Step 1: Add modal JS after the submit handler**

```js
// ══════════════════════════════════════════
// MODAL SYSTEM
// ══════════════════════════════════════════

(function() {
  var backdrop = document.getElementById('ss-modal-backdrop');
  var closeBtn = document.getElementById('ss-modal-close');
  var formRoot = document.getElementById('ss-form-root');

  function openModal() {
    // Move form root inside backdrop
    backdrop.appendChild(formRoot);
    backdrop.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.style.display = 'none';
    document.body.style.overflow = '';
    // Move form root back to body
    document.body.insertBefore(formRoot, backdrop);
  }

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Backdrop click (not on form itself)
  if (backdrop) backdrop.addEventListener('click', function(e) {
    if (e.target === backdrop) closeModal();
  });

  // ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && backdrop.style.display === 'flex') closeModal();
  });

  // Open triggers — any element with data-ss-form="open"
  document.addEventListener('click', function(e) {
    var trigger = e.target.closest('[data-ss-form="open"]');
    if (trigger) { e.preventDefault(); openModal(); }
  });
})();
```

- [ ] **Step 2: Verify in browser**

To test modal mode: temporarily add a button before `#ss-form-root`:
```html
<button data-ss-form="open">Open Form</button>
```
Expected: clicking button opens form in overlay with dark backdrop + blur. X closes. ESC closes. Clicking backdrop closes. Body scroll locked while open.

- [ ] **Step 3: Commit**

```bash
git add forms/form-wizard.html
git commit -m "feat: modal overlay system — open/close, ESC, backdrop click, scroll lock"
```

---

### Task 9: PHP REST API Endpoint for Dynamic Pricing

**Files:**
- Create: `forms/wp-pricing-api.php`

This is a standalone PHP snippet to be copy-pasted into WPCode. It registers a REST API route that reads all Dynamic Seasonal Pricing posts and returns them as JSON.

- [ ] **Step 1: Create the PHP snippet**

```php
<?php
/**
 * SkinSpirit Dynamic Pricing REST API
 * Copy this into WPCode as a PHP snippet.
 * Endpoint: /wp-json/skinspirit/v1/prices
 */

add_action('rest_api_init', function() {
    register_rest_route('skinspirit/v1', '/prices', array(
        'methods'  => 'GET',
        'callback' => 'skinspirit_get_prices',
        'permission_callback' => '__return_true',
    ));
});

function skinspirit_get_prices() {
    // Query all Dynamic Seasonal Pricing posts
    // The post type is 'seasonal_pricing' — adjust if your plugin uses a different slug
    $posts = get_posts(array(
        'post_type'      => 'seasonal_pricing',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ));

    $today = date('m-d');
    $results = array();

    foreach ($posts as $post) {
        $slug       = $post->post_name;
        $base_price = intval(get_post_meta($post->ID, 'base_price', true));
        $sale_price = intval(get_post_meta($post->ID, 'sale_price', true));
        $periods    = get_post_meta($post->ID, 'seasonal_periods', true);

        $is_on_sale    = false;
        $active_period = null;

        // Check if any period is active today
        if ($periods && is_string($periods)) {
            $lines = explode("\n", trim($periods));
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line)) continue;
                // Format: "Name | MM-DD > MM-DD" or "MM-DD > MM-DD"
                if (preg_match('/(\d{2}-\d{2})\s*>\s*(\d{2}-\d{2})/', $line, $m)) {
                    $start = $m[1];
                    $end   = $m[2];
                    // Handle year-wrapping periods (e.g., 11-24 > 01-28)
                    if ($start <= $end) {
                        $is_active = ($today >= $start && $today <= $end);
                    } else {
                        $is_active = ($today >= $start || $today <= $end);
                    }
                    if ($is_active) {
                        $is_on_sale = true;
                        // Extract period name if present
                        if (preg_match('/^([^|]+)\|/', $line, $nm)) {
                            $active_period = trim($nm[1]);
                        }
                        break;
                    }
                }
            }
        }

        $results[] = array(
            'slug'          => $slug,
            'base_price'    => $base_price,
            'sale_price'    => $sale_price,
            'is_on_sale'    => $is_on_sale,
            'active_period' => $active_period,
        );
    }

    return rest_ensure_response($results);
}
```

- [ ] **Step 2: Add comment at top of file with WPCode instructions**

The file already has the WPCode comment. Verify it's clear.

- [ ] **Step 3: Commit**

```bash
git add forms/wp-pricing-api.php
git commit -m "feat: PHP REST API endpoint for dynamic pricing — WPCode snippet"
```

---

### Task 10: Final Polish — Review, Test All Flows, Clean Up

**Files:**
- Modify: `forms/form-wizard.html` (any final fixes)

- [ ] **Step 1: Test complete happy path in browser**

1. Open `forms/form-wizard.html`
2. Step 1: Select Fitzpatrick III + Sötétbarna hair → "Alkalmas" compat → Tovább
3. Step 2: Fill name/email/phone → Tovább
4. Step 3: Answer all 3 questions (Borotva, Nem szedek, Nem) → Tovább
5. Step 4: Select Nő, pick Comfort bérlet → Tovább
6. Step 5: Pick calendar date + time → verify summary → Küldés (console log in preview)

Expected: smooth transitions, progress bar updates, summary shows all data, no console errors.

- [ ] **Step 2: Test not-eligible flow**

1. Step 1: Select Fitzpatrick I + Fehér/Ősz hair → "Nem alkalmas" + "Nézd meg az árainkat" link
2. Click link → jumps to Step 4
3. Select treatments → continue to Step 5
4. Submit button shows "Konzultációt kérek →"

- [ ] **Step 3: Test mobile responsive**

Open in browser with DevTools mobile view (375px width). Verify:
- Tone grid: 3 columns
- Package grid: 1 column
- Name row: stacked
- All touch targets ≥ 44px
- No horizontal overflow

- [ ] **Step 4: Test Back navigation**

Navigate forward to Step 3, then back to Step 1. Verify: selections preserved, progress bar updates correctly, animations play in both directions.

- [ ] **Step 5: Fix any issues found**

Apply fixes as needed.

- [ ] **Step 6: Final commit**

```bash
git add forms/form-wizard.html
git commit -m "feat: form wizard complete — all 5 steps, progress bar, animations, modal, dynamic pricing v1"
```

---

## Notes for WP Deployment

After the form is verified locally:

1. **WPCode Snippet #1 (Form):** Copy everything between `<style>...</style>` and `<script>...</script>` from `form-wizard.html` into a WPCode HTML snippet. Set to load on the target page only.
2. **WPCode Snippet #2 (API):** Copy `wp-pricing-api.php` content into a WPCode PHP snippet. Set to run everywhere (REST API needs to be globally available).
3. **Pricing posts:** Verify all treatment slugs exist as published posts in the Dynamic Seasonal Pricing plugin. Create missing ones.
4. **Webhook URL:** Replace `SS_WEBHOOK_URL` placeholder with actual n8n webhook URL.
5. **Thank-you page:** Create `/koszonjuk` page in WordPress.
6. **Modal triggers:** Add `data-ss-form="open"` attribute to any CTA buttons on the site.
