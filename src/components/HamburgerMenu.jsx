import { IconButton, Popover } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

import { NavbarMenu } from './';
import '../index.css';

const HamburgerMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-describedby={open ? 'hamburger-menu' : undefined}
                onClick={ handleClick }
            >
                <MenuIcon
                        sx={{ color:"#FFFFFF", fontSize: 'xx-large', marginRight: '10px' }} 
                    />
            </IconButton>
            <Popover
                id={open ? 'hamburger-menu' : undefined}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <NavbarMenu />
            </Popover>
        </div>
    );
}

export default HamburgerMenu