import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { PersonOutline } from '@mui/icons-material';
import { Paper, MenuList, MenuItem, ListItemIcon, ListItemText, Link } from '@mui/material';

const NavbarPopUp = () => (
    <Paper sx={{ width: 180, maxWidth: '100%' }}>
        <MenuList
            sx={{ background: '#000000', border: '1px solid #FFFFFF' }}
        >
            <MenuItem>
                <ListItemIcon>
                    <PersonOutline
                        sx={{ color: '#FFFFFF' }}
                    />
                </ListItemIcon>
                <ListItemText>
                    <Link
                        sx={{ textDecoration: 'none', color: '#FFFFFF', '&:hover': { textDecoration: 'underline', textDecorationColor: '#FFFFFF' } }}
                    >
                        Mein Profil
                    </Link>
                </ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <SettingsIcon
                        sx={{ color: '#FFFFFF' }}
                    />
                </ListItemIcon>
                <ListItemText>
                    <Link
                        sx={{ textDecoration: 'none', color: '#FFFFFF', '&:hover': { textDecoration: 'underline', textDecorationColor: '#FFFFFF' } }}
                    >
                        Einstellungen
                    </Link>
                </ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <LogoutIcon 
                        sx={{ color: '#FFFFFF' }}
                    />
                </ListItemIcon>
                <ListItemText>
                    <Link
                        sx={{ textDecoration: 'none', color: '#FFFFFF', '&:hover': { textDecoration: 'underline', textDecorationColor: '#FFFFFF' } }}
                    >
                        Abmelden
                    </Link>
                </ListItemText>
            </MenuItem>
        </MenuList>
    </Paper>
);

export default NavbarPopUp