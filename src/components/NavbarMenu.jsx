import { Link } from 'react-router-dom';
import { Typography, MenuList, MenuItem } from '@mui/material';

import '../index.css';
import { navList } from '../utils/constants';

const NavbarMenu = () => (
    <MenuList
        sx={{ display: { xs: 'flex', md: 'inline-flex' }, border: { xs: '1px solid #FFFFFF', md: 'none' }, justifyContent: 'flex-start', background: '#000000', flexDirection: { xs: 'column', md: 'row' } }}
    >
        {navList.map((nav, index) => (
            <MenuItem
                key={nav + index}
                sx={{ marginLeft: {xs: 0, md: '20px'} }}
            >
                <Link
                    className="nav-link"
                    to="/shows"
                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                >
                    <Typography
                        sx={{ color: '#FFFFFF', '&:hover': { color: '#D3D3D3' } }}
                    >
                        {nav}
                    </Typography>
                </Link>
            </MenuItem>
        ))}
    </MenuList>
);

export default NavbarMenu