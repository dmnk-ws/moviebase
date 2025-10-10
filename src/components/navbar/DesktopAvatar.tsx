import React, { MouseEvent, useState } from 'react';
import { Avatar, Box, MenuList, Popover } from '@mui/material';
import profile from '../../assets/images/profile.png';
import { ExpandMore } from '@mui/icons-material';
import { profileList } from '../../utils/constants';
import PopoverEntry from './PopoverEntry';

const DesktopAvatar = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const handleEnter = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleLeave = () => {
    setAnchor(null);
  };

  return (
    <>
      <Box
        onMouseEnter={handleEnter}
        display={{ xs: 'none', md: 'flex' }}
        alignItems="center"
        sx={{
          cursor: 'pointer',
        }}
      >
        <Avatar
          src={profile}
          sx={{
            marginLeft: '10px',
            pointerEvents: 'none',
          }}
        />
        <ExpandMore
          className={open ? 'nav-arrow' : undefined}
          sx={{
            color: 'white',
            transition: 'transform 200ms ease',
            pointerEvents: 'none',
          }}
        />
      </Box>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={handleLeave}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            onMouseLeave: handleLeave,
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
        <MenuList>
          {profileList.map((item) => (
            <PopoverEntry
              key={item.name}
              name={item.name}
              icon={item.icon}
              onClose={handleLeave}
            />
          ))}
        </MenuList>
      </Popover>
    </>
  );
};

export default DesktopAvatar;
