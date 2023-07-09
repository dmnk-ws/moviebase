import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { PersonOutline } from '@mui/icons-material';

export const navList = [
    "Start",
    "Movies",
    "Shows"
];

export const navPopUp = [
    {name: "My Profile", icon: <PersonOutline sx={{ color: '#FFFFFF' }} /> },
    {name: "Settings", icon:  <SettingsIcon sx={{ color: '#FFFFFF' }} /> },
    {name: "Logout", icon: <LogoutIcon sx={{ color: '#FFFFFF' }} /> }
];