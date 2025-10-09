import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchShowsByGenreId } from '../../store/slices/showSlice';
import { selectShowsByGenreId } from '../../store/selectors/showSelector';
import { Carousel, MediaCard, CarouselSkeleton } from '../index';

interface ShowGenreProps {
  genre: number;
}

const ShowGenre = ({ genre }: ShowGenreProps) => {
  const dispatch = useAppDispatch();
  const shows = useAppSelector((state) => selectShowsByGenreId(state, genre));
  const loading = useAppSelector((state) => state.shows.loading);

  useEffect(() => {
    dispatch(fetchShowsByGenreId(genre));
  }, [dispatch, genre]);

  return loading || shows.length === 0 ? (
    <CarouselSkeleton />
  ) : (
    <Carousel>
      {shows.map((show) => (
        <MediaCard alt={show.name} imagePath={show.imagePath} />
      ))}
    </Carousel>
  );
};

export default ShowGenre;
