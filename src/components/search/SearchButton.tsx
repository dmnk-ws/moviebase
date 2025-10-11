import React from 'react';
import { Button, InputAdornment } from '@mui/material';

const SearchButton = () => {
  return (
    <InputAdornment position="end">
      <Button
        type="submit"
        variant="contained"
        sx={{
          background:
            'linear-gradient(to right, rgba(255, 159, 128, 1), rgba(220, 38, 38, 1))',
          color: 'white',
          borderRadius: '30px',
          px: { xs: 2.5, md: 4 },
          height: '56px',
          textTransform: 'none',
          fontSize: { xs: '0.9rem', md: '1rem' },
          fontWeight: 600,
          boxShadow: 'none',
          minWidth: { xs: '70px', md: '90px' },
          '&:hover': {
            background:
              'linear-gradient(to right, rgba(255, 159, 128, 0.9), rgba(220, 38, 38, 0.9))',
            boxShadow: 'none',
          },
        }}
      >
        Search
      </Button>
    </InputAdornment>
  );
};

export default SearchButton;
