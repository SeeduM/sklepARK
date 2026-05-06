# ARK Shop — projekt

React + Vite, GitHub Pages. Sklep z itemami ARK Survival Ascended.

## Stack
- React 18, Vite 5, CSS Modules (bez frameworków)
- Deploy: `npm run deploy` → gh-pages branch
- Live: https://seedum.github.io/sklepARK/

## Dane
- Źródło: Google Sheets via gviz API (publiczny arkusz)
- Sheet ID w `.env` jako `VITE_SHEET_ID` (nie commitować)
- Arkusz: https://docs.google.com/spreadsheets/d/1lf1x7u0-XH2h-jHvtsjgBaFl6R7H4f69-HgtUz4Hkbg
- Arkusz musi być udostępniony publicznie (każdy z linkiem może wyświetlać)
- Hook: `src/hooks/useSheetData.js` — pobiera dane przez `gviz/tq?tqx=out:json&sheet=NAZWA`

## Zakładki Google Sheets (muszą istnieć)
| Zakładka | Kluczowe kolumny |
|----------|-----------------|
| Dinos | name, type, level, hp_base, hp_mut, dmg_base, dmg_mut, stm_base, stm_mut, weight_base, weight_mut, image_url, available, description |
| Armor | name, quality, image_url, available, description |
| Weapons | name, weapon_type, quality, image_url, available, description |
| Blueprints | name, bp_category, quality, image_url, available, description |
| Saddles | name, dino_name, quality, image_url, available, description |
| Services | name, image_url, available, description |

## Workflow deploy
1. Edytuj kod
2. `npm run deploy` — build + push do gh-pages
3. `git add ... && git commit && git push` — push kodu źródłowego na master

## Design system
- Kolory: bg `#0a0a14`, karty `#1e1c35`, accent `#7c3aed`, CTA `#f43f5e`
- Fonty: Orbitron (nagłówki/taby), Inter (body)
- Styl: dark gaming, purple glow, rose CTA
- Mobile: breakpoint 600px (wrap taby, 2-kol grid, modal od dołu)

## TODO
- [ ] Uzupełnić Google Sheets danymi (Rex i inne dino)
- [ ] Udostępnić arkusz publicznie
- [ ] Przetestować połączenie z danymi
