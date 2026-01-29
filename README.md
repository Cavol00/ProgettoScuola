# Manga Shelt - Progetto d'Esame UF07WEB

Single Page Application (SPA) realizzata in React e TypeScript per la consultazione di manga e la gestione di una libreria personale.
Il progetto interroga l'API pubblica Jikan per la ricerca dei dati e utilizza un server locale (json-server) per la persistenza dei dati utente e dei preferiti.

## 🚀 Tecnologie Utilizzate

* **Frontend:** React 18, TypeScript, Vite
* **Routing:** React Router Dom v6
* **Data Fetching & State:** React Query, Context API
* **Backend (Simulazione):** Json-Server (API REST locale)
* **Stili:** CSS

## 🛠️ Istruzioni per Installazione ed Esecuzione

Per il corretto funzionamento dell'applicazione (in particolare per il Login e la Libreria), è necessario avviare sia il frontend che il server locale.

### 1. Clonare la repository ed installare le dipendenze
Scaricare il progetto e installare i pacchetti necessari tramite terminale

```
npm install
```

### 2. Avvio del Server (Backend Locale)

Aprire un terminale e lanciare il server locale (che risponde alla porta 3001). Questo passaggio è fondamentale per il funzionamento del Login e del tasto "Aggiungi alla libreria".

```
npx json-server db.json --port 3001
```
### 3. Avvio dell'Applicazione (Frontend)

In un secondo terminale, avviare l'applicazione React:

```
npm run dev
```

Aprire il browser all'indirizzo indicato (solitamente http://localhost:5173).

L'applicazione utilizza un sistema di autenticazione simulato. Per accedere alle funzionalità protette (Libreria personale).

Nota: I nuovi utenti registrati verranno salvati nel file db.json locale.
## 📡 Descrizione delle API
Jikan API v4 (Pubblica)

Utilizzata per reperire le informazioni sui manga. Non richiede autenticazione.

    GET /top/manga: Recupera la classifica dei manga più popolari.

    GET /manga/{id}: Recupera i dettagli specifici di un'opera.

Json-Server (Locale)

Utilizzato per simulare un database persistente.

    GET/POST /users: Gestione utenti.

    GET/POST/DELETE /library: Gestione dei manga salvati nei preferiti.

## 📂 Struttura del Progetto

src/
├── components/   # Componenti riutilizzabili (MangaCard, Navbar, ecc.)
├── pages/        # Pagine principali (Home, MangaDetails, Library, Login)
├── context/      # Gestione stato globale (AuthContext)
├── types/        # Definizioni TypeScript (Interfacce e Generics)
├── App.tsx       # Configurazione Routing
└── main.tsx      # Entry point e Provider

## ✅ Funzionalità Implementate

Il progetto soddisfa i requisiti previsti dalle linee guida d'esame:
Requisiti Base

    [x] Struttura organizzata (components/pages).

    [x] Routing con pagine multiple (Lista, Dettaglio, Login, Area Riservata).

    [x] Utilizzo di TypeScript (Interfacce per oggetti API).

    [x] Chiamate API GET gestite con React Query.

### Requisiti Avanzati

    [x] Chiamata POST: Implementazione dell'aggiunta ai preferiti su database locale.

    [x] Navigazione con State: Passaggio dati diretto tra Home e Dettaglio (senza rifare la fetch) tramite useLocation.

    [x] Gestione Errori: Pagina 404 personalizzata e gestione errori nelle chiamate di rete.

    [x] Documentazione: Codice commentato (JSDoc) nelle funzioni principali.