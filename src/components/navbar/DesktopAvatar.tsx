import React, { MouseEvent, useState } from 'react';
import { Avatar, Box, MenuList } from '@mui/material';
import profile from '../../assets/images/profile.png';
import { ExpandMore } from '@mui/icons-material';
import { profileList } from '../../utils/constants';
import PopoverEntry from './PopoverEntry';
import NavPopover from './NavPopover';

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
      <NavPopover open={open} anchor={anchor} onLeave={handleLeave}>
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
      </NavPopover>
    </>
  );
};

export default DesktopAvatar;
