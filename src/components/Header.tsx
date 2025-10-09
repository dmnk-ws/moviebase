import React from 'react';
import { Typography } from '@mui/material';

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  return (
    <Typography
      variant="h4"
      color="white"
      sx={{ fontSize: { xs: '1.25rem', md: '2rem' } }}
    >
      {text}
    </Typography>
  );
};

export default Header;
