# SkinSpirit Google Ads Audit

**Dátum:** 2026. március 20.
**Vizsgált időszak:** 2025. november 30. – 2026. március 20. (111 nap)
**Fiók:** 303-937-9833 SkinSpirit
**Készítette:** Adam Duro (Trust The Process)

---

## Vezetői összefoglaló

A SkinSpirit Google Ads fiókja **kritikus állapotban van**. Az elmúlt 111 napban 388,323 Ft-ot költött a fiók 2,948 kattintásra, de **egyetlen konverziót sem rögzített**. Ez nem azt jelenti, hogy nem jöttek ügyfelek — hanem azt, hogy a rendszer nem méri őket.

A 2026. március 5-én élesbe állított új weboldal **nem tartalmaz Google tracking kódot**, így a Google Ads „vakon" fut: költi a pénzt, de nem tudja, melyik kattintás hoz ügyfelet. Emiatt nem tud optimalizálni, és az ügyfélszerzés drasztikusan visszaesett.

### A 3 legkritikusabb probléma

| # | Probléma | Hatás | Sürgősség |
|---|----------|-------|-----------|
| 1 | **Nincs Google Tag az új weboldalon** | 0 konverzió mérés, vak optimalizáció | AZONNALI |
| 2 | **"Maximise clicks" bidding stratégia** | Kattintásra optimalizál, nem ügyfélre | Magas |
| 3 | **Irreleváns keresések broad match miatt** | Pénz megy el értéktelen forgalomra | Magas |

**Becsült hatás a javítás után:** A tracking helyreállítása és a bidding stratégia váltása önmagában 20-40%-os hatékonyságnövekedést hozhat.

---

## 1. Fiók áttekintés

### 1.1 Kampány struktúra

| Kampány | Státusz | Napi budget | Bidding | Impr. | Kattintás | Költés (Ft) | CTR |
|---------|---------|-------------|---------|-------|-----------|-------------|-----|
| Élő kampány | Aktív | 2,500 Ft | Maximise clicks | 38,050 | 2,317 | 277,660 | 6.09% |
| Helyi kampány-3km | Aktív | 1,000 Ft | Maximise clicks | 5,972 | 631 | 110,663 | 10.57% |
| Landing | Aktív (de nem fut) | 3,000 Ft | Maximise clicks | 0 | 0 | 0 | — |
| Élő 201 Ft szep-okt | Szünetel | 2,000 Ft | Manual CPC | 0 | 0 | 0 | — |
| Biztonsági mentés | Szünetel | 2,500 Ft | Maximise clicks | 0 | 0 | 0 | — |
| Lézeres szőrtelenítő készülék | Szünetel | 753 Ft | Maximise clicks | 0 | 0 | 0 | — |
| **Összesen** | | | | **44,022** | **2,948** | **388,323** | **6.70%** |

**Megállapítások:**
- Csak 2 kampány fut ténylegesen, a többi szünetel vagy nem jogosult
- A "Landing" kampány **Enabled** státuszú, de minden ad group és ad szünetel benne — feleslegesen foglalja a helyet
- 6 kampányból 5 használ "Maximise clicks"-et — ez konverziókövetés nélkül a legrosszabb kombináció
- **Átlagos CPC: 132 Ft** — ez a magyar piacon elfogadható a szőrtelenítés szegmensben

### 1.2 Ad group struktúra

| Ad Group | Kampány | Impr. | Kattintás | CTR | Avg CPC |
|----------|---------|-------|-----------|-----|---------|
| Végleges szőrtelenítés - lézeres | Élő kampány | 37,034 | 2,204 | 5.95% | 120 Ft |
| Intim végleges szőrtelenítés | Élő kampány | 1,016 | 113 | 11.12% | 120 Ft |
| Intim végleges szőrtelenítés | Helyi kampány-3km | 5,972 | 631 | 10.57% | 175 Ft |

**Megállapítások:**
- Az intim szőrtelenítés ad group-ok **magasabb CTR-t** produkálnak (10-11% vs 6%) — ez erős intent
- De a Helyi kampány intim ad group CPC-je **46%-kal drágább** (175 vs 120 Ft) — valószínűleg a 3km-es geo targeting miatt szűkebb az aukció
- Az Élő kampány "Végleges szőrtelenítés" ad group viszi a forgalom 75%-át

---

## 2. KRITIKUS: Konverziókövetés

