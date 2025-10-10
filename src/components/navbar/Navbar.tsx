import { AppBar, Toolbar, Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import DesktopAvatar from './DesktopAvatar';
import MobileAvatar from './MobileAvatar';

export interface NavbarEntry {
  name: string;
  icon?: ReactNode;
  path?: string;
  entries?: NavbarEntry[];
}

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'black',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Toolbar
          sx={{
            padding: { xs: '20px 25px', sm: '20px 50px' },
            minHeight: { xs: 'auto', sm: 'auto' },
          }}
        >
          <MobileMenu />
          <Logo />
          <DesktopMenu />
          <Box display={{ xs: 'none', md: 'block' }} flexGrow={1} />
          <Box display="flex">
            <DesktopAvatar />
            <MobileAvatar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
