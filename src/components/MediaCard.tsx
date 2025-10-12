import React from 'react';
import { Box } from '@mui/material';
import { CardCoverProps } from './CardCover';
import { CardCover } from './index';

const MediaCard = ({ to, alt, imagePath }: CardCoverProps) => (
  <Box
    display="flex"
    position="relative"
    flexShrink={0}
    sx={{
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        zIndex: 10,
      },
    }}
  >
    <CardCover to={to} alt={alt} imagePath={imagePath} />
  </Box>
);

export default MediaCard;
