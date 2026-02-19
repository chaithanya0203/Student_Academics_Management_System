# Student Academics Management System

## Prerequisites
- **Python** (for Backend)
- **Node.js** (for Frontend)
- **MySQL** (Database)

## Setup

### 1. Database Configuration
Ensure your MySQL server is running.
The backend expects the database credentials in `backend/app/.env`.
Example `.env` file is already configured.

### 2. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
```
Install dependencies:
```bash
pip install -r requirements.txt
```
(If you encounter `python-jose` errors, run: `pip install "python-jose[cryptography]"`)

### 3. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```

## Running the Application

You need to run both the backend and frontend in separate terminals.

### Start Backend
```bash
cd backend
uvicorn app.main:app --reload
```
The API will run at `http://127.0.0.1:8000`.

### Start Frontend
```bash
cd frontend
npm run dev
```
The UI will run at `http://localhost:5173`.

## Default Login Credentials

- **User ID**: `100190`
- **Password**: `Admin@123`

You may need to create this user first by visiting: `http://127.0.0.1:8000/auth/create-test-user` (POST request).
