# Task Manager App

A simple and efficient task management application that allows users to track their tasks. Developed as a full-stack application using **React**, **Node.js**, **Express**, **Prisma**, and **PostgreSQL**. Dockerized for easy deployment and testing.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Prerequisites](#prerequisites)
5. [Docker Setup](#docker-setup)
6. [Local Development](#local-development)
7. [API Endpoints](#api-endpoints)
8. [License](#license)

---

## Features

* **Task Creation:** Add a new task with a title.
* **Task Completion:** Mark tasks as completed.
* **Task View:** View all tasks and their status (completed or not).
* **Responsive UI:** Works seamlessly on desktop and mobile devices.

---

## Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js with Express.js
* **Database:** PostgreSQL with Prisma ORM
* **Docker:** Docker for containerization of the entire application.
* **Styling:** Basic CSS/Styling for a clean, user-friendly UI.

---

## Getting Started

To get a local copy of the project up and running on your machine, follow these steps.

---

## Prerequisites

Make sure you have the following installed on your machine:

* **Docker** (for containerization)

  * [Install Docker](https://www.docker.com/get-started)
* **Docker Compose** (for managing multi-container applications)

  * [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## Docker Setup

This project uses Docker to run the entire stack. It includes services for the backend, frontend, database, and Nginx reverse proxy. To get started, follow these steps:

### 1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/task-manager-app.git
```

### 2. **Navigate to the project directory:**

```bash
cd task-manager-app
```

### 3. **Create a `.env` file:**

Copy the `.env.example` file (if it exists) or manually create a `.env` file with the following environment variables:

```env
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
DATABASE_URL=postgresql://your-db-username:your-db-password@db:5432/your-db-name?schema=public
NODE_ENV=development
PORT=5000
```

Make sure to replace `your-db-username`, `your-db-password`, and `your-db-name` with actual values.

### 4. **Build and start the containers:**

You can use Docker Compose to build and start the application:

```bash
docker-compose up --build
```

This will:

* Build the backend and frontend Docker images
* Set up the PostgreSQL database
* Run the backend API and frontend React app
* Start Nginx as a reverse proxy

### 5. **Access the application:**

* **Frontend:** Open your browser and go to `http://localhost` to see the React app.
* **Backend API:** The backend will be exposed to the frontend through Nginx, but if you want to access it directly, you can visit `http://localhost:5000/api`.

---

## Local Development (Without Docker)

If you prefer not to use Docker and run the app locally, follow these steps:

### 1. **Set up the Backend:**

* Install dependencies:

  ```bash
  cd backend
  npm install
  ```

* Configure your `.env` file with the correct database connection and environment variables (same as in the Docker setup).

* Run migrations using Prisma:

  ```bash
  npx prisma migrate dev
  ```

* Start the backend server:

  ```bash
  npm start
  ```

* Your backend will be running on `http://localhost:5000`.

### 2. **Set up the Frontend:**

* Install dependencies:

  ```bash
  cd frontend
  npm install
  ```

* Start the frontend development server:

  ```bash
  npm start
  ```

* Your frontend will be available at `http://localhost:3000`.

---

## API Endpoints

Here are the available API endpoints:

* **GET /api/tasks** - Retrieve all tasks.
* **POST /api/tasks** - Create a new task.
* **PATCH /api/tasks/\:id** - Update a task (e.g., mark as completed).
* **DELETE /api/tasks/\:id** - Delete a task.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Additional Notes:

* **PostgreSQL Database:** If you're using Docker, the database service is automatically started via the `postgres:alpine` image.
* **Nginx:** The Nginx container is used as a reverse proxy to serve both the frontend and backend applications.
