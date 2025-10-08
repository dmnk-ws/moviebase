import { Stack, Box, Avatar, Popover } from '@mui/material';
import { Link } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';
import { useState, useRef } from 'react';

import logo from '../assets/images/logo.png';
import profile from '../assets/images/profile.png';
import { SearchBar, SearchButton, NavbarPopUp, NavbarMenu, HamburgerMenu } from './';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [hasPopover, setHasPopover] = useState(false);
  const popoverAnchor = useRef<HTMLDivElement>(null);

  const handlePopoverOpen = () => {
    setHasPopover(true);
  };

  const handlePopoverClose = () => {
    setHasPopover(false);
  };

  const updateActive = (active: boolean) => {
    setIsActive(active);
  };

  return (
    <Stack
      direction="row"
      sx={{
        position: 'sticky',
        background: '#000000',
        top: 0,
        zIndex: 10,
        padding: { xs: '20px 25px 20px', sm: '20px 50px 20px' },
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <HamburgerMenu />
      </Box>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <NavbarMenu />
      </Box>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          position: 'absolute',
          right: { xs: '25px', sm: '50px' },
        }}
      >
        {isActive ? (
          <SearchBar padding="10px" updateActive={updateActive} />
        ) : (
          <SearchButton updateActive={updateActive} active={true} />
        )}
        <Stack
          ref={popoverAnchor}
          aria-owns="mouse-over-popover"
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          direction="row"
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            cursor: 'pointer',
            marginLeft: '10px',
          }}
        >
          <Avatar src={profile} sx={{ marginLeft: '10px' }} />
          <ExpandMore
            className={hasPopover ? 'nav-arrow' : undefined}
            sx={{ color: '#FFFFFF', transition: 'transform 200ms ease' }}
          />
          <Popover
            id="mouse-over-popover"
            sx={{ pointerEvents: 'none' }}
            open={hasPopover}
            anchorEl={popoverAnchor.current}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{
              paper: {
                onMouseEnter: handlePopoverOpen,
                onMouseLeave: handlePopoverClose,
                sx: { pointerEvents: 'auto' },
              },
            }}
          >
            <NavbarPopUp />
          </Popover>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Navbar;
