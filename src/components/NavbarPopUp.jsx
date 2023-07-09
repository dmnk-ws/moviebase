import { ArrowDropUp } from '@mui/icons-material';
import { Paper, MenuList, MenuItem, ListItemIcon, ListItemText, Link } from '@mui/material';

import { navPopUp } from '../utils/constants';

const NavbarPopUp = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#000000' }}>
        <ArrowDropUp
            sx={{ color: "#FFFFFF" }}
        />
        <Paper sx={{ width: 180, maxWidth: '100%' }}>
            <MenuList
                sx={{ background: '#000000', border: '1px solid #FFFFFF' }}
            >
                {navPopUp.map(({name, icon}) => (
                    <MenuItem>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText>
                            <Link
                                sx={{ textDecoration: 'none', color: '#FFFFFF', '&:hover': { textDecoration: 'underline', textDecorationColor: '#FFFFFF' } }}
                            >
                                {name}
                            </Link>
                        </ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
        </Paper>
    </div>
);

export default NavbarPopUp