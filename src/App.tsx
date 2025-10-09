import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  Navbar,
  GenreMovies,
  MovieDetail,
  GenreShows,
  ShowDetail,
  Feed,
  SearchFeed,
} from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000000', height: '100%' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/movies/genres" element={<GenreMovies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/shows/genres" element={<GenreShows />} />
          <Route path="/shows/:id" element={<ShowDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
