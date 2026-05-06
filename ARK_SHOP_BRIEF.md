# ARK Survival Ascended - Sklep Online
## Specyfikacja projektu do wykonania w Claude Code

---

## 1. CEL PROJEKTU

Strona internetowa pełniąca rolę katalogu sklepu z produktami z gry ARK Survival Ascended.
Klient przegląda produkty, klika "Kopiuj zamówienie" i wkleja tekst na Discord do kontaktu z właścicielem.
Brak płatności online, brak koszyka, brak kont użytkowników.

---

## 2. STACK TECHNICZNY

- **Frontend:** Vite + React (JSX) + CSS Modules
- **Dane:** Google Sheets przez publiczny gviz API (bez klucza API)
- **Obrazki:** lokalnie w repozytorium GitHub w folderze `public/images/`
- **Hosting:** GitHub Pages
- **Deploy:** package `gh-pages`, komenda `npm run deploy`

---

## 3. ŹRÓDŁO DANYCH - GOOGLE SHEETS

Arkusz Google Sheets musi być publiczny (Udostępnij → "Każdy z linkiem może wyświetlać").

ID arkusza trzymane w pliku `.env`:
```
VITE_SHEET_ID=tutaj_id_arkusza
```

Wzór URL do pobrania danych z konkretnej zakładki:
```
https://docs.google.com/spreadsheets/d/${VITE_SHEET_ID}/gviz/tq?tqx=out:json&sheet={NazwaZakładki}
```

Odpowiedź to JSON owinięty w wrapper - trzeba sparsować:
```js
const text = await res.text();
const json = JSON.parse(text.substring(47).slice(0, -2));
```

### Zakładki w arkuszu (6 sztuk):

#### Zakładka: `Dinos`
Kolumny:
- `id` (liczba) - unikalny identyfikator
- `name` (tekst) - nazwa dinozaura np. "Rex"
- `type` (tekst) - jedna z wartości: `WALKA`, `UŻYTKOWE`, `LATAJĄCE`, `WODNE`, `PET`
- `level` (liczba) - poziom np. 350
- `hp_base` (liczba) - HP bazowe
- `hp_mut` (liczba) - liczba mutacji HP (np. 255)
- `dmg_base` (liczba) - DMG bazowe
- `dmg_mut` (liczba) - mutacje DMG
- `stm_base` (liczba) - Stamina bazowa
- `stm_mut` (liczba) - mutacje Staminy
- `weight_base` (liczba) - Waga bazowa
- `weight_mut` (liczba) - mutacje Wagi
- `image_url` (tekst) - ścieżka np. `images/dinos/rex.jpg`
- `available` (TRUE/FALSE) - czy dostępny
- `description` (tekst) - opis produktu

#### Zakładka: `Armor`
- `id`, `name`, `quality` (np. "Ascendant"), `image_url`, `available`, `description`

#### Zakładka: `Weapons`
- `id`, `name`, `weapon_type` (np. "Crossbow"), `quality`, `image_url`, `available`, `description`

#### Zakładka: `Blueprints`
- `id`, `name`, `bp_category` (np. "Armor", "Weapon", "Saddle"), `quality`, `image_url`, `available`, `description`

#### Zakładka: `Services`
- `id`, `name`, `image_url`, `available`, `description`

#### Zakładka: `Saddles`
- `id`, `name`, `dino_name` (dla jakiego dino), `quality`, `image_url`, `available`, `description`

**WAŻNE:** Każda pozycja w każdej kategorii MUSI mieć pole `description` i `image_url`.

---

## 4. DESIGN - MOTYW WIZUALNY

Ciemny motyw: czerń, grafit, akcenty fioletowe.

### Paleta kolorów (CSS variables w `:root`):
```css
--bg-primary: #0a0a0f;        /* tło główne, prawie czarne */
--bg-secondary: #13131a;      /* karty produktów */
--bg-card-hover: #1a1a24;     /* hover karty */
--bg-modal: #15151f;          /* tło modala */
--border: #2a2a3a;            /* obramowania */
--accent: #7c3aed;            /* fiolet główny */
--accent-light: #a855f7;      /* fiolet jasny */
--accent-glow: rgba(124, 58, 237, 0.2);  /* poświata fioletowa */
--text-primary: #f1f0ff;      /* tekst główny */
--text-secondary: #c4c1e0;    /* tekst drugorzędny */
--text-muted: #8b8a9b;        /* tekst wyciszony */
--success: #10b981;           /* "Dostępny" */
--danger: #ef4444;            /* "Niedostępny" */
```

