import React from 'react';
import { Box, Typography } from '@mui/material';

interface MediaOverviewProps {
  overview?: string;
}

const MediaOverview = ({ overview }: MediaOverviewProps) => {
  if (!overview) return null;

  return (
    <Box marginY={3}>
      <Typography variant="h6" fontWeight="bold" marginBottom={1}>
        Overview
      </Typography>
      <Typography variant="body1" lineHeight={1.7} maxWidth="800px">
        {overview}
      </Typography>
    </Box>
  );
};

export default MediaOverview;
