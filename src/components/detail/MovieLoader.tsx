import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMovieById, selectMovieById } from '../../store/slices/movieSlice';
import Movie from './Movie';
import NotFound from '../NotFound';
import { Loading } from '../index';

const MovieLoader = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [hasFetched, setHasFetched] = useState(false);
  const parsedId = id ? parseInt(id, 10) : null;
  const isValidId = typeof parsedId === 'number';
  const movie = useAppSelector((state) =>
    isValidId ? selectMovieById(state, parsedId) : null
  );

  useEffect(() => {
    if (!isValidId || !parsedId) return undefined;

    const promise = dispatch(fetchMovieById(parsedId));
    promise.unwrap().finally(() => setHasFetched(true));

    return () => promise.abort();
  }, [dispatch, parsedId, isValidId]);

  if (!isValidId) return <NotFound />;
  if (!hasFetched) return <Loading />;
  if (!movie) return <NotFound />;

  return <Movie id={movie.id} />;
};

export default MovieLoader;
