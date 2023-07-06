import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar, Movies, MovieDetail, Shows, ShowDetail, Feed, SearchFeed, Genre } from './components';

const App = () => {
  return (
    <BrowserRouter>
    <Box sx={{ backgroundColor: '#000000', height: '100vh' }}>
        <Navbar />
        <Routes>
            <Route path="/" exact element={ <Feed /> } />
            <Route path="/movies" element={ <Movies /> } />
            <Route path="/movies/:id" element={ <MovieDetail /> } />
            <Route path="/shows" element={ <Shows /> } />
            <Route path="/shows/:id" element={ <ShowDetail /> } />
            <Route path="/search/:searchTerm" element={ <SearchFeed /> } />
            <Route path="/genre/:genreTerm" element={ <Genre /> } />
        </Routes>
    </Box>
</BrowserRouter>
  )
}

export default App
