import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import {
  Navbar,
  GenreMovies,
  MovieLoader,
  GenreShows,
  ShowLoader,
  Feed,
  SearchFeed,
  NotFound,
  TopRatedMovies,
  TopRatedShows,
  Footer,
} from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Stack
        sx={{
          backgroundColor: '#000000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          p: 0,
        }}
      >
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/movies/top-rated" element={<TopRatedMovies />} />
            <Route path="/movies/genres" element={<GenreMovies />} />
            <Route path="/movies/:id" element={<MovieLoader />} />
            <Route path="/shows/top-rated" element={<TopRatedShows />} />
            <Route path="/shows/genres" element={<GenreShows />} />
            <Route path="/shows/:id" element={<ShowLoader />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <Footer />
      </Stack>
    </BrowserRouter>
  );
};

export default App;
