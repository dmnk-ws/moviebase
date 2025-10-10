import React, { MouseEvent, useState } from 'react';
import { Avatar, Box, IconButton } from '@mui/material';
import profile from '../../assets/images/profile.png';
import { profileList } from '../../utils/constants';
import PopoverEntry from './PopoverEntry';
import NavMenu from './NavMenu';

const MobileAvatar = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

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
      <NavMenu anchor={anchor} onClose={handleClose}>
        {profileList.map((item) => (
          <PopoverEntry
            key={item.name}
            name={item.name}
            icon={item.icon}
            onClose={handleClose}
          />
        ))}
      </NavMenu>
    </Box>
  );
};

export default MobileAvatar;