### Wytyczne UI:
- Zaokrąglone rogi (border-radius: 12-16px na kartach, 8px na przyciskach)
- Subtelna fioletowa poświata na hover karty (`box-shadow: 0 0 24px var(--accent-glow)`)
- Animacje płynne (`transition: all 0.2s ease`)
- Responsywność: grid 1/2/3/4 kolumny w zależności od szerokości ekranu
- Font: system-ui lub `Inter` z Google Fonts

---

## 5. STRUKTURA PROJEKTU

```
ark-shop/
├── public/
│   └── images/
│       ├── dinos/
│       ├── armor/
│       ├── weapons/
│       ├── blueprints/
│       ├── services/
│       └── saddles/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx + Navbar.module.css
│   │   ├── CategoryTabs.jsx + .module.css     (6 zakładek kategorii)
│   │   ├── DinoTypeFilter.jsx + .module.css   (filtry typów dino)
│   │   ├── SearchBar.jsx + .module.css        (wyszukiwarka)
│   │   ├── ProductGrid.jsx + .module.css      (siatka kart)
│   │   ├── ProductCard.jsx + .module.css      (pojedyncza karta)
│   │   ├── ProductModal.jsx + .module.css     (modal ze szczegółami)
│   │   └── AvailabilityBadge.jsx + .module.css
│   ├── hooks/
│   │   └── useSheetData.js                    (fetch z Google Sheets)
│   ├── utils/
│   │   ├── parseSheetData.js                  (parser gviz JSON)
│   │   └── orderText.js                       (generator tekstu zamówienia)
│   ├── App.jsx + App.css
│   ├── main.jsx
│   └── index.css                              (reset + zmienne CSS)
├── .env                                       (VITE_SHEET_ID)
├── .env.example
├── .gitignore
├── vite.config.js
├── package.json
└── README.md                                  (instrukcja uruchomienia i deploy)
```

---

## 6. FUNKCJONALNOŚCI

### 6.1 Nawigacja po kategoriach
6 zakładek na górze: **Dinozaury / Zbroje / Bronie / Blueprinty / Usługi / Siodła**.
Aktywna zakładka podświetlona fioletowym akcentem.

### 6.2 Filtry dla dinozaurów
Tylko gdy aktywna kategoria to "Dinozaury" — pokazują się dodatkowe przyciski filtrów typu:
**Wszystkie / WALKA / UŻYTKOWE / LATAJĄCE / WODNE / PET**

### 6.3 Wyszukiwarka
Pole tekstowe filtrujące produkty po nazwie (case insensitive) w aktualnie wybranej kategorii.

### 6.4 Karta produktu (ProductCard)
Zawiera:
- Obrazek produktu (z `image_url`)
- Nazwę
- Krótkie info (np. typ + level dla dino, quality dla broni/zbroi)
- Badge dostępności ("Dostępny" zielony / "Niedostępny" czerwony)
- Cała karta klikalna → otwiera modal

### 6.5 Modal ze szczegółami (ProductModal)
Otwiera się po kliknięciu karty. Zawiera:
- Duży obrazek
- Nazwę produktu
- Wszystkie szczegóły danej kategorii:
  - **Dino:** typ, level, statystyki HP/DMG/STM/WAGA każda jako "wartość bazowa (+mutacje)"
  - **Armor / Weapons / Blueprints / Saddles:** quality, ewentualne dodatkowe pola
- Pełny opis (`description`)
- Status dostępności
- Przycisk **"📋 Kopiuj zamówienie"** — kopiuje sformatowany tekst do schowka
- Przycisk zamknięcia (×) i zamykanie po kliknięciu w tło

### 6.6 Generator tekstu zamówienia
Funkcja `generateOrderText(product, category)` w `utils/orderText.js`.

