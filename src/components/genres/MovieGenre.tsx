import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMoviesByGenreId } from '../../store/slices/movieSlice';
import { selectMoviesByGenreId } from '../../store/selectors/movieSelector';
import { Carousel, MediaCard, CarouselSkeleton } from '../index';

interface MovieGenreProps {
  genre: number;
}

const MovieGenre = ({ genre }: MovieGenreProps) => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => selectMoviesByGenreId(state, genre));
  const loading = useAppSelector((state) => state.movies.loading);

  useEffect(() => {
    dispatch(fetchMoviesByGenreId(genre));
  }, [dispatch, genre]);

  return loading || movies.length === 0 ? (
    <CarouselSkeleton />
  ) : (
    <Carousel>
      {movies.map((movie) => (
        <MediaCard alt={movie.title} imagePath={movie.imagePath} />
      ))}
    </Carousel>
  );
};

export default MovieGenre;
