import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/HelpOutlined';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        color: 'white',
        padding: 4,
      }}
    >
      <HelpIcon sx={{ fontSize: 100, marginBottom: 2, color: 'white' }} />
      <Typography variant="h3" component="h1" fontWeight="bold" marginBottom={2}>
        Not Found
      </Typography>
      <Typography variant="h6" marginBottom={4} color="rgba(255, 255, 255, 0.7)">
        The resource you&apos;re looking for doesn&apos;t exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{
          paddingX: 4,
          paddingY: 1.5,
          fontSize: '1rem',
          textTransform: 'none',
          borderRadius: 20,
          background:
            'linear-gradient(to right, rgba(255, 159, 128, 1), rgba(220, 38, 38, 1))',
          color: 'white',
          '&:hover': {
            background:
              'linear-gradient(to right, rgba(255, 159, 128, 0.9), rgba(220, 38, 38, 0.9))',
          },
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