Przykład dla dino:
```
🦖 ZAMÓWIENIE - Rex
━━━━━━━━━━━━━━━━━━
Kategoria: Dinozaur
Typ: WALKA
Level: 350

Statystyki:
• HP:    15000 (+255 mut)
• DMG:   650   (+50 mut)
• STM:   800   (bazowe)
• WAGA:  1200  (+150 mut)

Status: Dostępny
━━━━━━━━━━━━━━━━━━
```

Dla innych kategorii — analogiczny format dopasowany do pól.

Po kliknięciu przycisku: kopiuj do schowka (`navigator.clipboard.writeText`) i pokaż mały toast "Skopiowano! Wklej na Discord".

---

## 7. KONFIGURACJA DEPLOY NA GITHUB PAGES

### vite.config.js
```js
export default defineConfig({
  plugins: [react()],
  base: '/ark-shop/',  // nazwa repozytorium
})
```

### package.json - skrypty
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Instrukcje w README.md
1. Klonowanie repo
2. `npm install`
3. Skopiowanie `.env.example` do `.env` i wpisanie VITE_SHEET_ID
4. `npm run dev` - uruchomienie lokalne
5. `npm run deploy` - deploy na GitHub Pages
6. Jak dodać nowy produkt - edytuj odpowiednią zakładkę w Google Sheets
7. Jak dodać obrazek - wgraj do public/images/{kategoria}/ i wpisz ścieżkę w Sheets

---

## 8. PLIKI POMOCNICZE

### .env.example
```
VITE_SHEET_ID=wklej_id_swojego_arkusza
```

### .gitignore
```
node_modules
dist
.env
.DS_Store
```

---

## 9. KOLEJNOŚĆ IMPLEMENTACJI

1. **Setup projektu** — Vite + React, struktura folderów, instalacja `gh-pages`
2. **CSS bazowe** — `index.css` ze zmiennymi kolorów + reset
3. **Hook `useSheetData.js`** — fetch z gviz API, parser JSON
4. **App.jsx** — state management (aktywna kategoria, filtry, search, wybrany produkt)
5. **Komponenty kategorii** — Navbar, CategoryTabs, DinoTypeFilter, SearchBar
6. **ProductGrid + ProductCard** — wyświetlanie produktów
7. **ProductModal** — szczegóły produktu
8. **orderText.js** — generator tekstu zamówienia + kopiowanie do schowka
9. **Konfiguracja deploy** — vite.config.js, package.json, README.md
10. **Testy z prawdziwym arkuszem** — utworzenie przykładowego Google Sheets z 2-3 produktami w każdej kategorii

---

## 10. PRZYKŁADOWE DANE TESTOWE (do wpisania w Google Sheets)

### Dinos:
| id | name | type | level | hp_base | hp_mut | dmg_base | dmg_mut | stm_base | stm_mut | weight_base | weight_mut | image_url | available | description |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Rex | WALKA | 350 | 15000 | 255 | 650 | 50 | 800 | 0 | 1200 | 150 | images/dinos/rex.jpg | TRUE | Bojowy Rex z dobrymi statystykami pod boss fight |
| 2 | Argentavis | LATAJĄCE | 280 | 8500 | 98 | 350 | 0 | 1500 | 50 | 900 | 100 | images/dinos/argy.jpg | TRUE | Latający transport, idealny do zbierania surowców |

### Armor:
| id | name | quality | image_url | available | description |
|---|---|---|---|---|---|
| 1 | Flak Armor Set | Ascendant | images/armor/flak.jpg | TRUE | Pełen zestaw zbroi Flak najwyższej jakości |

---

## UWAGI DLA CLAUDE CODE

- Pisz komentarze po polsku gdzie to pomaga zrozumieć logikę
- Używaj nowoczesnego React (functional components + hooks, brak class components)
- Nie używaj zewnętrznych bibliotek UI (typu Material UI) — wszystko na czystym CSS
- Dozwolone są małe biblioteki pomocnicze (np. clsx do warunków klas) jeśli są potrzebne
- Kod ma być czytelny i łatwy do edycji przez osobę uczącą się
- Po stworzeniu projektu wygeneruj README.md po polsku z instrukcją krok po kroku
