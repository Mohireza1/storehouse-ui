# Storehouse UI (anbar-ui)

A small React + Vite frontend for a “storehouse/warehouse” (anbar) style app, with a simple mock backend powered by `json-server`.

## Tech Stack

- **React** (UI)
- **Vite** (dev server & build)
- **Axios** (HTTP client)
- **json-server** (mock REST API from `db.json`)
- **ESLint** (linting)

## Getting Started

### Prerequisites
- Node.js (recommended: latest LTS)
- npm (comes with Node)

### Install
```bash
npm install
```

## Development

### 1) Start the mock API server
This project includes a `db.json` file and a script to run `json-server`:

```bash
npm run server
```

By default it runs on:
- `http://localhost:3002`

### 2) Start the Vite dev server
In another terminal:

```bash
npm run dev
```

Vite will print the local URL (commonly `http://localhost:5173`).

## Scripts

- `npm run dev` — start the frontend in development mode
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run server` — start `json-server` using `db.json` on port `3002`

## Project Structure (high level)

- `src/` — application source code (React)
- `public/` — static assets
- `db.json` — mock database used by `json-server`
- `vite.config.js` — Vite configuration
