import { Stack } from '@mui/material';

import { ShowCard } from './';
import { Show } from '../services/MediaApi';

interface ShowsProps {
  shows: Show[];
}

const Shows = ({ shows }: ShowsProps) => {
  if (!shows?.length) return 'Loading...';

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center' },
        alignItems: { xs: 'center' },
      }}
    >
      {shows.map((show) => (
        <ShowCard
          key={show.id}
          name={show.name}
          description={show.description}
          imagePath={show.imagePath}
        />
      ))}
    </Stack>
  );
};

export default Shows;
