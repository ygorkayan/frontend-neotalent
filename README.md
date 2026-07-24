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
- Component, page, and model tests

## Tech stack

- React 19
- TypeScript
- Vite
- React Router
- Styled Components
- Vitest and React Testing Library
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

## Available commands

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run preview  # Preview the production build
npm run test     # Run the test suite
npm run lint     # Run ESLint
```

## Project structure

```text
src/
├── components/   # Reusable interface components
├── model/        # Catalogue state, filters, sorting, and pagination
├── pages/        # Home and vehicle-details pages
├── services/     # Mock vehicle data and local cache
├── GlobalStyle.ts
└── main.tsx      # Application routes and entry point
```

## Data

Vehicle data is currently mocked in `src/services/getCars.ts`. It is cached in the browser's `localStorage`, which also keeps favorite changes between sessions.
