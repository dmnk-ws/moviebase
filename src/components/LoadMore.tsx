import React from 'react';
import { Button } from '@mui/material';

interface LoadMoreProps {
  onClick: () => void;
  loading: boolean;
}

const LoadMore = ({ onClick, loading }: LoadMoreProps) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={loading}
      sx={{
        color: 'white',
        borderRadius: '20px',
        borderColor: 'rgba(255, 159, 128, 0.5)',
        textTransform: 'none',
        '&:hover': {
          borderColor: 'rgba(255, 159, 128, 1)',
          backgroundColor: 'rgba(255, 159, 128, 0.1)',
        },
        '&:disabled': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          color: 'rgba(255, 255, 255, 0.5)',
        },
      }}
    >
      {loading ? 'Loading...' : 'Show More'}
    </Button>
  );
};

export default LoadMore;
