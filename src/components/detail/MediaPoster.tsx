import React from 'react';
import { Box } from '@mui/material';

interface MediaPosterProps {
  imagePath: string | null;
  alt: string;
}

const MediaPoster = ({ imagePath, alt }: MediaPosterProps) => {
  if (!imagePath) return null;

  return (
    <Box
      component="img"
      src={imagePath}
      alt={alt}
      width={{ xs: '100%', sm: '250px', md: '300px' }}
      height={{ xs: 'auto', sm: '375px', md: '450px' }}
      maxWidth={{ xs: '300px', sm: 'none' }}
      borderRadius={2}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)"
      flexShrink={0}
      alignSelf={{ xs: 'center', md: 'flex-start' }}
    />
  );
};

export default MediaPoster;
