# Trumio AI Application Backend

This is the backend of the Trumio InterIIT project. It's built using FastAPI and Langchain.

## Overview

The backend provides an API for the frontend. The main components are:

- Models: Defined in [`models.py`](api/models.py), these are the data structures used by the API.
- Routes: The API routes are defined in [`main.py`](main.py).
- Services: These are the main logic of the application. They are defined in `services/`.

## Environment Variables

Environment variables are defined in a `.env` file. You need to create this file in the `backend/` directory with the following variables:

- `GITHUB_ACCESS_TOKEN`: Your GitHub access token.
- `OPENAI_API_KEY`: Your OpenAI API key.

## Running the Application

1. Create a virtual environment:

   ```sh
   virtualenv env --python=3.9
   source ./env/Scripts/activate
   ```
2. Install Python Dependencies:

   ```sh
   pip install -r requirements.txt
   ```
3. Update secrets in .env file.
4. Run the web server:

   ```sh
   uvicorn main:app --reload
   ```

## Docker

You can also run the backend in Docker using the provided Dockerfile in the `backend/` directory. Build the Docker image and run it:

```sh
docker build -t trumio-backend .
docker run -p 8000:8000 trumio-backend
```
