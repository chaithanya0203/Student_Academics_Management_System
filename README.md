# Student Academics Management System

## Prerequisites
- **Python** (for Backend)
- **Node.js** (for Frontend)
- **MySQL** (Database)

## Setup

### 1. Database Configuration
Ensure your MySQL server is running.
Create `backend/.env` from `backend/.env.example` and add your MySQL connection:
```env
DATABASE_URL=mysql+mysqlconnector://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
JWT_SECRET_KEY=replace-with-a-long-random-secret
DEFAULT_ADMIN_PASSWORD=change-admin-password-before-production
```

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
Create `frontend/.env` from `frontend/.env.example`:
```env
VITE_API_URL=http://127.0.0.1:8000
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

- Import `database_setup.sql` to seed the initial admin account.
- Keep real passwords in your local `passwords.txt`, which is ignored by Git.

## Deployment

### Frontend on Vercel
1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Set the root directory to `frontend`.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Add environment variable:
```env
VITE_API_URL=https://your-render-backend.onrender.com
```

### Backend on Render
1. Push the repo to GitHub.
2. Create a new Web Service in Render.
3. Set the root directory to `backend`.
4. Build command:
```bash
pip install -r requirements.txt
```
5. Start command:
```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```
6. Add environment variables:
```env
DATABASE_URL=mysql+mysqlconnector://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME
CORS_ORIGINS=https://your-frontend-domain.vercel.app
JWT_SECRET_KEY=replace-with-a-long-random-secret
DEFAULT_ADMIN_PASSWORD=change-admin-password-before-production
```

### MySQL Database
- Use your MySQL server or cloud MySQL provider.
- Create the database manually.
- Import `database_setup.sql` if needed.
- Put the final MySQL connection string into Render as `DATABASE_URL`.
