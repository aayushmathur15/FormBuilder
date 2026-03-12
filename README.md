# FormBuilder

A scalable backend for a no-code dynamic form builder web application using **Node.js**, **Express**, and **MongoDB (Mongoose)**.

## Getting Started

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your MongoDB connection string.

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the server in development mode:

   ```bash
   npm run dev
   ```

## API Endpoints

### Admin (Form Management)

These routes are protected with JWT-based admin authentication.

- `POST /api/auth/login` - Exchange admin credentials for a JWT token
- `POST /api/forms` - Create a new form
- `GET /api/forms` - Get all forms
- `GET /api/forms/:id` - Get a single form
- `PUT /api/forms/:id` - Update a form
- `DELETE /api/forms/:id` - Delete a form
- `GET /api/forms/:id/responses` - Get responses for a form

### Public (Form Filling)

- `GET /api/public/forms/:id` - Fetch a form for filling
- `POST /api/public/forms/:id/submit` - Submit form responses

## Project Structure

- `controllers/` - Request handlers
- `models/` - Mongoose schemas
- `routes/` - Express route definitions
- `middlewares/` - Express middleware
- `config/` - Configuration (database, env)
- `utils/` - Helpers and validation
- `frontend/` - React + Vite frontend (JavaScript)

## Running the Full Stack Locally

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend is configured to proxy `/api` requests to `http://localhost:4000`.
