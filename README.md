# Meet the Met

This project is designed to work with the Metropolitan Museum of Art Collection
API. It suppsorts the following features:
- A view for paginated display of objects
- A view for individual object details
- Filter objects by department
- Search for object by ID
- Search for object by title

## Artiecture
The project is split into a frontend and backend. The backends main job is to interface with the api directly, caching certain values to help speed up pagination.

The backend is a NestJS service, and the frontend is a React SPA.

## Running the App
To run the app, we will need to run both the frontend and backend servers.

To run the backend server on a fresh clone: `npm i && npm run start`

Next open a new terminal for the frontend. Then to run the frontend server: `cd ui/frontend && npm i && npm run dev`

Now that both servers are running, go to the frontend url: [localhost::5173](http://localhost:5173/)
