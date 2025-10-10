import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { PersonOutline, Home, Movie, Tv } from '@mui/icons-material';
import { NavbarEntry } from '../components/navbar/Navbar';

export const navMenuList = [
  { name: 'Start', path: '/', icon: <Home sx={{ color: 'white' }} /> },
  {
    name: 'Movies',
    icon: <Movie sx={{ color: 'white' }} />,
    entries: [
      { name: 'Top Rated', path: '/movies/top-rated' },
      { name: 'Genres', path: '/movies/genres' },
    ],
  },
  {
    name: 'Shows',
    icon: <Tv sx={{ color: 'white' }} />,
    entries: [
      { name: 'Top Rated', path: '/shows/top-rated' },
      { name: 'Genres', path: '/shows/genres' },
    ],
  },
];

export const profileList: NavbarEntry[] = [
  { name: 'My Profile', icon: <PersonOutline sx={{ color: '#FFFFFF' }} /> },
  { name: 'Settings', icon: <SettingsIcon sx={{ color: '#FFFFFF' }} /> },
  { name: 'Logout', icon: <LogoutIcon sx={{ color: '#FFFFFF' }} /> },
];
