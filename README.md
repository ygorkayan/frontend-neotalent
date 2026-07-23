Link to see it online: frontend-neotalent.ygorkayan.com

# Car Auction

A responsive car auction listing built with React and TypeScript. Users can browse vehicles, filter and sort the catalogue, mark cars as favorites, and navigate through paginated results.

## Features

- Filter by make, model, bid range, and favorites
- Sort by make, starting bid, mileage, or auction date
- Choose how many vehicles are displayed per page
- Responsive layout for desktop and mobile
- Auction countdown for each vehicle
- Favorites persisted in `localStorage`
- Component and model tests with React Testing Library and Vitest

## Tech stack

- React 19
- TypeScript
- Vite
- Styled Components
- React Router
- Vitest and React Testing Library

## Getting started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run test     # Run the test suite
npm run lint     # Run ESLint
```

The vehicle data is currently mocked in `src/services/getCars.ts` and cached in the browser's `localStorage`.
