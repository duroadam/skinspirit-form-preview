# SkinSpirit Form Wizard Redesign

**Date:** 2026-03-27
**Status:** Design spec
**Approach:** Single-page wizard, vanilla HTML/CSS/JS, WPCode snippet

---

## Overview

Redesign the existing `forms/form-preview.html` eligibility + booking form into a polished, step-by-step wizard that feels like a luxury experience rather than a questionnaire. The form submits to an n8n webhook (Supabase mapping) and redirects to a `/koszonjuk` thank-you page.

## Deployment

- **Inline mode:** WPCode snippet on a dedicated WP page (e.g. `/konzultacio`)
- **Modal mode:** Any button/link with `data-ss-form="open"` opens the form as a fullscreen overlay (backdrop blur, X close, ESC close)
- Same codebase for both modes; modal wrapper is an optional layer

## Wizard Steps

### Step 1 — Bortipus & Szorszin

- Fitzpatrick skin type tile selector (6 tiles)
- Hair color tile selector (6 tiles)
- Compatibility result box (OK / Consult / Special / Not OK)
- **Not OK case:** Message shown, but with a "Nezd meg az arainkat" link that jumps to Step 4 (treatment picker). Submit button text changes to "Konzultaciot kerek" instead of "Kuldes".
- **Next enabled when:** Both skin and hair selected

### Step 2 — Szemelyes adatok

- Vezeteknev + Keresztnev (side by side)
- Email
- Telefonszam
- All fields required, autocomplete attributes preserved
- **Next enabled when:** All 4 fields filled, email format valid

### Step 3 — Kerdesek

- "Mivel szorteleniresz jelenleg?" — radio pills (Borotva, Epilator, Gyanta, Csipesz, Krem)
- "Szedsz fenyerzekeny gyogyszert?" — radio pills (Igen, Nem szedek)
- "Van-e aktiv borbetegseged?" — radio pills (Igen, Nem)
- **Next enabled when:** All 3 questions answered
- **Eligibility check runs here:** if medication=Igen or skin disease=Igen, flag for result in Step 5

### Step 4 — Kezeles valaszto

- Gender selector (No / Ferfi) — shows appropriate treatment list
- Session toggle: "6 alkalom" / "1 alkalom"
- **Packages:** 3 cards (Soft / Comfort / Premium) with checkboxes — multi-select
- **Individual treatments:** pill-style checkboxes — multi-select
- **Prices are dynamic** — fetched from WP REST API at form load (see Dynamic Pricing section)
- **Next enabled when:** Gender selected + at least 1 treatment chosen

### Step 5 — Idopont & Osszegzo & Kuldes

**Appointment preference** — toggle between two modes:
- **"Valassz konkret napot"** — Calendar picker (Mon + Wed only, min 14 days out). Title: "Preferalt idopont". Subtitle: "Visszaigazolast kuldunk telefonon vagy emailben". Time slots: 09:00-17:00 hourly.
- **"Jelold mikor ersz ra"** — Checkbox pills: "Hetfo delelott (9-12)", "Hetfo delutan (13-17)", "Szerda delelott (9-12)", "Szerda delutan (13-17)"

**Summary card** (before submit button):
- Name, email, phone
- Skin type + hair color + compatibility status
- Selected treatment(s) + price
- Preferred appointment
- Each row has "Szerkesztes" link → navigates back to that step

**Submit button:**
- Normal: "Kuldes"
- Not-eligible users: "Konzultaciot kerek"
- On click: POST to n8n webhook (placeholder URL)
- Success: redirect to `/koszonjuk`
- Error: inline error message, no redirect

---

## Progress Bar

- 5 dots/segments at top of form, connected by a thin line
- Active step: gold fill (`#bb9f6d`)
- Completed steps: gold outline with checkmark
- Upcoming: gray (`#EBE6DC`)
- Below dots: "1/5 — Bortipus" label, updates per step
- Smooth animated transitions between steps

---

## Header

- SkinSpirit logo (`forms/ss logo.png`) centered
- Title: "Ismerd meg a szamodra idealis kezelest"
- Subtitle: "2 perc, es kiderul melyik megoldas illik hozzad"
- No preview badge

---

## Animations

- **Step transition:** Current card fades + slides left (300ms ease), new card fades + slides in from right
- **Tile selection:** Subtle scale bounce (1.02x) + border color transition
- **Compatibility box:** Fade-in appearance
- **Progress bar:** Smooth width/fill transition
- **Modal open/close:** Backdrop fade (200ms) + form slide-up (300ms)

---

## Dynamic Pricing

### Problem