### 2.1 Jelenlegi helyzet

**A fiókban 7 konverziós cél van beállítva:**

| Konverziós cél | Kampányok | Status |
|----------------|-----------|--------|
| Submit lead form | 1/5 | Active |
| Phone call lead | 1/5 | Active |
| Contact | 1/5 | Active |
| Request quote | 1/5 | **Needs attention** ⚠️ |
| Get directions | 0/5 | Active |
| Engagement | 0/5 | Active |
| Page view | 0/5 | Active |

### 2.2 A probléma

Az új weboldal (skinspirit.hu, élesbe állítva: 2026.03.05.) **egyáltalán nem tartalmaz Google tracking kódot:**

- ❌ Nincs Google Tag (gtag.js)
- ❌ Nincs Google Tag Manager (GTM)
- ❌ Nincs Google Ads konverzió tracking
- ❌ Nincs GA4 (Google Analytics)
- ❌ Nincs Facebook Pixel
- ⚠️ Van PixelYourSite Free plugin, de Google Tag nélkül nem csinál semmit

**Következmény:** A konverziós célok "Active" státuszúak a Google Ads-ban, de a weboldalon nincs semmi ami tüzelné őket. Ezért **0 konverzió** az egész fiókban 111 nap alatt.

### 2.3 Becsült veszteség

- 388,323 Ft elköltve tracking nélkül
- A Google algoritmus nem tud tanulni → rossz kattintásokra is költ
- Becslés: konverziókövetéssel a költés 20-30%-a megtakarítható lenne (kb. 80,000-120,000 Ft)

### 2.4 Javítási terv

**1. lépés — Google Tag telepítése (5 perc)**
A WordPress weboldal fejlesztőjének kell:
- Google Site Kit plugin telepítése, VAGY
- Google Tag kód manuális beillesztése a `<head>` szekcióba

**2. lépés — Konverziós akciók ellenőrzése**
- "Submit lead form" → a form beküldés "köszönjük" oldalát kell beállítani konverziós oldalnak
- "Request quote" → "Needs attention" — újra kell konfigurálni
- "Phone call lead" → telefonszám kattintás tracking beállítása

**3. lépés — Tesztelés**
- Próba form kitöltés → megjelenik-e a konverzió a Google Ads-ban 24 órán belül?

---

## 3. Bidding stratégia

### 3.1 Jelenlegi helyzet

Mindkét aktív kampány **"Maximise clicks"** stratégiát használ.

### 3.2 Probléma

A "Maximise clicks" azt mondja a Google-nek: *"Hozz annyi kattintást amennyit tudsz."* Ez nem különböztet meg egy random kíváncsi embert és egy potenciális ügyfelet. A Google szívesen hoz olcsó, értéktelen kattintásokat.

### 3.3 Ajánlás

Amint a konverziókövetés működik és **legalább 15-30 konverzió** összegyűlt:
1. Váltás **"Maximise conversions"** stratégiára
2. Később, elég adat után: **Target CPA** (célzott konverziós költség) beállítása

**Fontos:** NE váltsunk bidding stratégiát ELŐBB, mint hogy a tracking működik! Különben a "Maximise conversions" ugyanúgy vakon fut.

---

## 4. Kulcsszó és keresési kifejezés elemzés

### 4.1 Aktív kulcsszavak teljesítménye (Élő kampány)

| Kulcsszó | Match type | Impr. | Katt. | CTR | CPC |
|----------|-----------|-------|-------|-----|-----|
| végleges szőrtelenítés | Broad | 8,156 | 333 | 4.08% | 120 Ft |
| "lézeres végleges szőrtelenítés" | Phrase | 3,448 | 314 | 9.11% | 119 Ft |
| [lézeres szőrtelenítés] | Exact | 3,205 | 108 | 3.37% | 120 Ft |
| lézeres szőrtelenítés | Broad | 6,614 | 253 | 3.83% | 122 Ft |
| "végleges szőrtelenítés" | Phrase | 4,074 | 277 | 6.80% | 123 Ft |
| "dióda lézeres szőrtelenítés" | Phrase | 2,105 | 167 | 7.93% | 127 Ft |
| lezeres szortelenites | Broad | 3,183 | 204 | 6.41% | 116 Ft |
| "lézeres szőreltávolítás" | Phrase | 1,802 | 150 | 8.32% | 111 Ft |
| "lézeres szőrtelenítés árak" | Phrase | 864 | 114 | 13.19% | 119 Ft |
| "intim végleges szőrtelenítés" | Phrase | 1,016 | 113 | 11.12% | 120 Ft |

