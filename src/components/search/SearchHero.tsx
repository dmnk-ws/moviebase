import { Box, Typography } from '@mui/material';
import { useRandomBackdrop } from '../../hooks/useRandomBackdrop';
import { useSearchForm } from '../../hooks/useSearchForm';
import { SearchField, SearchButton } from '../index';

const SearchHero = () => {
  const backdropUrl = useRandomBackdrop();
  const { searchTerm, handleSubmit, handleChange } = useSearchForm();

  return (
    <Box
      position="relative"
      width="100%"
      borderRadius={2}
      overflow="hidden"
      marginBottom={4}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        sx={{
          backgroundImage: backdropUrl ? `url("${backdropUrl}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      />
      <Box
        position="relative"
        zIndex={1}
        paddingX={{ xs: 3, md: 6 }}
        paddingY={{ xs: 4, md: 6 }}
      >
        <Typography
          variant="h2"
          color="white"
          component="h1"
          fontWeight={700}
          fontSize={{ xs: '2rem', md: '3rem' }}
          marginBottom={1}
        >
          Welcome.
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="white"
          fontWeight={400}
          fontSize={{ xs: '1rem', md: '1.5rem' }}
          marginBottom={3}
        >
          Discover millions of movies, shows and more.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} maxWidth="100%">
          <SearchField
            searchTerm={searchTerm}
            onSearchChange={handleChange}
            backgroundColor="rgba(255, 255, 255, 0.9)"
            color="rgba(0, 0, 0, 0.87)"
            endAdornment={<SearchButton />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchHero;
