# Clothing Store Backend

Backend API for a full-stack clothing e-commerce application.

The application provides REST API endpoints for user accounts
and store functionality. It is designed to work with a React frontend.

## Tech Stack

- Python
- Django
- Django REST Framework
- MySQL
- Docker

## Project Structure

- `accounts/` — user accounts and authentication
- `store/` — store-related functionality
- `backend/` — Django project configuration
- `media/` — uploaded media files

## Installation

### 1. Clone the repository

git clone <repository-url>
cd backend

### 2. Create a virtual environment

python -m venv venv

### 3. Activate the virtual environment

Windows:

venv\Scripts\activate

Linux / macOS:

source venv/bin/activate

### 4. Install dependencies

pip install -r requirements.txt

### 5. Configure environment variables

Create a `.env` file in the backend directory and add the required
environment variables.

### 6. Apply migrations

python manage.py migrate

### 7. Run the development server

python manage.py runserver

The backend will be available at:

http://127.0.0.1:8000/