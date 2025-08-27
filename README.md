# E-Store – Next.js E‑commerce Demo

[Live demo](https://assignment-navy-rho.vercel.app/)

A responsive e‑commerce demo built with the Next.js App Router. Browse products from the FakeStore API, search and filter, view details in a modal, and manage a cart with quantity controls. Includes a mock "Add Product" form with validation.

## Features

- Product browsing with search and category filtering
- Product details modal with Add to Cart CTA
- Cart page with increment/decrement, remove, clear, and totals
- Sticky, responsive navbar with live cart count
- Mock Add Product form with validation (client-side only)
- Fully responsive UI with accessible labels and sensible focus states

## Tech Stack

- Next.js (App Router)
- React
- @tanstack/react-query for data fetching/cache
- Zustand (v4) for lightweight state management (cart, UI)
- Tailwind CSS v4 for styling
- React Hook Form + Zod for form validation

## Live Demo

- Environment: Vercel
- URL: [https://assignment-navy-rho.vercel.app/](https://assignment-navy-rho.vercel.app/)

## Project Structure

- `app/layout.js` – Root layout, Providers, global styles, Navbar
- `app/page.js` – Home: controls, product grid, product modal, mock add form
- `app/cart/page.js` – Cart page with quantity controls and summary
- `components/` – UI components (Navbar, Controls, ProductGrid, ProductModal, etc.)
- `stores/` – Zustand stores (`cart.js`, `ui.js`)

## Getting Started

1. Install dependencies

```bash
npm ci
```

2. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

3. Production build

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build for production
- `npm start` – Start production server

## State Management

- `stores/cart.js`

  - `items: CartItem[]`
  - `addItem(product)` – Adds/increments product
  - `decrementItem(productId)` – Decrements quantity or removes when qty reaches 0
  - `removeItem(productId)` – Removes line
  - `clear()` – Empties cart

- `stores/ui.js`
  - `search`, `setSearch(searchQuery)`
  - `category`, `setCategory(categoryName)`
  - `activeProductId`, `setActiveProductId(productId)`

## Notes & Decisions

- Zustand pinned to v4 to match the store API used in this project
- Product data is fetched from the public FakeStore API at runtime
- The Add Product form is a client-only mock; it validates input and does not persist
- UI tuned for responsiveness (mobile → desktop) and basic accessibility

## Deployment

- Deployed on Vercel
- To deploy your fork, connect the repo to Vercel and use default Next.js settings

---

Questions or suggestions? Open an issue or reach out.
