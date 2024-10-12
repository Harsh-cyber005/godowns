
# My Full-Stack Project

This is a full-stack Godowns app. The frontend is served from port `5173`, and the backend runs on port `3000`.!

## Prerequisites

Make sure you have the following installed:

- Docker 🐳
- Docker Compose
- Node.js (if running without Docker)

## Getting Started with Docker Compose

The easiest way to get the app up and running is by using Docker Compose. It will take care of setting up both the frontend and backend for you.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd godowns
   ```

2. Build and run the containers:
   ```bash
   docker-compose up -d
   ```

3. Open your browser and visit:
   - app: `http://localhost:5173`

That's it! 🎉

If you want to stop the containers:
```bash
docker-compose down
```

## Running Locally without Docker 🛠️

If you prefer running everything locally without Docker, follow these steps:

1. **Backend**:
   - Go to the `server` folder:
     ```bash
     cd server
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```
   - The backend should now be running on `http://localhost:3000`.

2. **Frontend**:
   - Open a new terminal and go to the `client` folder:
     ```bash
     cd client
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
   - The frontend should now be running on `http://localhost:5173`.

## Project Structure

Here's a quick overview of the project structure:

```
.
├── client/          # Frontend code (React, Vite, etc.)
├── server/          # Backend code (Node.js, Express, etc.)
├── docker-compose.yaml
└── README.md
```

Feel free to explore and modify the project to your liking. Happy coding! 🚀
