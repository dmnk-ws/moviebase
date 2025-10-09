import React from 'react';
import { Box } from '@mui/material';
import { CardCoverProps } from './CardCover';
import { CardCover } from './index';

const MediaCard = ({ to, alt, imagePath }: CardCoverProps) => (
  <Box
    sx={{
      position: 'relative',
      display: 'flex',
      flexShrink: 0,
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
