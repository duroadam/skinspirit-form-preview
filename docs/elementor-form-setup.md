# SkinSpirit — Elementor Form Setup Útmutató

## Elrendezés az oldalon

```
[HTML Widget]   → fitzpatrick-slider.html
[HTML Widget]   → hair-slider.html
[Form Widget]   → (ez az útmutató)
[HTML Widget]   → eligibility-form.html (alkalmassági logika + naptár)
```

---

## Form mezők — sorrendben

### Mező 1: Vezetéknév
- **Típus**: Text
- **Label**: Vezetéknév
- **Field ID**: `vezeteknev`
- **Required**: Igen

### Mező 2: Keresztnév
- **Típus**: Text
- **Label**: Keresztnév
- **Field ID**: `keresztnev`
- **Required**: Igen

### Mező 3: Mivel szőrtelenítesz?
- **Típus**: Radio
- **Label**: Mivel szőrtelenítesz jelenleg?
- **Field ID**: `szortelenites`
- **Options**:
  - Borotva
  - Epilátor
  - Gyanta
  - Csipesz
- **Required**: Igen

### Mező 4: Fényérzékeny gyógyszer
- **Típus**: Radio
- **Label**: Szedel fényérzékeny gyógyszert?
- **Field ID**: `fenyerzekeny`
- **Options**:
  - Igen
  - Nem szedek
- **Required**: Igen

### Mező 5: Aktív bőrbetegség
- **Típus**: Radio
- **Label**: Van aktív bőrbetegséged? (szőrtüszőgyulladás nem zárja ki)
- **Field ID**: `borbetegseg`
- **Options**:
  - Igen
  - Nem
- **Required**: Igen

### Mező 6: Nem
- **Típus**: Radio
- **Label**: Nemed
- **Field ID**: `nem`
- **Options**:
  - Nő
  - Férfi
- **Required**: Igen

### Mező 7: Érdeklődés típusa
- **Típus**: Radio
- **Label**: Mi érdekli?
- **Field ID**: `erdeklodes`
- **Options**:
  - Bérlet
  - Egyedi kezelés
- **Required**: Igen

---

### Mező 8: Bérlet — Nő *(conditional)*
- **Típus**: Select
- **Label**: Melyik bérlet érdekli?
- **Field ID**: `berlet_no`
- **Conditional Logic**: Show if `nem` = `Nő` AND `erdeklodes` = `Bérlet`
- **Options**:
  - Női SOFT bérlet — hónalj + intim (240 000 Ft / 6 kezelés)
  - Női COMFORT bérlet — hónalj + intim + lábszár + comb (570 000 Ft / 6 kezelés)
  - Női PREMIUM bérlet — teljes kar + teljes láb + intim + hónalj (720 000 Ft / 6 kezelés)

### Mező 9: Bérlet — Férfi *(conditional)*
- **Típus**: Select
- **Label**: Melyik bérlet érdekli?
- **Field ID**: `berlet_ferfi`
- **Conditional Logic**: Show if `nem` = `Férfi` AND `erdeklodes` = `Bérlet`
- **Options**:
  - Férfi SOFT bérlet (390 000 Ft / 6 kezelés / 2 testrész)
  - Férfi COMFORT bérlet (540 000 Ft / 6 kezelés / 4 testrész)
  - Férfi PREMIUM bérlet (1 120 000 Ft / 6 kezelés / 6 testrész)

### Mező 10: Egyedi kezelés — Nő *(conditional)*
- **Típus**: Select
- **Label**: Melyik testrész érdekli?
- **Field ID**: `kezeles_no`
- **Conditional Logic**: Show if `nem` = `Nő` AND `erdeklodes` = `Egyedi kezelés`
- **Options**:
  - Női hónalj (115 000 Ft / 6 kezelés)
  - Női intim (180 000 Ft / 6 kezelés)
  - Női arc (225 000 Ft / 6 kezelés)
  - Női lábszár (270 000 Ft / 6 kezelés)
  - Női comb (270 000 Ft / 6 kezelés)
  - Női alkar (138 000 Ft / 6 kezelés)
  - Női fenék (270 000 Ft / 6 kezelés)
  - Női lábfej (120 000 Ft / 6 kezelés)

### Mező 11: Egyedi kezelés — Férfi *(conditional)*
- **Típus**: Select
- **Label**: Melyik testrész érdekli?
- **Field ID**: `kezeles_ferfi`
- **Conditional Logic**: Show if `nem` = `Férfi` AND `erdeklodes` = `Egyedi kezelés`
- **Options**:
  - Férfi hát (300 000 Ft / 6 kezelés)
  - Férfi nyak, váll (250 000 Ft / 6 kezelés)
  - Férfi intim (240 000 Ft / 6 kezelés)
  - Férfi mellkas (240 000 Ft / 6 kezelés)
  - Férfi has (225 000 Ft / 6 kezelés)
  - Férfi kézfej (120 000 Ft / 6 kezelés)
  - Férfi hónalj (145 000 Ft / 6 kezelés)
  - Férfi fenék (270 000 Ft / 6 kezelés)

---

### Mező 12: Email
- **Típus**: Email
- **Label**: Email cím
- **Field ID**: `email`
- **Required**: Igen

### Mező 13: Telefonszám
- **Típus**: Tel
- **Label**: Telefonszám
- **Field ID**: `telefon`
- **Required**: Igen

### Mező 14: Szándék
- **Típus**: Radio
- **Label**: Mit szeretnél?
- **Field ID**: `szandek`
- **Options**:
  - Időpontot foglalok
  - Telefonos konzultációt kérek
- **Required**: Igen

---

## Submit gomb
- **Label**: Küldés →
- **Actions After Submit**:
  1. Webhook → n8n URL (később töltendő ki)
  2. Email (ha kell visszaigazoló — opcionális, az n8n küldi)

---

## Hidden Fields (a JS widget-ekből jönnek)
Ezeket NEM kell Elementor-ban létrehozni — a JS widgetek töltik ki:
- `fitzpatrick_type` — bőrtípus (1-6)
- `hair_color` — szőrszín (1-6)
- `appointment_date` — foglalt dátum
- `appointment_time` — foglalt időpont

Ha a webhook ezeket is meg akarja kapni, adj hozzá Hidden típusú mezőket ugyanezekkel a Field ID-kkel.

---

## Conditional Logic beállítása Elementor-ban

Minden conditional mezőnél:
1. Kattints a mezőre → bal oldali panel → **Conditional Logic** fül
2. Kapcsold be: **Enable Conditions**
3. Add meg: `Field` = `nem` / `Operator` = `Is` / `Value` = `Nő` (vagy Férfi)
4. **+ Add Condition** → `Field` = `erdeklodes` / `Operator` = `Is` / `Value` = `Bérlet` (vagy Egyedi kezelés)
5. Condition Type: **All conditions** (AND logika)
