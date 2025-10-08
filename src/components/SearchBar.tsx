import { Paper } from '@mui/material';
import { SearchButton } from './';

import '../index.css';

interface SearchBarProps {
  updateActive: (active: boolean) => void;
  padding?: string;
}

const SearchBar = ({ updateActive, padding }: SearchBarProps) => {
  return (
    <Paper
      component="form"
      onSubmit={() => {}}
      sx={{
        display: 'flex',
        border: '1px solid #FFFFFF',
        boxShadow: 'none',
        background: '#000000',
        alignItems: 'center',
      }}
    >
      <SearchButton updateActive={updateActive} active={false} />
      <input
        className="search-bar"
        placeholder="Search..."
        value=""
        onChange={() => {}}
      />
      <i></i>
    </Paper>
  );
};

export default SearchBar;
