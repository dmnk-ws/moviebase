import React from 'react';
import { Box } from '@mui/material';

interface MediaBackdropProps {
  backdropPath?: string | null;
}

const MediaBackdrop = ({ backdropPath }: MediaBackdropProps) => {
  if (!backdropPath) return null;

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      height={{ xs: '300px', md: '500px' }}
      zIndex={0}
      sx={{
        backgroundImage: {
          xs: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 1) 100%), url(${backdropPath})`,
          md: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 1) 100%), linear-gradient(to right, rgba(0, 0, 0, 0.95) 30%, rgba(0, 0, 0, 0.4) 70%), url(${backdropPath})`,
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

export default MediaBackdrop;
