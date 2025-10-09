import React from 'react';
import { Box, Skeleton } from '@mui/material';

const CarouselSkeleton = () => {
  return (
    <Box
      display="flex"
      gap={4}
      padding={4}
      sx={{
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {[...Array(6)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          animation="wave"
          sx={{
            minWidth: { md: '200px', sm: '180px', xs: '150px' },
            width: { md: '200px', sm: '180px', xs: '150px' },
            height: { md: '300px', sm: '270px', xs: '225px' },
            borderRadius: 1,
            flexShrink: 0,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      ))}
    </Box>
  );
};

export default CarouselSkeleton;
