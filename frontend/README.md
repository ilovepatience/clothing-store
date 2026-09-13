# Clothing Store Frontend

Frontend part of a full-stack clothing e-commerce application.

The application is built with React and TypeScript and communicates with a Django REST Framework backend through a REST API.

> **Note:** The user interface is currently in Ukrainian because the project was originally developed for the Ukrainian market.

## Technologies

- React
- TypeScript
- Vite
- React Context API
- CSS
- REST API

## Features

- Product catalog
- Product filtering
- Pagination
- Product details
- Shopping cart
- User registration
- User login
- User profile
- Toast notifications

## Project Structure

The frontend is organized into reusable components, pages, contexts, custom hooks and TypeScript types.

- `components/` — reusable UI components
- `pages/` — application pages
- `context/` — authentication, cart and notification state
- `hooks/` — custom React hooks
- `types/` — TypeScript types
- `styles/` — component and page styles
- `assets/` — static assets

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Backend

This application requires the Django REST Framework backend to provide product, user and other application data.

The backend is included in the main project repository under the `backend` directory.