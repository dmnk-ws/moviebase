import { InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchField from './SearchField';
import { useSearchForm } from '../../hooks/useSearchForm';

interface SearchBarProps {
  initialValue: string;
}

const SearchBar = ({ initialValue }: SearchBarProps) => {
  const { searchTerm, handleSubmit, handleChange } = useSearchForm(initialValue);

  return (
    <Box component="form" onSubmit={handleSubmit} width="100%" maxWidth="1280px">
      <SearchField
        searchTerm={searchTerm}
        onSearchChange={handleChange}
        backgroundColor="rgba(255, 255, 255, 0.05)"
        color="white"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default SearchBar;
