import React, { ReactNode } from 'react';
import { Menu } from '@mui/material';

interface NavMenuProps {
  anchor: HTMLElement | null;
  onClose: () => void;
  children: ReactNode;
  isSubmenu?: boolean;
}

const NavMenu = ({ anchor, onClose, children, isSubmenu = false }: NavMenuProps) => {
  const open = Boolean(anchor);

  return (
    <Menu
      anchorEl={anchor}
      anchorOrigin={
        isSubmenu
          ? {
              vertical: 'top',
              horizontal: 'right',
            }
          : {
              vertical: 'bottom',
              horizontal: 'left',
            }
      }
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
            border: !open ? 'none' : '1px solid white',
          },
        },
      }}
    >
      {children}
    </Menu>
  );
};

export default NavMenu;
