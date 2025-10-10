import React, { ReactNode } from 'react';
import { Menu } from '@mui/material';

interface NavMenuProps {
  anchor: HTMLElement | null;
  onClose: () => void;
  children: ReactNode;
}

const NavMenu = ({ anchor, onClose, children }: NavMenuProps) => {
  const open = Boolean(anchor);

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={open}
      onClose={onClose}
      sx={{
        display: { xs: 'block', md: 'none' },
      }}
      slotProps={{
        paper: {
          sx: {
            background: 'black',
            border: '1px solid white',
          },
        },
      }}
    >
      {children}
    </Menu>
  );
};

export default NavMenu;
