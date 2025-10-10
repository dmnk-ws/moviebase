import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Logo = () => {
  return (
    <Box
      display="flex"
      flexGrow={{ xs: 1, md: 0 }}
      justifyContent={{ xs: 'center', md: 'flex-start' }}
      marginRight={{ xs: 0, md: '40px' }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Box component="img" src={logo} alt="logo" className="logo" />
      </Link>
    </Box>
  );
};

export default Logo;
