import React, { MouseEvent, useState } from 'react';
import { Box, Typography, IconButton, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight } from '@mui/icons-material';
import { navMenuList } from '../../utils/constants';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';

const MobileMenu = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElSub, setAnchorElSub] = useState<null | HTMLElement>(null);
  const [currentSubMenu, setCurrentSubMenu] = useState<(typeof navMenuList)[0] | null>(
    null
  );

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setAnchorElSub(null);
    setCurrentSubMenu(null);
  };

  const handleOpenSubMenu = (
    event: MouseEvent<HTMLElement>,
    nav: (typeof navMenuList)[0]
  ) => {
    setAnchorElSub(event.currentTarget);
    setCurrentSubMenu(nav);
  };

  const handleCloseSubMenu = () => {
    setAnchorElSub(null);
    setCurrentSubMenu(null);
    setAnchorElNav(null);
  };

  return (
    <Box display={{ xs: 'flex', md: 'none' }}>
      <IconButton
        size="large"
        aria-label="navigation menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        sx={{ color: 'white', padding: 0, marginRight: '10px' }}
      >
        <MenuIcon sx={{ fontSize: 'xx-large' }} />
      </IconButton>
      <NavMenu anchor={anchorElNav} onClose={handleCloseNavMenu}>
        {navMenuList.map((nav) => (
          <MenuItem
            key={nav.name}
            onClick={(e: MouseEvent<HTMLElement>) => {
              if (nav.entries) {
                handleOpenSubMenu(e, nav);
              } else {
                handleCloseNavMenu();
              }
            }}
            component={nav.entries ? 'li' : Link}
            to={nav.entries ? undefined : nav.path}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ color: 'white' }}>{nav.name}</Typography>
            {nav.entries && <ChevronRight sx={{ color: 'white' }} />}
          </MenuItem>
        ))}
      </NavMenu>
      <NavMenu anchor={anchorElSub} onClose={handleCloseSubMenu} isSubmenu>
        {currentSubMenu?.entries?.map((entry) => (
          <MenuItem
            key={entry.name}
            onClick={handleCloseNavMenu}
            component={Link}
            to={entry.path}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Typography sx={{ color: 'white' }}>{entry.name}</Typography>
          </MenuItem>
        ))}
      </NavMenu>
    </Box>
  );
};

export default MobileMenu;
