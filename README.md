# Rings — Flower Rental Workspace

Rings is a mobile-first web app for a flower rental company. It covers ordering,
live delivery tracking, a delivery/pickup calendar, notifications, and six months
of performance analytics.

## Features

- **Dashboard** (`/`) — seasonal specials, quick-order CTA, active delivery tracking, insight preview.
- **Order** (`/order`) — multi-step rental flow: arrangement, rental date range, delivery address.
- **Orders** (`/orders`) — all rentals with status chips and rental progress bars.
- **Order tracking** (`/orders/$orderId`) — milestone timeline from conditioning to return pickup.
- **Calendar** (`/calendar`) — monthly grid with delivery and pickup markers plus per-day detail.
- **Notifications** (`/notifications`) — dispatch, pickup and specials alerts with mark-as-read.
- **Analytics** (`/analytics`) — six-month revenue, order volume, retention and arrangement mix.

## Design

"Botanical operations" direction: muted earthy palette (stem green, kraft sand, blush bud),
Instrument Serif headings with Inter body text, and a functional, operations-focused layout.
All colours live as semantic tokens in `src/styles.css`.

## Tech stack

- TanStack Start (file-based routing, server functions)
- React 19 + TypeScript
- Tailwind CSS v4
- Vite 7

## Development

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

The app runs on http://localhost:8080.

## Project structure

```
src/
  assets/          arrangement imagery
  components/      BottomNav, PageHeader
  lib/rings-data.ts  specials, orders, calendar events, notifications, stats
  routes/          file-based routes (see src/routes/README.md)
  styles.css       design tokens and Tailwind theme
```

Data is currently mock data in `src/lib/rings-data.ts`; swap it for a backend when needed.

## Built with

Built with [Lovable](https://lovable.dev) — open the project there to keep building.
