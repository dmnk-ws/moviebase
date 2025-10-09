import React from 'react';
import { Rating, Stack, Typography } from '@mui/material';

interface MediaRatingProps {
  voteAverage?: number;
}

const MediaRating = ({ voteAverage }: MediaRatingProps) => {
  if (!voteAverage) return null;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Rating
        value={voteAverage / 2}
        max={5}
        precision={0.1}
        readOnly
        sx={{
          '& .MuiRating-iconEmpty': {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      />
      <Typography variant="body2" fontWeight="semibold">
        {voteAverage.toFixed(1)}
      </Typography>
    </Stack>
  );
};

export default MediaRating;
