# Leads Tracker (React + React Router + Vite)

A lightweight lead management app (mini-CRM) built to demonstrate professional React fundamentals: routing, controlled forms, shared state, and persistence.

## What the app does

- Create a lead (name, email, status)
- View all leads
- View lead details
- Edit existing leads
- Delete leads
- Persist leads in the browser using `localStorage`

## Tech stack

- React
- React Router (route config + file-based routes)
- Vite
- TypeScript
- SCSS Modules

## How to run locally

```bash
npm install
npm run dev
```

Open:

- `http://localhost:5173`

## Project structure (high level)

- `app/routes.ts` — URL → route file mapping
- `app/root.tsx` — app shell; renders `<Outlet />`; wraps the app in `<LeadsProvider>`
- `app/routes/**` — route pages (screens)
- `app/features/leads/**` — leads domain (store, types, feature components)
- `app/components/**` — reusable UI components (generic)
- `app/assets/**` — bundled images/icons
- `app/app.css` and `*.module.scss` — global + scoped styles

## Key implementation decisions

### Shared state via Context + Reducer

Leads data lives in a single store (`app/features/leads/store.tsx`) using `useReducer` for predictable updates:

- `ADD`
- `UPDATE`
- `REMOVE`

All route pages consume the store through the `useLeads()` hook.

### Persistence

Leads are loaded on startup and saved on change using:

- `useReducer(..., undefined, loadInitialState)` for one-time initialization
- `useEffect` to sync updates to `localStorage`

## What this project demonstrates (interview highlights)

- Controlled inputs (`useState`) and form submission
- Lifting state and prop-driven forms (`onSubmit`, `initialValue`)
- Shared state management (Context + `useReducer`)
- Routing patterns, including dynamic routes (`/leads/:id`)
- Side effects and persistence (`useEffect`, `localStorage`)
- Clean project organization (routes vs features)

## Next improvements (roadmap)

- Form validation + inline field errors
- Better UX (empty states, confirmation dialogs, toast notifications)
- Sorting/filtering leads by status
- Replace `localStorage` with an API (same UI; different data layer)
- Add tests (unit tests for reducer; integration tests for routes)
