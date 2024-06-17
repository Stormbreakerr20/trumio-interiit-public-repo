# Trumio InterIIT

The global platform to find and engage university project teams for research and prototyping.

## Overview

This project is a full-stack application with a Python backend and a Next.js frontend. The backend is built using FastAPI and Langchain, and the frontend uses React and Clerk for authentication.

## Backend

The backend is located in the `backend/` directory. It uses FastAPI and Langchain to provide an API for the frontend. The main components are:

- Models: Defined in [`backend/api/models.py`](backend/api/models.py), these are the data structures used by the API. The `TeamMember` and `MeetingTranscript` classes are particularly important.
- Routes: The API routes are defined in [`backend/api/routes.py`](backend/api/routes.py).
- Services: These are the main logic of the application. They are defined in `backend/services/`.
- Development Instructions: Instructions for setting up the development environment are provided in [`backend/README.md`](backend/README.md).

## Frontend

The frontend is located in the `frontend/` directory. It uses Next.js and React for the UI, and Clerk for authentication. The main components are:

- Layouts: Defined in `frontend/src/layouts/`, these are the main layout components used by the application.
- Pages: Defined in `frontend/src/pages/`, these are the main pages of the application.
- Middleware: Defined in `frontend/src/middleware.ts`, this is the middleware used for authentication.
- Server: The server-side logic is defined in `frontend/src/server/`.

## Docker

The application can be run in Docker using the provided [`docker-compose.yaml`](docker-compose.yaml) file.
```
docker-compose up
```

## Environment Variables

Environment variables are defined in [`frontend/.env.example`](frontend/.env.example). Make sure to create a `.env` file with your actual values before running the application.

## Running the Application

To run the application, follow the instructions in [`backend/README.md`](backend/README.md) to set up the backend, and then run the Docker compose file.
