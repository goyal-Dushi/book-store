# Welcome all 👋

# Overview → Online Book Store 📖

This is a **`MERN`** stack application currently featuring the basic functionality of an online book e-commerce site.

https://user-images.githubusercontent.com/40212568/133466859-c8aa804d-dd08-441a-8670-a9588d8cf2f4.mp4

## Don't just fork the repo, do leave a ⭐

## Table of Contents: 📑

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Docker Deployment](#docker-deployment)
- [Environment Variables](#environment-variables)
- [Contribution Guidelines](#contribution-guidelines)

## Tech Stack

The tech behind the application is MERN Stack:

1. `M` : MongoDB
2. `E` : Express
3. `R` : React (with TypeScript + Vite)
4. `N` : Node.js

## Prerequisites

### For Local Development:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Installation guide](https://docs.mongodb.com/manual/installation/)
- **npm** or **yarn** package manager

### For Docker Deployment:

- **Docker** - [Download here](https://www.docker.com/get-started)
- **Docker Compose** - Usually included with Docker Desktop

## Local Development Setup

Run the frontend and backend separately for development and testing.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd plant-ecommerce
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit backend/.env file if needed (already created with defaults)

# Start backend in development mode (with auto-reload)
npm run dev
```

The backend will start on **http://localhost:5000**

**Expected output:**

```
Server started on Port: 5000
Database connection established!
```

### 3. Setup Frontend

Open a new terminal window:

```bash
# From project root
cd plant-ecommerce

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will start on **http://localhost:5173** (Vite's default port)

### 4. Access the Application

Open your browser and navigate to **http://localhost:5173**

**Note:** Make sure MongoDB is running on your local machine at `mongodb://localhost:27017`

## Docker Deployment

Run the entire application (frontend + backend + MongoDB) with a single command using Docker Compose.

### 1. Build and Start All Services

```bash
# From project root
docker-compose up --build
```

This will:

- Start a MongoDB container
- Build and start the backend container
- Build and start the frontend container

### 2. Access the Application

- **Frontend:** http://localhost (port 80)
- **Backend API:** http://localhost:5000
- **MongoDB:** Running internally on port 27017 (not exposed to host)

### 3. Stop All Services

```bash
# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (deletes database data)
docker-compose down -v
```

### 4. View Logs

```bash
# View all service logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookStore
SESSION_SECRET=somesecrestofBookstore@123%78237dfnisn
CORS_ORIGIN=http://localhost:5173
```

**Note:** For Docker deployment, these values are overridden in `docker-compose.yml`

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
plant-ecommerce/
├── backend/              # Express.js backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js         # Backend entry point
│   ├── package.json
│   ├── Dockerfile       # Backend Docker configuration
│   └── .env            # Backend environment variables
├── src/                 # React frontend source
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── hooks/
├── public/              # Static assets
├── package.json         # Frontend dependencies
├── Dockerfile          # Frontend Docker configuration
├── nginx.conf          # Nginx configuration for production
├── docker-compose.yml  # Docker Compose configuration
└── README.md
```

## Troubleshooting

### Local Development Issues

**Backend won't start:**

- Ensure MongoDB is running: `mongod --version`
- Check if port 5000 is available
- Verify `.env` file exists in `backend/` directory

**Frontend can't connect to backend:**

- Ensure backend is running on port 5000
- Check CORS settings in `backend/index.js`
- Verify `CORS_ORIGIN` in `backend/.env` matches your frontend URL

### Docker Issues

**Build fails:**

- Ensure Docker is running: `docker --version`
- Try cleaning Docker cache: `docker system prune -a`

**Services won't start:**

- Check if ports 80, 5000, or 27017 are already in use
- View logs: `docker-compose logs`

**Database connection fails:**

- Ensure MongoDB container is running: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`

## Contribution Guidelines 🖥️

- Please wait for the issue to be assigned before addressing any.
- Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
- **`no PR accepted on main/master branch`**, ensure to make separate branch while working on any issue.
