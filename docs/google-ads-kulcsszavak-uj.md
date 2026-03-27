# SkinSpirit Google Ads — Kulcsszó terv

**Dátum:** 2026. március 20.
**Készítette:** Adam Duro (Trust The Process)

---

## Használati útmutató Anett-nek

**Match type formátumok:**
- `"idézőjelben"` = Phrase match — a keresés tartalmazza ezt az értelmet
- `[szögletes zárójelben]` = Exact match — pontosan erre a keresésre jelenik meg
- Sima szöveg = Broad match — **KERÜLENDŐ** amíg nincs konverziókövetés!

**Beillesztés:** Google Ads → Kampány → Ad Group → Keywords → kék + gomb → másolás beillesztés

---

## 1. Ad Group: Végleges szőrtelenítés — lézeres (Élő kampány)

### Fő kulcsszavak (PHRASE match)

```
"végleges szőrtelenítés"
"végleges szőrtelenítés budapest"
"végleges szőrtelenítés árak"
"végleges szőrtelenítés ár"
"lézeres szőrtelenítés"
"lézeres szőrtelenítés budapest"
"lézeres szőrtelenítés árak"
"lézeres végleges szőrtelenítés"
"dióda lézeres szőrtelenítés"
"dióda lézeres szőrtelenítés ára"
"diódalézeres szőrtelenítés"
"tartós szőrtelenítés"
"lézeres szőreltávolítás"
"lézeres szőrtelenítés akció"
"végleges szőrtelenítés akció"
"test végleges szőrtelenítés"
"hát végleges szőrtelenítés"
```

### Legjobb teljesítők (EXACT match — ezekre mindenképp jelenjünk meg)

```
[végleges szőrtelenítés budapest]
[lézeres szőrtelenítés árak]
[végleges szőrtelenítés ár]
[lézeres végleges szőrtelenítés]
[dióda lézeres szőrtelenítés]
[lézeres szőrtelenítés budapest]
[végleges szőrtelenítés]
[lézeres szőrtelenítés]
[tartós szőrtelenítés budapest]
[diódalézeres szőrtelenítés budapest]
```

### Ékezet nélküli variánsok (PHRASE match — sokan így keresnek)

```
"vegleges szortelenites"
"lezeres szortelenites"
"lezeres vegleges szortelenites"
"diodalezeres szortelenites"
"lezeres szortelenites budapest"
"vegleges szortelenites arak"
"lezeres szortelenites arak"
```

### TÖRLENDŐ kulcsszavak (jelenleg aktívak, de problémásak)

Ezek jelenleg Broad match-ként futnak és szemetet hoznak:

| Kulcsszó | Probléma | Teendő |
|----------|----------|--------|
| `végleges szőrtelenítés` (broad) | 4% CTR, irreleváns keresések | Cserélni → `"végleges szőrtelenítés"` (phrase) |
| `lézeres szőrtelenítés` (broad) | 3.8% CTR, angol és orvosi keresések | Cserélni → `"lézeres szőrtelenítés"` (phrase) |
| `lezeres szortelenites` (broad) | Szemét forgalom | Cserélni → `"lezeres szortelenites"` (phrase) |
| `sipoly lézeres` (broad) | IRRELEVÁNS — orvosi | **TÖRÖLNI** |
| `tályog lézeres` (broad) | IRRELEVÁNS — orvosi | **TÖRÖLNI** (már szünetel) |
| `végleges szőrtelenítés olcsón` (broad) | Alacsony minőségű ügyfelet vonz | **TÖRÖLNI** |

---

## 2. Ad Group: Intim végleges szőrtelenítés (Élő kampány)

### Fő kulcsszavak (PHRASE match)

```
"intim végleges szőrtelenítés"
"intim szőrtelenítés"
"intim lézeres szőrtelenítés"
"intim szőrtelenítés budapest"
"intim terület szőrtelenítés"
"bikinivonal szőrtelenítés"
"bikini szőrtelenítés"
"bikini végleges szőrtelenítés"
"női intim szőrtelenítés"
"intim szőrtelenítés árak"
"intim lézeres szőrtelenítés ár"
"végleges intim szőrtelenítés"
```

### Legjobb teljesítők (EXACT match)

```
[intim végleges szőrtelenítés]
[intim lézeres szőrtelenítés]
[intim szőrtelenítés budapest]
[bikinivonal szőrtelenítés]
[női intim szőrtelenítés]
[intim szőrtelenítés árak]
[bikini végleges szőrtelenítés]
```

### Ékezet nélküli variánsok (PHRASE match)

```
"intim vegleges szortelenites"
"intim szortelenites"
"intim lezeres szortelenites"
"intim szortelenites budapest"
"bikinivonal szortelenites"
```

---

## 3. Ad Group: Intim végleges szőrtelenítés (Helyi kampány-3km)

Ugyanazok a kulcsszavak mint a 2. pontban — a geo targeting (3km) szűri a célközönséget.

### Fő kulcsszavak (PHRASE match)

