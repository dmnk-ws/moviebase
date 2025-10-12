import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      py={3}
      px={2}
      mt="auto"
      textAlign="center"
      borderTop="1px solid rgba(255, 255, 255, 0.2)"
    >
      <Typography variant="body2" sx={{ color: 'white' }}>
        © {new Date().getFullYear()} MovieBase. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
