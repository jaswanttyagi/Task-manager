# Task Manager

A beginner-friendly MERN task manager app with authentication, role-based task access, and a React + Tailwind frontend.

## Project Structure

Root folder
- `package.json` - root scripts for running the backend, frontend, and development mode.
- `.gitignore` - ignores local environment files and build artifacts.
- `.env.example` - root example file showing how to document local env usage.

`Server/` folder
- `Server/index.js` - entry point for the Express backend.
- `Server/config/database.js` - MongoDB connection logic.
- `Server/routes/route.js` - API routes for auth and tasks.
- `Server/controllers/` - controller functions for auth and task operations.
- `Server/middleware/auth.js` - JWT authentication middleware.
- `Server/models/` - Mongoose models for `User` and `Task`.
- `Server/.env.example` - example backend env file. Do not commit `Server/.env`.

`Client/` folder
- `Client/src/` - React application source code.
- `Client/src/components/` - reusable UI components.
- `Client/src/pages/` - page-level components for login, signup, and dashboard.
- `Client/.env.example` - example file for frontend env variables when needed.

## Setup

### 1. Install dependencies

```bash
npm install
npm install --prefix Client
```

### 2. Create your backend env file

Copy the server example:

```bash
copy Server\.env.example Server\.env
```

Then open `Server/.env` and replace the placeholders:

```env
PORT=4500
DATABASE_URL=mongodb://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority
JWT_SECRET_KEY=your_jwt_secret_key
```

> `Server/.env` is ignored by Git, so sensitive values stay local.

### 3. Start the app in development mode

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend API base: `http://localhost:4500/api/v1`

## Available Scripts

From the root folder:

- `npm run dev` - runs both backend and frontend with `concurrently`.
- `npm run server` - starts the backend with `nodemon`.
- `npm run client` - starts the React frontend.
- `npm run build` - installs client deps and builds the React app.
- `npm start` - starts the backend in production mode.

Inside `Client/`:

- `npm start` or `npm run dev` - starts the React development server.
- `npm run build` - builds the frontend into `Client/build`.

## How the code works

### Backend

- `Server/index.js` loads env variables, sets middleware, and mounts API routes.
- `Server/config/database.js` connects to MongoDB.
- `Server/routes/route.js` organizes auth and task endpoints under `/api/v1`.
- `Server/controllers/` handles request logic for users and tasks.
- `Server/middleware/auth.js` protects routes using JWT.

### Frontend

- `Client/src/main.jsx` mounts the React app.
- `Client/src/App.jsx` routes between pages.
- `Client/src/components/` contains forms and UI elements.
- `Client/src/pages/` holds the main screens: `Login`, `Signup`, and `Dashboard`.

## Notes for GitHub

- `Server/.env` should never be committed.
- `Client/.env` and `Client/.env.local` are ignored as well.
- Use `Server/.env.example` and `Client/.env.example` as templates for your own local config.

## Deploying to production

1. Build the React app:

```bash
npm run build
```

2. Set production env vars on your host:

```bash
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
NODE_ENV=production
```

3. Start the backend:

```bash
npm start
```

In production, Express serves the React build from `Client/build` and still exposes API routes under `/api/v1`.
