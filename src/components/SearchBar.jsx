import { Paper } from '@mui/material';
import { SearchButton } from './';

import '../index.css';

const SearchBar = ({updateActive}) => {
    return (
        <Paper
            component="form"
            onSubmit={() => {}}
            sx={{ borderRadius: 20, border: '1px solid #E3E3E3', pl: 2, boxShadow: 'none' }}
        >
            <input
                className="search-bar"
                placeholder="Search..." 
                value="" 
                onChange={() => {}}
            />
            <SearchButton color="#000000" updateActive={updateActive} active={false} />
        </Paper>
    )
}

export default SearchBar