```
"intim végleges szőrtelenítés"
"intim szőrtelenítés"
"intim lézeres szőrtelenítés"
"bikinivonal szőrtelenítés"
"bikini végleges szőrtelenítés"
"női intim szőrtelenítés"
"intim szőrtelenítés árak"
```

### Exact match

```
[intim végleges szőrtelenítés]
[intim lézeres szőrtelenítés]
[intim szőrtelenítés]
```

---

## 4. NEGATÍV kulcsszavak — FIÓK SZINTEN

Ezeket a **fiók szinten** kell hozzáadni (nem kampány szinten), hogy mindenhol érvényesek legyenek.

Google Ads → Tools → Shared library → Negative keyword lists → Új lista: "SkinSpirit - Negatív kulcsszavak"

### Orvosi / nem releváns kezelések

```
[sipoly]
[fisztula]
[tályog]
[műtét]
[orvosi központ]
[kórház]
[dr derm]
[derma gene]
[bőrgyógyász]
[plasztikai sebészet]
[plasztika]
[botox]
[hialuronsav]
[mezoterápia]
[szemölcs]
[anyajegy]
[tetoválás eltávolítás]
```

### Konkurens nevek

```
[aesthetica]
[aesthetica.hu]
[bársony esztétika]
[bársonyklinika]
[barsony.hu]
[everderm]
[foreverderm]
[perfect laser]
[perfect laser budapest]
[angel beauty]
[angel beauty clinic]
[sky health]
[sky health beauty]
[király beauty]
[skinlaser]
[skintim]
[zenon clinic]
[salonic]
[silky beauty]
[notino]
[inglow]
[braun]
[dr besth]
[hair-removal.hu]
[budapest heaven laser]
[laser and go]
[laserandgo]
```

### Otthoni megoldások / készülékek

```
[otthoni]
[otthon]
[készülék]
[gép]
[vásárlás]
[rendelés]
[device]
[ipl gép]
[ipl készülék]
[epilátor]
[epiláló]
[szőrtelenítő gép]
[szőrtelenítő krém]
[szőrtelenítő hab]
```

### Angol nyelvű irreleváns

```
[how to]
[at home]
[diy]
[near me]
[beauty salon]
[waxing]
[brazilian wax]
[shaving]
[hair inhibitor]
[hair inhibitor serum]
```

### Gyantázás / egyéb módszerek (nem lézeres)

```
[gyantázás]
[gyanta]
[sugar wax]
[cukorgyanta]
[szőrtelenítő csík]
[borotválás]
[elektrolízis]
[elektrolízis szőrtelenítés]
[tűs epilálás]
[x epil]
[szintiládi]
```

### Nem célzott területek / keresések

```
[férfi szőrtelenítés]
[férfi láb szőrtelenítés]
[férfi fenék szőrtelenítés]
[végleges szőrtelenítés dunaújváros]
[végleges szőrtelenítés debrecen]
[végleges szőrtelenítés szeged]
[végleges szőrtelenítés pécs]
[végleges szőrtelenítés győr]
[végleges szőrtelenítés miskolc]
```

> **Megjegyzés a férfi kulcsszavakhoz:** Ha a SkinSpirit férfiakat IS fogad, akkor ezeket NE adja hozzá negatívként! Ebben az esetben inkább külön ad group-ot érdemes csinálni "Férfi szőrtelenítés" névvel.

### Ár-érzékeny / alacsony minőségű

```
[olcsó]
[olcsón]
[legolcsóbb]
[ingyen]
[ingyenes szőrtelenítés]
[filléres]
```

---

## 5. Összefoglaló — lépésről lépésre

### 1. lépés: Negatív kulcsszavak hozzáadása (15 perc)
→ Tools → Shared library → Negative keyword lists
→ Új lista létrehozása → "SkinSpirit - Negatív"
→ A 4. pont teljes listáját bemásolni
→ Hozzárendelni mindkét aktív kampányhoz

### 2. lépés: Broad match kulcsszavak cseréje (20 perc)
→ Élő kampány → Végleges szőrtelenítés ad group
→ A 3 broad match kulcsszót **szüneteltetni** (ne töröld, hátha kell később)
→ Az 1. pont phrase match kulcsszavait hozzáadni
→ A `sipoly lézeres` kulcsszót **törölni**

### 3. lépés: Exact match kulcsszavak hozzáadása (10 perc)
→ Mindkét ad group-ba → az exact match listákat bemásolni
→ Ezek lesznek a "biztosan jó" kulcsszavak

### 4. lépés: Ellenőrzés 1 hét múlva
→ Search terms report átnézése
→ Ha még mindig jönnek irreleváns keresések → negatív lista bővítése
→ Ha az exact match kulcsszavak jól teljesítenek → budget áthelyezés feléjük

---

*Fontos: Ez a kulcsszó terv a jelenlegi adatok alapján készült. Amint a konverziókövetés működik, az adatok alapján finomhangolás szükséges — melyik kulcsszó hoz ténylegesen ügyfelet, és melyik nem.*
