import React from 'react';
import { Typography } from '@mui/material';

interface MediaTitleProps {
  title: string;
}

const MediaTitle = ({ title }: MediaTitleProps) => {
  return (
    <Typography
      variant="h3"
      component="h1"
      fontWeight="bold"
      marginBottom={1}
      fontSize={{ xs: '1.75rem', sm: '2.5rem', md: '3rem' }}
    >
      {title}
    </Typography>
  );
};

export default MediaTitle;
