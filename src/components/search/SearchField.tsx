import React, { ChangeEvent, ReactNode } from 'react';
import { TextField } from '@mui/material';

interface BaseSearchFieldProps {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  backgroundColor: string;
  color: string;
}

type SearchFieldProps = BaseSearchFieldProps &
  (
    | { startAdornment: ReactNode; endAdornment?: never }
    | { startAdornment?: never; endAdornment: ReactNode }
    | { startAdornment?: never; endAdornment?: never }
  );

const SearchField = ({
  searchTerm,
  onSearchChange,
  backgroundColor,
  color,
  startAdornment,
  endAdornment,
}: SearchFieldProps) => {
  return (
    <TextField
      fullWidth
      value={searchTerm}
      onChange={onSearchChange}
      placeholder="Search for movies, TV shows, keywords..."
      variant="outlined"
      slotProps={{
        input: {
          endAdornment,
          startAdornment,
          sx: {
            backgroundColor,
            borderRadius: '30px',
            color,
            ...(endAdornment && { p: 0 }),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 159, 128, 0.2)',
              borderRadius: '30px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 159, 128, 0.4)',
              borderRadius: '30px',
            },
            '&.Mui-focused': {
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: -2,
                borderRadius: '30px',
                padding: '2px',
                background:
                  'linear-gradient(to right, rgba(255, 159, 128, 1), rgba(220, 38, 38, 1))',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
            },
            '& input::placeholder': {
              color: 'rgba(0, 0, 0, 0.4)',
              opacity: 1,
            },
          },
        },
      }}
    />
  );
};

export default SearchField;