Prices are currently hardcoded in the form JS (`TREAT_NO`, `TREAT_FERFI`). They should come from the same source as the website prices — the **Dynamic Seasonal Pricing** WordPress plugin (custom post type with base price, sale price, and date-based periods).

### Solution

1. **PHP snippet (WPCode):** Register a REST API endpoint at `/wp-json/skinspirit/v1/prices`
2. **Endpoint returns:** JSON array of all pricing entries:
   ```json
   [
     {
       "slug": "noi-comfort-berlet-arak",
       "base_price": 690000,
       "sale_price": 570000,
       "is_on_sale": false,
       "active_period": null
     }
   ]
   ```
3. **Form JS:** On load, fetches this endpoint. Maps slugs to treatment cards. If `is_on_sale` is true, shows sale price (with strikethrough on base price).
4. **Slug mapping:** A config object in the form JS maps pricing slugs to treatment IDs:
   ```js
   var PRICE_MAP = {
     'noi-soft-berlet-arak': 'no-soft',
     'noi-comfort-berlet-arak': 'no-comfort',
     // ... etc
   };
   ```
5. **Fallback:** If the API call fails, hardcoded defaults are used (current prices as fallback).

### Slug naming convention needed

Each treatment and package needs a corresponding pricing post in WP. Convention:
- Packages: `noi-soft-berlet-arak`, `noi-comfort-berlet-arak`, `noi-premium-berlet-arak`, `ferfi-soft-berlet-arak`, etc.
- Singles: `noi-honalj-arak`, `noi-bikini-arak`, `ferfi-hat-arak`, etc.
- Each post has both `p1` (1 alkalom) and `p6` (6 alkalom) pricing — this may require two posts per treatment or extending the plugin to support two price fields.

**Note:** The exact slug list and whether the plugin needs extending will be determined during implementation when we audit all existing pricing posts.

---

## Modal Behavior

- **Trigger:** Any element with `data-ss-form="open"` attribute
- **Open:** Fullscreen overlay, backdrop with blur + dark tint, form centered (max-width 640px, scrollable)
- **Close:** X button (top-right), ESC key, click on backdrop
- **Body scroll:** Locked while modal is open
- **Animation:** Backdrop fade-in 200ms, form slide-up from bottom 300ms

---

## Form Submission Payload

```json
{
  "fitzpatrick_type": 3,
  "hair_color": 5,
  "compatibility": "OK",
  "vezeteknev": "Kovacs",
  "keresztnev": "Anna",
  "email": "kovacs.anna@email.hu",
  "telefon": "+36301234567",
  "szortelenites": "Borotva",
  "fenyerzekeny": "Nem szedek",
  "borbetegseg": "Nem",
  "nem": "No",
  "kivalasztott_kezelesek": ["Comfort berlet — 6 alkalom (570000 Ft)", "Honalj — 1 alkalom (23000 Ft)"],
  "idopont_tipus": "naptar",
  "appointment_date": "2026-04-14",
  "appointment_time": "14:00",
  "bekuldes_datum": "2026.03.27 15:30"
}
```

- **Webhook:** POST to n8n (placeholder URL, configurable)
- **Success:** Redirect to `/koszonjuk`
- **Error:** Inline error message below submit button

---

## Design Tokens (matching skinspirit.hu)

| Token | Value | Usage |
|-------|-------|-------|
| Gold | `#bb9f6d` | Active states, progress, accents |
| Dark gold | `#8B7346` | Hover, borders |
| Brown | `#685736` | Text, headings |
| Muted | `#978A73` | Secondary text, labels |
| Teal | `#627476` | Buttons, active pills |
| Cream bg | `#EBE6DC` | Page background, borders |
| Card bg | `#ffffff` | Card backgrounds |
| Light bg | `#f7f4ee` | Tile backgrounds |
| Font heading | Playfair Display | h1, feature text |
| Font body | Oswald | Everything else |

---

## Mobile Responsive

- Max-width 640px container (same as current)
- Tone grid: 3 columns under 460px
- Package grid: 1 column under 460px
- Name row: stacked under 460px
- Touch targets: minimum 44px height on all tappable elements
- Modal: full-screen on mobile (no margins)

---

## Files

| File | Purpose |
|------|---------|
| `forms/form-wizard.html` | Standalone preview/dev version |
| `forms/ss logo.png` | Logo asset |
| WPCode snippet #1 | The form HTML/CSS/JS for WordPress |
| WPCode snippet #2 | REST API endpoint for dynamic pricing |

---

## Out of Scope

- n8n webhook workflow (built separately after form is done)
- Supabase schema
- `/koszonjuk` thank-you page content/design
- Google Ads conversion tracking setup
- Actual calendar availability (appointments are preferences, not bookings)
