import React from 'react';
import { Typography } from '@mui/material';

interface MediaYearProps {
  date: string;
}

const MediaYear = ({ date }: MediaYearProps) => {
  return (
    <Typography
      variant="h6"
      color="rgba(255, 255, 255, 0.7)"
      marginBottom={2}
      fontSize={{ xs: '1rem', sm: '1.25rem' }}
    >
      {new Date(date).getFullYear()}
    </Typography>
  );
};

export default MediaYear;
