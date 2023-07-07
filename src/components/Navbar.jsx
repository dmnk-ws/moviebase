import { Stack, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandMore } from '@mui/icons-material';
import { useState } from "react";


import logo from '../assets/images/logo.png';
import profile from '../assets/images/profile.png';
import { SearchBar, SearchButton, Movies, Shows } from "./";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    const updateActive = (active) => {
        setIsActive(active);
    }

    return (
        <Stack
            direction="row" 
            sx={{ position: 'sticky', background: '#000000', top: 0, padding: '20px 50px 20px', alignItems: 'middle' }}
        >
            <Box
                sx={{ display: 'inline-flex', justifyContent: 'flex-start' }}
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
                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF', marginLeft: '30px' }}
                >
                    Start
                </Link>
                <Link
                    to="/movies"
                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF', marginLeft: '30px' }}
                >
                    <Movies />
                </Link>
                <Link
                    to="/shows"
                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF', marginLeft: '30px' }}
                >
                    <Shows />
                </Link>
            </Box>
            <Box
                sx={{ display:'inline-flex', alignItems: 'center', position: 'absolute', right: '50px' }}
            >
                { isActive ? <SearchBar padding="10px" updateActive={updateActive} /> : <SearchButton color="#FFFFFF" updateActive={updateActive} active={true} /> }
                <Stack
                    direction="row"
                    sx={{ alignItems: "center", cursor: 'pointer' }}
                >
                    <Avatar 
                        src={profile}
                        sx={{ marginLeft: '10px' }}
                    />
                    <ExpandMore
                        sx={{ color: '#FFFFFF' }}
                    />
                </Stack>
            </Box>
        </Stack>
    )
};

export default Navbar