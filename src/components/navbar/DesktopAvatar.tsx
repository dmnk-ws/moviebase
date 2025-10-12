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
  const [closeTimer, setCloseTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      setCloseTimer(null);
    }

    setAnchor(event.currentTarget);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setAnchor(null);
    }, 100);

    setCloseTimer(timer);
  };

  const handlePopoverEnter = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      setCloseTimer(null);
    }
  };

  const handlePopoverLeave = () => {
    setAnchor(null);
  };

  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
      <NavPopover
        open={open}
        anchor={anchor}
        onEnter={handlePopoverEnter}
        onLeave={handlePopoverLeave}
      >
        <MenuList>
          {profileList.map((item) => (
            <PopoverEntry
              key={item.name}
              name={item.name}
              icon={item.icon}
              onClose={handleMouseLeave}
            />
          ))}
        </MenuList>
      </NavPopover>
    </>
  );
};

export default DesktopAvatar;
