import { Box, Typography } from '@mui/material';
import CardCover, { CardCoverProps } from '../CardCover';

interface MediaCardProps extends CardCoverProps {
  rank: number;
}

const MediaCard = ({ to, alt, imagePath, rank }: MediaCardProps) => {
  return (
    <Box
      display="flex"
      position="relative"
      flexShrink={0}
      sx={{
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
      <CardCover to={to} alt={alt} imagePath={imagePath} />
    </Box>
  );
};

export default MediaCard;
