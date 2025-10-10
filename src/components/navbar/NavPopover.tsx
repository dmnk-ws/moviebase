import React, { ReactNode } from 'react';
import { Popover } from '@mui/material';

interface NavPopoverProps {
  open: boolean;
  anchor: HTMLElement | null;
  onLeave: () => void;
  children: ReactNode;
}

const NavPopover = ({ open, anchor, onLeave, children }: NavPopoverProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={onLeave}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{
        paper: {
          onMouseLeave: onLeave,
          sx: {
            background: 'black',
            border: '1px solid #FFFFFF',
            marginTop: '8px',
            pointerEvents: 'auto',
          },
        },
      }}
      sx={{
        pointerEvents: 'none',
        display: { xs: 'none', md: 'block' },
      }}
    >
      {children}
    </Popover>
  );
};

export default NavPopover;
