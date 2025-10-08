import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface ShowCardProps {
  name: string;
  description: string;
  imagePath: string | null;
}

const ShowCard = ({ name, description, imagePath }: ShowCardProps) => {
  return (
    <Card
      sx={{
        width: { md: '320px', sm: '550px', xs: '300px' },
        boxShadow: 'none',
        borderRadius: 0,
      }}
    >
      <Link to="">
        <CardMedia
          component="img"
          image={imagePath || ''}
          alt={name}
          sx={{ width: { md: '320px', sm: '550px', xs: '300px' }, height: 180 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
        <Link to="">
          <Typography fontWeight="bold" color="#FFFFFF">
            {name}
          </Typography>
        </Link>
        <Typography fontWeight="light" color="#FFFFFF">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShowCard;
