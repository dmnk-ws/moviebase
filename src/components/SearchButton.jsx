import { Search } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const SearchButton = ({ updateActive, active }) => {
  const handleClick = () => {
    updateActive(active);
  };

  return (
    <IconButton
      type="submit"
      onClick={handleClick}
      sx={{ color: '#FFFFFF', padding: 0, '&:hover': { background: '#333333' } }}
    >
      <Search fontSize="large" />
    </IconButton>
  );
};

export default SearchButton;
