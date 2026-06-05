# Catstore – ReactJS Del B

En kattbutik byggd i React som asynkront hämtar kattraser från [The Cat API](https://api.thecatapi.com) och presenterar dem i ett responsivt gränssnitt. Applikationen är byggd med React komponenter, Context API för global kundvagnshantering och React Router för navigering.

---

## Teknikstack

| Teknologi | Syfte |
|-----------|-------|
| React 19 + JSX | UI-komponenter |
| Vite | Byggverktyg och dev-server |
| react-router-dom | Klientbaserad routing |
| react-bootstrap | Responsivt komponentbibliotek |
| react-bootstrap-icons | Ikonbibliotek |
| Context API | Global kundvagnsstate |

---

## Sidor och funktioner

**`/` — Startsida**
Presentation av butiken med hero-sektion och feature-kort.

**`/cats` — Kattlista**
Hämtar 30 kattraser från API:et och visar 10 per sida med pagination. Innehåller ett sökfält som filtrerar raser i realtid sökning och pagination fungerar ihop.

**`/cat/:id` — Detaljsida**
Visar utökad information om en specifik ras: namn, ursprungsland, temperament och beskrivning. Härifrån läggs katten till i kundvagnen.

**`/cart` — Kundvagn**
Listar tillagda katter med möjlighet att justera antal och ta bort produkter. En "Complete Purchase" knapp öppnar en modal med ett orderformulär (namn, e-postadress, leveransadress). Vid godkänd order töms kundvagnen och en bekräftelse visas.

**`/about` — Om oss**
Information om butiksägaren med kontaktuppgifter.

Antal produkter i kundvagnen visas som en badge i navigeringsmenyn och uppdateras direkt i hela applikationen via Context API.

---

## Kom igång

Node.js (LTS) krävs.

```bash
# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev
```

Öppna sedan `http://localhost:5173` i webbläsaren.

```bash
# Bygg för produktion
npm run build

# Förhandsgranska produktionsbygget
npm run preview
```

---

## Projektstruktur

```
src/
├── components/
│   ├── CatCard.jsx       # Kort som visar ras, ursprung och bild
│   └── navbar.jsx        # Navigeringsmeny med kundvagnsbadge
├── context/
│   ├── CartContext.js    # Context-definition
│   ├── CartProvider.jsx  # State och metoder för kundvagn
│   └── UseCart.js        # Custom hook för att konsumera context
├── pages/
│   ├── Home.jsx          # Startsida
│   ├── Cats.jsx          # Kattlista med sökning och pagination
│   ├── CatDetails.jsx    # Detaljsida per ras
│   ├── Cart.jsx          # Kundvagn och ordermodal
│   └── About.jsx         # Ägarinformation
├── services/
│   └── api.js            # Anrop mot The Cat API
├── App.jsx               # Routing
└── main.jsx              # Startpunkt
```

---

## API

```
GET https://api.thecatapi.com/v1/breeds?limit=30   hämtar 30 kattraser
GET https://api.thecatapi.com/v1/breeds/{id}       hämtar en specifik ras
```

Bilder byggs direkt via CDN-URL med rasens `reference_image_id`:
```
https://cdn2.thecatapi.com/images/{reference_image_id}.jpg
```
