# Meet the Met

This project is designed to work with the Metropolitan Museum of Art Collection
API. It supports the following features:
- A view for paginated display of objects
- A view for individual object details
- Filter objects by department
- Search for object by ID
- Search for object by title

## Artiecture
The project is split into a frontend and backend. The backend's main job is to
interface with the api directly, caching certain values to help speed up
pagination.

The backend is a NestJS service, and the frontend is a React SPA.

## Prerequisites

Before running the backend (NestJS) app, make sure you have the following installed:
- **Node.js** v20.11 or later (required by `@nestjs/core` and `@nestjs/cli`) — [nodejs.org](https://nodejs.org/)

## Running the App

To run the app, we will need to run both the frontend and backend servers.

### 1. Clone the Source Code
Clone the app from github:
```shell
git clone https://github.com/arkbuilder117/meet-the-met.git
cd meet-the-met
```

### 2. Install Dependencies
Install the backend dependencies from the project root:
```shell
npm i
```

Then install the frontend dependencies:
```shell
cd ui/frontend && npm i
```

### 3. Run the Backend
From the project root, start the backend server:
```shell
npm run start
```

### 4. Run the Frontend
Open a new terminal, then start the frontend server:
```shell
cd ui/frontend && npm run dev
```

### 5. Open the App
Now that both servers are running, go to the frontend url:
[localhost:5173](http://localhost:5173/)
