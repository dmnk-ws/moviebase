import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar, MovieDetail, ShowDetail, Feed, SearchFeed } from './components';

const App = () => {
  return (
    <BrowserRouter>
    <Box sx={{ backgroundColor: '#000'}}>
        <Navbar />
        <Routes>
            <Route path="/" exact element={ <Feed /> } />
            <Route path="/movies/:id" element={ <MovieDetail /> } />
            <Route path="/shows/:id" element={ <ShowDetail /> } />
            <Route path="/search/:searchTerm" element={ <SearchFeed /> } />
            <Route path="/genre/:genreTerm" element={ <Genre /> } />
        </Routes>
    </Box>
</BrowserRouter>
  )
}

export default App
