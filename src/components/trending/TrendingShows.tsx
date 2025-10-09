import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTrendingShows, resetAllShows, selectShows } from '../../store/showSlice';
import { MouseEvent, useEffect, useState } from 'react';
import TrendingLayout from './TrendingLayout';
import TrendingCard from './TrendingCard';

const TrendingShows = () => {
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
      loading={loading}
    >
      {shows.map((show, index) => (
        <TrendingCard
          key={show.id}
          alt={show.name}
          imagePath={show.imagePath}
          rank={index + 1}
        />
      ))}
    </TrendingLayout>
  );
};

export default TrendingShows;
