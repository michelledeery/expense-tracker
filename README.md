# Expense Tracker

A simple, modern expense tracker built with React and Vite. Add expenses with description, amount, and category. Data is saved in your browser (local storage).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Desktop app (Electron)

Run as a local desktop app on your machine:

**Development (app window + hot reload):**
```bash
npm install
npm run electron:dev
```
Start the Vite dev server and open the app in an Electron window. Start both with one command.

**Run the built app (no dev server):**
```bash
npm run build
npm run electron
```
Builds the web app, then opens it in an Electron window from the `dist` folder.

**Create an installable desktop app:**
```bash
npm run electron:build
```
Builds the web app and packages it with Electron. On macOS the app is in `release/` (e.g. `release/Expense Tracker.app`). On Windows you get an installer in `release/`.

## Features

- **Add expenses** — description, amount, category
- **Summary** — total spending and breakdown by category
- **Recent expenses** — list with delete
- **Persistent storage** — data saved in browser local storage
