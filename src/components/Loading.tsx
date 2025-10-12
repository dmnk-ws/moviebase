import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <CircularProgress size={60} sx={{ color: 'white' }} />
    </Box>
  );
};

export default Loading;
