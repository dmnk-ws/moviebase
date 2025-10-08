import { Stack } from '@mui/material';

import { ShowCard } from './';

const Movies = ({ shows }) => {
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
      {shows.map((show, index) => (
        <ShowCard key={index} show={show} />
      ))}
    </Stack>
  );
};

export default Movies;
