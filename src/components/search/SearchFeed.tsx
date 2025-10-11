import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tabs, Tab, Typography, List, Chip, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  resetSearch,
  searchKeyword,
  searchMovieByKeyword,
  searchShowByKeyword,
  selectSearchKeywords,
  selectSearchMovies,
  selectSearchShows,
} from '../../store/slices/searchSlice';
import {
  selectKeywordPagination,
  selectMoviePagination,
  selectShowPagination,
} from '../../store/selectors/searchSelector';
import { Layout, Loading, SearchBar, SearchEntry } from '../index';
import TabPanel from './TabPanel';

const SearchFeed = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const movies = useAppSelector((state) => selectSearchMovies(state));
  const shows = useAppSelector((state) => selectSearchShows(state));
  const keywords = useAppSelector((state) => selectSearchKeywords(state));
  const moviePagination = useAppSelector((state) => selectMoviePagination(state));
  const showPagination = useAppSelector((state) => selectShowPagination(state));
  const keywordPagination = useAppSelector((state) => selectKeywordPagination(state));
  const search = decodeURIComponent(searchTerm || '');
  const isInitialLoading =
    moviePagination.page === 0 &&
    showPagination.page === 0 &&
    keywordPagination.page === 0;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLoadMoreMovies = () => {
    dispatch(searchMovieByKeyword({ query: search, page: moviePagination.page + 1 }));
  };

  const handleLoadMoreShows = () => {
    dispatch(searchShowByKeyword({ query: search, page: showPagination.page + 1 }));
  };

  const handleLoadMoreKeywords = () => {
    dispatch(searchKeyword({ query: search, page: keywordPagination.page + 1 }));
  };

  useEffect(() => {
    if (search) {
      dispatch(resetSearch());
      dispatch(searchMovieByKeyword({ query: search, page: 1 }));
      dispatch(searchShowByKeyword({ query: search, page: 1 }));
      dispatch(searchKeyword({ query: search, page: 1 }));
    }
  }, [dispatch, search]);

  if (
    isInitialLoading &&
    (moviePagination.loading || showPagination.loading || keywordPagination.loading)
  )
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <Box width="100%">
        <Stack spacing={6} marginBottom={4}>
          <SearchBar initialValue={search} />
          <Typography variant="h4" color="white">
            Search Results for &quot;{search}&quot;
          </Typography>
        </Stack>
        <Box borderBottom={1} borderColor="rgba(255, 255, 255, 0.1)">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="inherit"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                minWidth: 120,
                transition: 'all 0.3s ease',
              },
              '& .Mui-selected': {
                color: 'white',
              },
              '& .MuiTabs-indicator': {
                height: 3,
                background:
                  'linear-gradient(to right, rgba(255, 159, 128, 1), rgba(220, 38, 38, 1))',
              },
            }}
          >
            <Tab label={`Movies (${moviePagination.totalResults})`} />
            <Tab label={`Shows (${showPagination.totalResults})`} />
            <Tab label={`Keywords (${keywordPagination.totalResults})`} />
          </Tabs>
        </Box>
        <TabPanel
          value={activeTab}
          index={0}
          onLoadMore={handleLoadMoreMovies}
          hasMore={moviePagination.page < moviePagination.totalPages}
          loading={moviePagination.loading}
        >
          {movies.length === 0 ? (
            <Typography color="rgba(255, 255, 255, 0.7)">No movies found</Typography>
          ) : (
            <List sx={{ width: '100%', bgcolor: 'transparent' }}>
              {movies.map((movie) => (
                <SearchEntry
                  key={movie.id}
                  path={`/movies/${movie.id}`}
                  imagePath={movie.imagePath}
                  name={movie.title}
                  date={movie.releaseDate}
                  description={movie.overview}
                  voteAverage={movie.voteAverage}
                />
              ))}
            </List>
          )}
        </TabPanel>
        <TabPanel
          value={activeTab}
          index={1}
          onLoadMore={handleLoadMoreShows}
          hasMore={showPagination.page < showPagination.totalPages}
          loading={showPagination.loading}
        >
          {shows.length === 0 ? (
            <Typography color="rgba(255, 255, 255, 0.7)">No shows found</Typography>
          ) : (
            <List sx={{ width: '100%', bgcolor: 'transparent' }}>
              {shows.map((show) => (
                <SearchEntry
                  key={show.id}
                  path={`/shows/${show.id}`}
                  imagePath={show.imagePath}
                  name={show.name}
                  date={show.firstAirDate}
                  description={show.overview}
                  voteAverage={show.voteAverage}
                />
              ))}
            </List>
          )}
        </TabPanel>
        <TabPanel
          value={activeTab}
          index={2}
          onLoadMore={handleLoadMoreKeywords}
          hasMore={keywordPagination.page < keywordPagination.totalPages}
          loading={keywordPagination.loading}
        >
          {keywords.length === 0 ? (
            <Typography color="rgba(255, 255, 255, 0.7)">No keywords found</Typography>
          ) : (
            <Box display="flex" flexWrap="wrap" gap={2}>
              {keywords.map((keyword) => (
                <Chip
                  key={keyword.id}
                  label={keyword.name}
                  sx={{
                    background:
                      'linear-gradient(to right, rgba(255, 159, 128, 0.15), rgba(220, 38, 38, 0.15))',
                    border: '1px solid rgba(255, 159, 128, 0.3)',
                    color: 'white',
                    opacity: 0.8,
                  }}
                />
              ))}
            </Box>
          )}
        </TabPanel>
      </Box>
    </Layout>
  );
};

export default SearchFeed;
