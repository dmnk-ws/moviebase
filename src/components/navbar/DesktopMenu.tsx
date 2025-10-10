import React, { Fragment, MouseEvent, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Popover,
  MenuList,
  MenuItem,
  ListItemText,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { navMenuList } from '../../utils/constants';
import { Link } from 'react-router-dom';

const DesktopMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMouseEnter = (event: MouseEvent<HTMLElement>, menuName: string) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  return (
    <Stack
      direction="row"
      spacing={5}
      display={{ xs: 'none', md: 'flex' }}
      flexGrow={0}
    >
      {navMenuList.map((nav) => (
        <Fragment key={nav.name}>
          {nav.entries ? (
            <>
              <Box
                onMouseEnter={(e) => handleMouseEnter(e, nav.name)}
                color="white"
                marginLeft="20px"
                display="flex"
                alignItems="center"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#D3D3D3',
                  },
                }}
              >
                <Typography>{nav.name}</Typography>
                <ExpandMore
                  className={openMenu === nav.name ? 'nav-arrow' : undefined}
                  sx={{
                    transition: 'transform 200ms ease',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
              <Popover
                open={openMenu === nav.name}
                anchorEl={anchorEl}
                onClose={handleMouseLeave}
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
                    onMouseLeave: handleMouseLeave,
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
                  {nav.entries.map((entry) => (
                    <MenuItem
                      key={entry.name}
                      component={Link}
                      to={entry.path}
                      onClick={handleMouseLeave}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      <ListItemText>
                        <Typography sx={{ color: 'white' }}>{entry.name}</Typography>
                      </ListItemText>
                    </MenuItem>
                  ))}
                </MenuList>
              </Popover>
            </>
          ) : (
            <Box
              component={Link}
              to={nav.path}
              color="white"
              marginLeft="20px"
              display="flex"
              alignItems="center"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: '#D3D3D3',
                },
              }}
            >
              <Typography>{nav.name}</Typography>
            </Box>
          )}
        </Fragment>
      ))}
    </Stack>
  );
};

export default DesktopMenu;
