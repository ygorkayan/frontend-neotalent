# Car Auction

A responsive car-auction application built with React and TypeScript. Users can browse the catalogue, filter and sort vehicles, save favorites, and open a detailed view for each car.

**Live demo:** [frontend-neotalent.ygorkayan.com](https://frontend-neotalent.ygorkayan.com)

## Features

- Filter vehicles by make, model, bid range, and favorite status
- Sort by make, starting bid, mileage, or auction date
- Paginate results and choose how many vehicles appear per page
- View vehicle specifications, ownership information, and equipment
- Follow live auction countdowns
- Save favorite vehicles in `localStorage`
- Responsive desktop and mobile layouts
- Show a dedicated details page for each vehicle
- Unit, component, integration, and end-to-end tests

## Tech stack

- React 19
- TypeScript
- Vite
- React Router
- Styled Components
- Vitest and React Testing Library
- Cypress
- ESLint

## Getting started

Make sure Node.js and npm are installed, then run:

```bash
git clone https://github.com/ygorkayan/frontend-neotalent.git
cd frontend-neotalent
npm install
npm run dev
```

Open the local address printed by Vite in your browser.

## Application routes

| Route | Description |
| --- | --- |
| `/` | Vehicle catalogue, filters, ordering, favorites, and pagination |
| `/vehicle/:id` | Full specification, ownership, equipment, and auction details |

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Vitest suite once |
| `npm run cypress` | Open the interactive Cypress runner |
| `npx cypress run` | Run all Cypress tests headlessly |
| `npm run test:all` | Run Vitest, followed by headless Cypress |

## Testing

Unit, component, and page tests use Vitest with React Testing Library:

```bash
npm run test
```

Cypress tests expect the application at `http://localhost:5173`. Start the development server in one terminal:

```bash
npm run dev
```

Then use another terminal to run the end-to-end suite:

```bash
npx cypress run
```

Use `npm run cypress` instead when you want the interactive Cypress runner. The development server must also be running before `npm run test:all`, because that command includes the end-to-end suite.

## Project structure

```text
cypress/
├── e2e/          # Home and vehicle-details browser tests
└── support/      # Cypress support and custom commands
src/
├── components/   # Reusable UI components and their tests
├── model/        # Catalogue state, filters, sorting, and pagination
├── pages/        # Home and vehicle-details pages and tests
├── services/     # Mock vehicle data and local cache
├── GlobalStyle.ts
└── main.tsx      # Application entry point and routes
```

## Data

Vehicle data is currently mocked in `src/services/getCars.ts`. It is cached in the browser's `localStorage`, which also keeps favorite changes between sessions.
