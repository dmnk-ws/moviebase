import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

import { Movies, Shows } from './';

const NavbarMenu = () => (
    <Box
        sx={{ display: { sm: 'flex', md: 'inline-flex' }, justifyContent: 'flex-start' }}
    >
        <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF', marginLeft: '30px' }}
        >
            Start
        </Link>
        <Link
            to="/movies"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF', marginLeft: '30px' }}
        >
            <Movies />
        </Link>
        <Link
            to="/shows"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF', marginLeft: '30px' }}
        >
            <Shows />
        </Link>
    </Box>
);

export default NavbarMenu