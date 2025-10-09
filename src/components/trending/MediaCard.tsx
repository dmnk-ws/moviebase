import { Card, CardMedia, Box, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

interface MediaCardProps {
  alt: string;
  imagePath: string | null;
  rank: number;
}

const CARD_DIMENSIONS = {
  width: { xs: 150, sm: 180, md: 200 },
  height: { xs: 225, sm: 270, md: 300 },
};

const MediaCard = ({ alt, imagePath, rank }: MediaCardProps) => {
  const hasImage = imagePath && imagePath.trim() !== '';

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          zIndex: 10,
        },
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          bottom: 10,
          left: -20,
          fontSize: { xs: '2rem', sm: '4rem', md: '6rem' },
          fontWeight: 900,
          color: 'black',
          lineHeight: 1,
          fontFamily: 'Arial Black, sans-serif',
          WebkitTextStroke: {
            xs: '2px white',
            md: '3px white',
          },
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 11,
        }}
      >
        {rank}
      </Typography>
      <Card
        sx={{
          width: CARD_DIMENSIONS.width,
          height: CARD_DIMENSIONS.height,
          boxShadow: 'none',
          borderRadius: 1,
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {hasImage ? (
          <CardMedia
            component="img"
            image={imagePath}
            alt={alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.800',
              color: 'grey.500',
            }}
          >
            <ImageIcon sx={{ fontSize: { xs: 40, md: 60 }, mb: 1 }} />
            <Typography
              variant="caption"
              align="center"
              sx={{
                px: 2,
                fontSize: { xs: '0.65rem', md: '0.75rem' },
              }}
            >
              No Image
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default MediaCard;
