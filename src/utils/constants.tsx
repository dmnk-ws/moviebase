import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { PersonOutline } from '@mui/icons-material';

export const navList = [
  { label: 'Start', path: '/' },
  { label: 'Movies', path: '/movies' },
  { label: 'Shows', path: '/shows' },
];

export const navPopUp = [
  { name: 'My Profile', icon: <PersonOutline sx={{ color: '#FFFFFF' }} /> },
  { name: 'Settings', icon: <SettingsIcon sx={{ color: '#FFFFFF' }} /> },
  { name: 'Logout', icon: <LogoutIcon sx={{ color: '#FFFFFF' }} /> },
];
