import React from 'react';
import { Chip, Stack } from '@mui/material';
import { Genre } from '../../entities/Genre';

interface MediaGenresProps {
  genres?: Genre[];
}

const MediaGenres = ({ genres }: MediaGenresProps) => {
  if (!genres || genres.length === 0) return null;

  return (
    <Stack direction="row" gap={2} flexWrap="wrap" marginBottom={3}>
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            borderRadius: 1,
            fontSize: { xs: '0.75rem', sm: '0.8125rem' },
          }}
        />
      ))}
    </Stack>
  );
};

export default MediaGenres;
