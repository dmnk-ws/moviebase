import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTrendingShows,
  resetAllShows,
  selectShows,
} from '../../store/slices/showSlice';
import { MouseEvent, useEffect, useState } from 'react';
import { TrendingLayout, TrendingMediaCard } from '../index';

const Shows = () => {
  const dispatch = useAppDispatch();
  const shows = useAppSelector((state) => selectShows(state));
  const loading = useAppSelector((state) => state.shows.loading);
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');

  const handleTimeWindowChange = (
    _event: MouseEvent<HTMLElement>,
    newTimeWindow: 'day' | 'week'
  ) => {
    setTimeWindow(newTimeWindow);
  };

  useEffect(() => {
    dispatch(resetAllShows());
    dispatch(fetchTrendingShows({ timeWindow }));
  }, [dispatch, timeWindow]);

  return (
    <TrendingLayout
      header="Trending Shows"
      timeWindow={timeWindow}
      onTimeWindowChange={handleTimeWindowChange}
      loading={loading || shows.length === 0}
    >
      {shows.map((show, index) => (
        <TrendingMediaCard
          key={show.id}
          to={`/shows/${show.id}`}
          alt={show.name}
          imagePath={show.imagePath}
          rank={index + 1}
        />
      ))}
    </TrendingLayout>
  );
};

export default Shows;
