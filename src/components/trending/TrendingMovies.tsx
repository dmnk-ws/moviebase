import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTrendingMovies,
  resetAllMovies,
  selectMovies,
} from '../../store/movieSlice';
import { useEffect, useState, MouseEvent } from 'react';
import TrendingLayout from './TrendingLayout';
import TrendingCard from './TrendingCard';

const TrendingMovies = () => {
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
      loading={loading}
    >
      {movies.map((movie, index) => (
        <TrendingCard
          key={movie.id}
          alt={movie.title}
          imagePath={movie.imagePath}
          rank={index + 1}
        />
      ))}
    </TrendingLayout>
  );
};

export default TrendingMovies;
