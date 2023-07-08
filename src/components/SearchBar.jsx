import { Paper } from '@mui/material';
import { SearchButton } from './';

import '../index.css';

const SearchBar = ({updateActive}) => {
    return (
        <Paper
            component="form"
            onSubmit={() => {}}
            sx={{ display: 'flex', border: '1px solid #FFFFFF', boxShadow: 'none', background: "#000000", alignItems: 'center' }}
        >
            <SearchButton updateActive={updateActive} active={false} />
            <input
                autoFocus
                className="search-bar"
                placeholder="Search..."
                value=""
                onChange={() => {}}
            />
            <i></i>
        </Paper>
    )
}

export default SearchBar