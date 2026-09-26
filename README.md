# Moviebase

A React app for browsing movies and TV shows, powered by [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

## Features

- Trending movies and shows feed
- Top-rated movies and shows
- Browse movies and shows by genre
- Detail pages with trailers
- Search across keywords, movies and shows

## Tech Stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) and [React Redux](https://react-redux.js.org/)
- [React Router](https://reactrouter.com/)
- [MUI](https://mui.com/) with [Emotion](https://emotion.sh/)
- [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- Node.js and npm
- A TMDB API read access token, available in your [TMDB account settings](https://www.themoviedb.org/settings/api)

### Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project root with your token:

   ```sh
   VITE_MOVIE_DB_ACCESS_TOKEN=your_tmdb_read_access_token
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

   The app opens at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start the Vite development server on port 3000     |
| `npm run build`    | Type-check and build for production into `build/`  |
| `npm run preview`  | Serve the production build locally                 |
| `npm run lint`     | Run ESLint                                         |
| `npm run lint:fix` | Run ESLint and fix issues automatically            |
| `npm run format`   | Format the source files with Prettier              |

## Project Structure

```
src/
├── components/   UI components (feed, carousel, details, genres, navbar, search, ...)
├── entities/     Domain models (Movie, Show, Genre, Keyword, Video)
├── enums/        Shared enums
├── hooks/        Custom React hooks
├── services/     Media API clients (TMDB)
├── store/        Redux store, slices and selectors
└── utils/        Constants and helpers
```

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.
