# Clothing Store

Full-stack e-commerce application for a clothing store.

The project consists of a React + TypeScript frontend and a Django REST Framework backend with MySQL.

> **Note:** The user interface is currently in Ukrainian because the project was originally developed for the Ukrainian market.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Context API
- CSS

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- MySQL
- Docker

## Features

- Product catalog
- Product filtering
- Pagination
- Product details
- Shopping cart
- User registration and login
- User profile
- JWT authentication
- REST API
- Django Admin

## Project Structure

```text
clothing-store/
├── frontend/
├── backend/
├── docker-compose.yml
└── README.md
```

## Frontend

The frontend is built with React and TypeScript.

More information about the frontend is available in `frontend/README.md`.

## Backend

The backend is built with Django REST Framework and MySQL.

More information about the backend is available in `backend/README.md`.

## Getting Started

### Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file using `.env.example` as a template.

Apply database migrations:

```bash
python manage.py migrate
```

Start the backend:

```bash
python manage.py runserver
```

### Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will usually be available at:

```text
http://localhost:5173/
```

## Environment Variables

Backend environment variables are configured using a `.env` file.

Use `backend/.env.example` as a template.

Real environment variables and secret keys are not committed to the repository.