import { Stack, Box, Avatar, Popover } from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandMore } from '@mui/icons-material';
import { useState, useRef } from "react";

import logo from '../assets/images/logo.png';
import profile from '../assets/images/profile.png';
import { SearchBar, SearchButton, Movies, Shows } from "./";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [hasPopover, setHasPopover] = useState(false);
    const popoverAnchor = useRef(null);

    const handlePopoverOpen = () => {
        setHasPopover(true);
    };
  
    const handlePopoverClose = () => {
        setHasPopover(false);
    };

    const updateActive = (active) => {
        setIsActive(active);
    };

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
                { isActive ? <SearchBar padding="10px" updateActive={updateActive} /> : <SearchButton updateActive={updateActive} active={true} /> }
                <Stack
                    direction="row"
                    sx={{ alignItems: "center", cursor: 'pointer' }}
                >
                    <Avatar 
                        src={ profile }
                        sx={{ marginLeft: '10px' }}
                    />
                    <ExpandMore
                        ref={ popoverAnchor }
                        aria-owns="mouse-over-popover"
                        aria-haspopup="true"
                        sx={{ color: '#FFFFFF', '&:hover': { transform: 'rotate(180deg)', transition: 'transform 100ms ease-in' } }}
                        onMouseEnter={ handlePopoverOpen }
                        onMouseLeave={ handlePopoverClose }
                    />
                    <Popover
                        id="mouse-over-popover"
                        sx={{ pointerEvents: 'none' }}
                        open={ hasPopover }
                        anchorEl={ popoverAnchor.current }
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        slotProps={{ paper: { onMouseEnter: handlePopoverOpen, onMouseLeave: handlePopoverClose, sx: { pointerEvents: 'auto' } } }}
                    >
                        <Stack>
                            <Link>Mein Profil</Link>
                            <Link>Einstellungen</Link>
                            <Link>Abmelden</Link>
                        </Stack>
                    </Popover>
                </Stack>
            </Box>
        </Stack>
    );
};

export default Navbar