**Jó jelek:**
- "lézeres szőrtelenítés árak" — 13.19% CTR, erős vásárlási szándék
- "intim végleges szőrtelenítés" — 11.12% CTR
- "dióda lézeres szőrtelenítés" — 7.93% CTR, specifikus technológia keresés

**Problémák:**
- A broad match kulcsszavak (végleges szőrtelenítés, lézeres szőrtelenítés) **alacsony CTR-t** hoznak (3-4%) — irreleváns keresésekre is megjelennek
- Az exact match [lézeres szőrtelenítés] csak 3.37% CTR — meglepően alacsony, ami gyenge ad copy-ra utal

### 4.2 Irreleváns keresések (waste)

A Search Terms reportból azonosított **pénzkidobás** kategóriák:

**Konkurens nevek (nem a ti ügyfeletek):**
- "bársony esztétika mom" → kattintás, 165 Ft
- "foreverderm life center" → kattintás, 172 Ft
- "perfect laser budapest" → 0 kattintás de megjelenés
- "everderm klinika budapest" → 0 kattintás de megjelenés
- "angel beauty clinic" → megjelenés

**Irreleváns szolgáltatások:**
- "sipoly kezelése műtét nélkül" → kattintás, 148 Ft (ORVOSI KERESÉS!)
- "fisztula műtét" → megjelenés (ORVOSI!)
- "esztétika orvosi központ" → megjelenés
- "dr derm" → megjelenés

**Otthoni megoldások (nem szalon ügyfelek):**
- "hair removal device intense pulsed light" → megjelenés
- "how to do a brazilian wax at home" → megjelenés
- "needle epilation" → megjelenés
- "epilar system" → megjelenés
- "sepiler" → megjelenés

**Angol nyelvű keresések (nem magyar ügyfelek):**
- "brazilian hair removal"
- "private part remove hair"
- "aesthetics clinic near me"
- "budapest beauty salon"
- "waxing brazilian waxing girl"

### 4.3 Negatív kulcsszó ajánlás

Anett március 20-án már hozzáadott 13 negatív kulcsszót — ez jó kezdet. De **további negatív kulcsszavak** szükségesek:

**Azonnal hozzáadandó negatív kulcsszavak (exact match):**

Orvosi/irreleváns:
- [sipoly]
- [fisztula]
- [tályog]
- [műtét]
- [orvos]
- [orvosi központ]
- [dr derm]
- [derma gene]

Konkurensek:
- [bársony esztétika]
- [bársonyklinika]
- [everderm]
- [foreverderm]
- [perfect laser]
- [angel beauty]
- [sky health]
- [király beauty]
- [skinlaser]
- [skintim]
- [zenon clinic]
- [salonic]
- [silky beauty]
- [aesthetica]
- [notino]
- [inglow]
- [braun]

Otthoni megoldások:
- [otthoni]
- [készülék]
- [device]
- [home]
- [gép]
- [vásárlás]

Angol irreleváns:
- [how to]
- [at home]
- [diy]
- [near me]
- [beauty salon]

Gyantázás (nem lézeres szolgáltatás):
- [gyantázás]
- [gyanta]

---

## 5. Hirdetések (Ad Creative) elemzés

### 5.1 Aktív hirdetések teljesítménye

| Hirdetés | Ad Strength | Impr. | Katt. | CTR | CPC |
|----------|------------|-------|-------|-----|-----|
| RSA #1 — Élő kampány, Végleges szőrt. | **Excellent** | 7,958 | 498 | 6.26% | 118 Ft |
| RSA #2 — Élő kampány, Végleges szőrt. | **Average** | 12,932 | 751 | 5.81% | 117 Ft |
| ETA #1 — Élő kampány, Végleges szőrt. | — | 8,122 | 499 | 6.14% | 123 Ft |
| ETA #2 — Élő kampány, Végleges szőrt. | — | 8,022 | 456 | 5.68% | 122 Ft |
| RSA — Élő kampány, Intim szőrt. | **Excellent** | 1,016 | 113 | 11.12% | 120 Ft |
| RSA — Helyi kampány, Intim szőrt. | **Good** | 5,972 | 631 | 10.57% | 175 Ft |

