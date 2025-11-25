# ADD-Codex — Travel Website Template

Demo full-stack travel template:
- Front-end: Vue 3 + TypeScript (Vite) in `frontend/`
- Back-end: Node + TypeScript + Express in `backend/`
- Database: MySQL (Dockerized) with seed data in `ops/mysql/init.sql`

## Quick start (Docker)
```
docker-compose up --build
```
- API available at `http://localhost:4000/api`
- Front-end dev server is not dockerized; run locally as below.

## Run backend locally
```
cd backend
npm install
npm run dev
```
Environment defaults (override as needed):
```
PORT=4000
DB_HOST=localhost
DB_PORT=3307
DB_USER=travel
DB_PASSWORD=travelpass
DB_NAME=travel_app
```

## Run frontend locally
```
cd frontend
npm install
npm run dev
```
Vite proxy sends `/api/*` to `http://localhost:4000`.

## Project structure
- `backend/src/server.ts` — Express API, MySQL connection with graceful sample-data fallback.
- `frontend/src/App.vue` — Travel landing UI consuming API.
- `docker-compose.yml` — MySQL + API service; seeds with sample destinations.

## Notes
- If MySQL is unavailable, API falls back to in-memory sample data so the UI still renders.
- Fonts pulled from Google (Playfair Display + Manrope); adjust in `frontend/src/style.css` if offline.
