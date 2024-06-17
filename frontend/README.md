# Trumio InterIIT Frontend

This is the frontend of the Trumio InterIIT project. It's built using Next.js and React, with Clerk for authentication.

## Overview

The frontend provides the user interface for the application. The main components are:

- Pages: Defined in `src/pages/`, these are the main pages of the application.
- Components: Defined in `src/components/`, these are the reusable components used across different pages.
- Styles: The styles are defined using Tailwind CSS in `tailwind.config.ts`.

## Environment Variables

Environment variables are defined in a `.env` file. You need to create this file in the `frontend/` directory with the actual values based on the example provided in the `.env.example` file.

## Building the Application

1. Install Node.js Dependencies:

   ```sh
   npm install
   ```
2. Build the application:

   ```sh
   npm run build
   ```

This will create a `.next/` directory with the built application.

## Running the Application

After building the application, you can run it with:

```sh
npm start
```
