import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchShowById, selectShowById } from '../../store/slices/showSlice';
import Show from './Show';
import NotFound from '../NotFound';
import { Loading } from '../index';

const ShowLoader = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [hasFetched, setHasFetched] = useState(false);
  const parsedId = id ? parseInt(id, 10) : null;
  const isValidId = typeof parsedId === 'number';
  const show = useAppSelector((state) =>
    isValidId ? selectShowById(state, parsedId) : null
  );

  useEffect(() => {
    if (!isValidId || !parsedId) return undefined;

    const promise = dispatch(fetchShowById(parsedId));
    promise.unwrap().finally(() => setHasFetched(true));

    return () => promise.abort();
  }, [dispatch, parsedId, isValidId]);

  if (!isValidId) return <NotFound />;
  if (!hasFetched) return <Loading />;
  if (!show) return <NotFound />;

  return <Show id={show.id} />;
};

export default ShowLoader;