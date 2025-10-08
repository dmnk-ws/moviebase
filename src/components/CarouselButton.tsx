import React, { ReactNode } from 'react';
import { IconButton } from '@mui/material';

interface CarouselButtonProps {
  icon: ReactNode;
  direction: 'left' | 'right';
  onClick: () => void;
}

const CarouselButton = ({ icon, direction, onClick }: CarouselButtonProps) => {
  return (
    <IconButton
      className="carousel-arrow"
      onClick={onClick}
      sx={{
        position: 'absolute',
        [direction]: 0,
        top: 0,
        bottom: 0,
        zIndex: 20,
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        opacity: 0,
        transition: 'opacity 0.3s',
        borderRadius: 0,
        width: '50px',
        '&:hover': {
          bgcolor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      {icon}
    </IconButton>
  );
};

export default CarouselButton;
