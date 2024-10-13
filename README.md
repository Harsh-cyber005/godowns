
# My Full-Stack Project

This is a full-stack Godowns app. The frontend is served from port `5173`, and the backend runs on port `3000`.

## Deployment

You can access the deployed application at: [https://godowns-pi.vercel.app/](https://godowns-pi.vercel.app/)

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

## Development Ideas

### Project Development Log

1. **API Routes and Data Formatting**
   - **API Routes**: Creating the API routes was quite straightforward.
   - **Data Formatting Challenge**: Formatting the raw `godowns.json` data into a tree structure required significant brainstorming.
   - **Solution**: Recursion was employed to build the tree, and the formatted data was successfully stored in the database.

2. **Search and Filter Functionality**
   - **Autocomplete and Fuzzy Search**: Developed the autocomplete and fuzzy search routes for the search function.
   - **Advanced Filtering System**: Implemented a filter search route for advanced filtering using MongoDB Atlas search indexes and aggregation.

3. **Authentication and UI Development**
   - **Authentication**: Implementing authentication using React Router in the frontend was relatively easy.
   - **Responsive UI**: Designing a responsive user interface posed a challenge, but significant improvements were made to enhance the overall UI experience.

4. **Tree Component in Sidebar**
   - **Recursive Tree Component**: Successfully built the tree component using a recursive React component, implemented within the `<Sidebar/>` component.

5. **Dockerization**
   - **Containerization**: After completing the frontend and backend parts, the application was dockerized, which was a straightforward process.

6. **Deployment Challenges**
   - **Azure VM Attempt**: In a rushed environment, I spent hours experimenting with Docker Compose, Nginx, and deploying to an Azure VM on Ubuntu. I was able to make the frontend appear at the IP address: [http://4.240.83.3:5173/](http://4.240.83.3:5173/). However, the functionality was broken—requests were sent, but no responses were received.
   - **Switch to Vercel**: Eventually, I gave up on the Azure VM deployment and deployed the app on Vercel at [https://godowns-pi.vercel.app/](https://godowns-pi.vercel.app/). While the search functionality works, reloading the page causes Vercel to throw an error, which I have been unable to resolve despite multiple attempts.

Feel free to explore and modify the project to your liking. Happy coding! 🚀
