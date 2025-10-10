import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
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
} from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000000', height: '100%' }}>
        <Navbar />
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
    </BrowserRouter>
  );
};

export default App;
