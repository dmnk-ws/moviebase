import React, { ReactNode } from 'react';
import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';

interface PopoverEntryProps {
  name: string;
  onClose: () => void;
  icon?: ReactNode;
}

const PopoverEntry = ({ name, onClose, icon }: PopoverEntryProps) => {
  return (
    <MenuItem
      key={name}
      onClick={onClose}
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      {icon && <ListItemIcon sx={{ minWidth: '36px' }}>{icon}</ListItemIcon>}
      <ListItemText>
        <Typography sx={{ color: 'white' }}>{name}</Typography>
      </ListItemText>
    </MenuItem>
  );
};

export default PopoverEntry;
