import { Card, CardMedia } from '@mui/material';

interface MediaCardProps {
  alt: string;
  imagePath: string | null;
}

const MediaCard = ({ alt, imagePath }: MediaCardProps) => {
  return (
    <Card
      sx={{
        minWidth: { md: '200px', sm: '180px', xs: '150px' },
        width: { md: '200px', sm: '180px', xs: '150px' },
        height: { md: '300px', sm: '270px', xs: '225px' },
        boxShadow: 'none',
        borderRadius: 1,
        overflow: 'hidden',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'transform 0.3s ease, z-index 0s 0.15s',
        '&:hover': {
          transform: 'scale(1.1)',
          zIndex: 10,
          transition: 'transform 0.3s ease, z-index 0s',
        },
      }}
    >
      <CardMedia
        component="img"
        image={imagePath || ''}
        alt={alt}
        width="100%"
        height="100%"
      />
    </Card>
  );
};

export default MediaCard;