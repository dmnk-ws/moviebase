import React, { MouseEvent, useState } from 'react';
import { Avatar, Box, IconButton, Menu } from '@mui/material';
import profile from '../../assets/images/profile.png';
import { profileList } from '../../utils/constants';
import PopoverEntry from './PopoverEntry';

const MobileAvatar = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Box display={{ xs: 'flex', md: 'none' }}>
      <IconButton onClick={handleOpen} sx={{ padding: 0 }}>
        <Avatar src={profile} sx={{ marginLeft: '10px' }} />
      </IconButton>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
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
        {profileList.map((item) => (
          <PopoverEntry
            key={item.name}
            name={item.name}
            icon={item.icon}
            onClose={handleClose}
          />
        ))}
      </Menu>
    </Box>
  );
};

export default MobileAvatar;
