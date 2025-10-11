import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearchForm = (initialValue: string = '') => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const search = searchTerm?.trim();

    if (search) navigate(`/search/${encodeURIComponent(search)}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  return { searchTerm, handleSubmit, handleChange };
};
