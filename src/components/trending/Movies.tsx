import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTrendingMovies,
  resetAllMovies,
  selectMovies,
} from '../../store/slices/movieSlice';
import { useEffect, useState, MouseEvent } from 'react';
import { TrendingMediaCard, TrendingLayout } from '../index';

const Movies = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => selectMovies(state));
  const loading = useAppSelector((state) => state.movies.loading);
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');

  const handleTimeWindowChange = (
    _event: MouseEvent<HTMLElement>,
    newTimeWindow: 'day' | 'week'
  ) => {
    setTimeWindow(newTimeWindow);
  };

  useEffect(() => {
    dispatch(resetAllMovies());
    dispatch(fetchTrendingMovies({ timeWindow }));
  }, [dispatch, timeWindow]);

  return (
    <TrendingLayout
      header="Trending Movies"
      timeWindow={timeWindow}
      onTimeWindowChange={handleTimeWindowChange}
      loading={loading || movies.length === 0}
    >
      {movies.map((movie, index) => (
        <TrendingMediaCard
          key={movie.id}
          to={`/movies/${movie.id}`}
          alt={movie.title}
          imagePath={movie.imagePath}
          rank={index + 1}
        />
      ))}
    </TrendingLayout>
  );
};

export default Movies;
