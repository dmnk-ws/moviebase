import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface MovieCardProps {
  title: string;
  imagePath: string | null;
}

const MovieCard = ({ title, imagePath }: MovieCardProps) => {
  return (
    <Card
      sx={{
        position: 'relative',
        width: { md: '320px', sm: '550px', xs: '300px' },
        height: 286,
        boxShadow: 'none',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        image={imagePath || ''}
        alt={title}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <CardContent
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: '50%',
        }}
      >
        <Typography fontWeight="bold" color="#FFFFFF" variant="h6" gutterBottom>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
