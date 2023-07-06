import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import logo from '../assets/images/logo.png';
import { SearchBar, Movies, Shows } from "./";

const Navbar = () => (
    <Stack 
        direction="row" 
        alignItems="center" 
        p={ 2 } 
        sx={{ position: 'sticky', background: '#0', top: 0, justifyContent: 'space-between' }}
    >
        <Link 
            to="/" 
            style={{ display: 'flex', alignItems: 'center' }}
        >
            <img 
                src={ logo } 
                alt="logo" 
                height={ 45 }
            />
        </Link>
        <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF' }}
        >
            Start
        </Link>
        <Link
            to="/movies"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF' }}
        >
            <Movies />
        </Link>
        <Link
            to="/shows"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF' }}
        >
            <Shows />
        </Link>
        <SearchBar></SearchBar>
    </Stack>
);

export default Navbar