### 5.2 Megállapítások

**Pozitív:**
- Az Excellent ad strength RSA-k jól teljesítenek
- Az intim szőrtelenítés hirdetések kiemelkedő CTR-t hoznak (10-11%)
- A {Keyword:...} dinamikus beillesztés jól működik

**Javítandó:**
- Az "Average" RSA (#2) a legtöbb megjelenést kapja, de a CTR-je a legalacsonyabb (5.81%) — a Google ezt preferálja mert több impression-t generál, de nem feltétlenül a legjobb
- Régi **Expanded Text Ad-ok** (ETA) még futnak — ezeket 2022 óta nem lehet szerkeszteni, de még aktívak. Érdemes idővel lecserélni őket RSA-kra
- A "50%-os kupon" üzenet **mindenhol** van — ha ez már nem aktuális akció, meg kell változtatni
- Az Average ad strength RSA javítása: "Try including more keywords in your descriptions; Add 2 more sitelinks"

### 5.3 Landing page probléma

A hirdetések különböző oldalakra visznek:

| Landing page | Kattintás | CTR | Megjegyzés |
|-------------|-----------|-----|------------|
| https://skinspirit.hu/ | 1,177 | 5.63% | Főoldal |
| http://skinspirit.hu/ | 916 | 5.67% | **HTTP!** Régi URL |
| skinspirit.hu/intim-vegleges-szortelenites-kezelesek/ | 519 | 10.14% | Intim oldal |
| skinspirit.hu/noi-intim-vegleges-lezeres-szortelenites/ | 79 | 8.33% | Női intim |
| skinspirit.hu/vegleges-szortelenites-arlista/index.html | 44 | 0.54% | **Árlista — 0.54% CTR!** |
| skinspirit.hu/rolunk/index.html | 10 | 0.10% | **Rólunk — 0.10% CTR!** |
| skinspirit.hu/gyik/index.html | 58 | 0.57% | **GYIK — 0.57% CTR!** |
| skinspirit.hu/kapcsolat/index.html | 6 | 0.07% | **Kapcsolat — 0.07% CTR!** |

**Kritikus problémák:**
1. **HTTP és HTTPS keverés** — régi http:// URL-ek még futnak a hirdetésekben. Ezeket HTTPS-re kell cserélni
2. **Sitelink-ek rossz oldalakra visznek** — a Rólunk, GYIK, Kapcsolat, Árlista oldalak **extrém alacsony CTR-t** produkálnak (0.07-0.57%). Ezeket lecserélni értékesebb sitelink-ekre
3. Egy hibás URL is van: `intim-vegleges-szortelenites-kezelesek/{ignore}?https://...` — ez broken redirect, 101 kattintás ment rá

---

## 6. Kompetitív pozíció (Auction Insights)

| Versenytárs | Impression Share | Top of Page | Abs. Top | Outranking Share |
|------------|-----------------|-------------|----------|-----------------|
| **aesthetica.hu** | **45.65%** | 84.48% | 38.44% | 14.40% |
| **barsony.hu** | **23.61%** | 94.13% | 45.39% | 17.26% |
| **SkinSpirit (Ti)** | **22.82%** | 67.22% | 11.93% | — |
| braun.hu | 13.26% | 87.79% | 19.61% | 20.92% |
| skintim.hu | 11.85% | 82.78% | 26.83% | 20.57% |

### Megállapítások

- **aesthetica.hu dominál** — kétszer akkora impression share-rel (46% vs 23%)
- **barsony.hu a 2.** — hasonló méretű, de sokkal agresszívebb pozícionálás (94% top of page, 45% abs top)
- **SkinSpirit a 3.** pozícióban van, de:
  - **Top of page: csak 67%** — a versenytársak 80-94%-on vannak
  - **Absolute top: csak 12%** — bársony 45%-on, aesthetica 38%-on
  - Ez azt jelenti, hogy a SkinSpirit hirdetései ritkán jelennek meg a legelső helyen

**Miért?** A "Maximise clicks" stratégia inkább olcsó pozíciókat keres → több kattintás, de rosszabb pozíció. Konverzió-alapú bidding magasabb pozíciót is megengedne, ha az algoritmus látja hogy az megéri.

---

## 7. Eszköz és demográfiai adatok

### 7.1 Eszközök

| Eszköz | Impr. | Katt. | CTR | Költés |
|--------|-------|-------|-----|--------|
| Mobil | 43,605 | 2,921 | 6.70% | 384,321 Ft |
| Tablet | 417 | 27 | 6.47% | 4,003 Ft |
| Számítógép | 0 | 0 | — | 0 Ft |

**A desktop (számítógép) -100% bid adjustment-tel ki van zárva** mindegyik kampányból. Ez **nem feltétlenül jó döntés** — a konverziókövetés hiányában nem tudjuk, hogy desktop-ról jönnek-e konverziók. Javasolt: a tracking helyreállítása után tesztelni desktop forgalommal is.

### 7.2 Demográfia

| Célcsoport | Arány | Megjegyzés |
|-----------|-------|------------|
| Nők | 78% | Fő célcsoport — helyes |
| Férfiak | 22% | Intim szőrtelenítés férfiaknak is releváns |
| 25-34 év | 35% | Legnagyobb szegmens |
| 35-44 év | 24% | Második legnagyobb |
| 45-54 év | 20% | Szignifikáns |
| 18-24 év | 8% | Kisebb, de nem elhanyagolható |

A demográfiai eloszlás **egészséges** — a fő célcsoport (25-44 éves nők) kapja a forgalom nagy részét.

### 7.3 Napszak elemzés

**Csúcsidők (legtöbb megjelenés):**
- 19:00-22:00 — kiugró forgalom (esti böngészés)
- 13:00-18:00 — stabil délutáni forgalom

**Holt idő:**
- 02:00-06:00 — szinte nulla forgalom (helyes, a hirdetések nem futnak)

A hirdetésütemezés jól van beállítva — az Élő kampány hajnali 2-ig és 6:30-tól fut, ami lefedi a csúcsidőket.

---

## 8. Geo targeting

| Célterület | Kampány | Impr. | Katt. |
|-----------|---------|-------|-------|
| Budapest | Élő kampány | 38,051 | 2,317 |
| 3km sugár (Hun utca 4) | Helyi kampány | 5,973 | 631 |

**Megállapítás:** Az Élő kampány egész Budapestet célozza, a Helyi kampány 3km sugarú kört a szalon körül. Ez logikus felépítés, de:
- A Helyi kampány **magasabb CPC-t** fizet (175 vs 120 Ft) — valószínűleg a szűk geo targeting miatt
- Érdemes lehet a Helyi kampányt **5km-re bővíteni** ha a 3km-es sugár túl szűk

---

## 9. Összesített akcióterv

### AZONNALI (ezen a héten)

| # | Teendő | Felelős | Becsült hatás |
|---|--------|---------|---------------|
| 1 | **Google Tag telepítése az új weboldalra** | WP fejlesztő / Adam | Konverzió mérés helyreállítása |
| 2 | **Konverziós akciók ellenőrzése** — "Request quote" javítása, form submit tracking tesztelése | Anett + WP fejlesztő | Konverziók rögzítése |
| 3 | **HTTP URL-ek cseréje HTTPS-re** a hirdetésekben | Anett | Jobb landing page élmény |
| 4 | **Broken redirect javítása** (intim oldal {ignore} URL) | Anett | 101 kattintás/időszak megmentése |

### RÖVID TÁVÚ (1-2 hét)

| # | Teendő | Felelős | Becsült hatás |
|---|--------|---------|---------------|
| 5 | **Negatív kulcsszó lista bővítése** — orvosi, konkurens, otthoni, angol kifejezések | Anett / Adam | 10-15% waste csökkentés |
| 6 | **Sitelink-ek frissítése** — Rólunk/GYIK/Kapcsolat helyett akciós/árlista/foglalás | Anett | CTR javulás |
| 7 | **"Landing" kampány kikapcsolása** — Enabled de nem fut, zavaró | Anett | Tisztább fiók |
| 8 | **Desktop bid adjustment feloldása** — tesztelés -50%-kal 0% helyett -100% | Anett | Új forgalmi forrás |

### KÖZÉP TÁVÚ (30 konverzió összegyűlése után)

| # | Teendő | Felelős | Becsült hatás |
|---|--------|---------|---------------|
| 9 | **Bidding váltás: "Maximise conversions"** | Anett | 20-40% hatékonyság javulás |
| 10 | **Broad match kulcsszavak szűkítése** — phrase/exact match arány növelése | Anett | Relevánsabb forgalom |
| 11 | **Ad copy A/B teszt** — "Average" RSA frissítése | Anett | CTR javulás |
| 12 | **Impression share növelése** — budget emelés ha ROI pozitív | Anett | Piaci pozíció javulás |

### HOSSZÚ TÁVÚ (3+ hónap)

| # | Teendő | Becsült hatás |
|---|--------|---------------|
| 13 | **Target CPA bidding** beállítása elég adat után | Automatikus CPA optimalizáció |
| 14 | **Remarketing kampány** indítása (Display/YouTube) | Visszatérő látogatók konvertálása |
| 15 | **Új kampány struktúra** — brand vs non-brand szétválasztás | Pontosabb budget allokáció |
| 16 | **Landing page optimalizáció** — dedikált, konverzióra tervezett oldalak | Magasabb konverziós ráta |

---

## 10. Pénzügyi összefoglaló

### Jelenlegi helyzet (111 nap)

| Metrika | Érték |
|---------|-------|
| Összes költés | 388,323 Ft |
| Napi átlag költés | ~3,500 Ft/nap |
| Havi átlag költés | ~105,000 Ft/hó |
| Kattintások | 2,948 |
| Átlagos CPC | 132 Ft |
| Mért konverziók | **0** |
| Becsült valós konverziók (ha tracking működne) | ~30-60* |

*Becslés: 2% konverziós ráta (iparági átlag szépségipar) × 2,948 kattintás = ~59 konverzió

### Becsült megtakarítás a javítások után

| Javítás | Becsült havi megtakarítás |
|---------|--------------------------|
| Negatív kulcsszavak (waste csökkentés) | 10,000-15,000 Ft/hó |
| Bidding stratégia váltás | 15,000-25,000 Ft/hó |
| **Összesen** | **25,000-40,000 Ft/hó** |

Ez nem kevesebb költést, hanem **hatékonyabb költést** jelent — ugyanannyi pénzből több ügyfelet.

---

## Melléklet: Top 15 kulcsszó részletes teljesítmény

| # | Kulcsszó | Match | Impr. | Katt. | CTR | CPC | Költés |
|---|----------|-------|-------|-------|-----|-----|--------|
| 1 | végleges szőrtelenítés | Broad | 8,156 | 333 | 4.08% | 120 | 39,853 |
| 2 | "lézeres végleges szőrtelenítés" | Phrase | 3,448 | 314 | 9.11% | 119 | 37,423 |
| 3 | "végleges szőrtelenítés" | Phrase | 4,074 | 277 | 6.80% | 123 | 33,940 |
| 4 | lézeres szőrtelenítés | Broad | 6,614 | 253 | 3.83% | 122 | 30,924 |
| 5 | lezeres szortelenites | Broad | 3,183 | 204 | 6.41% | 116 | 23,741 |
| 6 | "dióda lézeres szőrtelenítés" | Phrase | 2,105 | 167 | 7.93% | 127 | 21,248 |
| 7 | "lézeres szőreltávolítás" | Phrase | 1,802 | 150 | 8.32% | 111 | 16,642 |
| 8 | "lézeres szőrtelenítés árak" | Phrase | 864 | 114 | 13.19% | 119 | 13,517 |
| 9 | "intim végleges szőrtelenítés" (Helyi) | Phrase | 5,972 | 631 | 10.57% | 175 | 110,663 |
| 10 | "intim végleges szőrtelenítés" (Élő) | Phrase | 1,016 | 113 | 11.12% | 120 | 13,559 |
| 11 | [lézeres szőrtelenítés] | Exact | 3,205 | 108 | 3.37% | 120 | 12,988 |
| 12 | "végleges szőrtelenítés budapest" | Phrase | 864 | 73 | 8.45% | 115 | 8,386 |
| 13 | "végleges szőrtelenítés ár" | Phrase | 370 | 57 | 15.41% | 119 | 6,786 |
| 14 | "lézeres szörtelenítés" (elírás) | Phrase | 1,066 | 54 | 5.07% | 123 | 6,636 |
| 15 | "diodalezeres szortelenites" | Phrase | 461 | 31 | 6.72% | 117 | 3,617 |

---

*Ez az audit a 2025.11.30 – 2026.03.20 közötti adatok alapján készült. A konverzió adatok hiányában a hatékonysági becslések iparági benchmarkokon alapulnak.*
