import { Search } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const SearchButton = ({color, updateActive, active}) => {

    const handleClick = () => {
        updateActive(active);
    }

    return (
        <IconButton 
            type="submit"
            onClick={handleClick}
            sx={{ color: color }}
        >
            <Search 
                fontSize="large" 
            />
        </IconButton>
    )
};

export default SearchButton