import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const getRatingColor = (percent: number) => {
  let r, g, b: number;

  if (percent < 50) {
    const ratio = percent / 50;
    r = 219;
    g = Math.round(32 + (213 - 32) * ratio);
    b = 96;
  } else {
    const ratio = (percent - 50) / 50;
    r = Math.round(210 - (210 - 33) * ratio);
    g = Math.round(213 + (208 - 213) * ratio);
    b = Math.round(49 + (122 - 49) * ratio);
  }

  return `rgb(${r}, ${g}, ${b})`;
};

interface MediaCardProps {
  name: string;
  imagePath: string | null;
  to: string;
  rating?: number;
  date?: string;
}

const MediaCard = ({ name, imagePath, to, rating, date }: MediaCardProps) => {
  const ratingPercent = rating ? Math.round(rating * 10) : 0;
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: 200,
          height: '100%',
          backgroundColor: 'black',
          borderRadius: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(255, 159, 128, 0.3)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 4px 16px rgba(255, 159, 128, 0.3)',
            borderColor: 'rgba(255, 159, 128, 0.3)',
          },
        }}
      >
        <Box position="relative">
          <CardMedia
            sx={{
              height: 300,
              width: 200,
              backgroundColor: '#1a1a1a',
            }}
            image={imagePath || ''}
            title={name}
          />
          {rating && (
            <Box
              display="flex"
              position="absolute"
              bottom={-20}
              left={8}
              width={40}
              height={40}
              bgcolor="rgba(0, 0, 0, 0.9)"
              borderRadius="50%"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress
                variant="determinate"
                value={ratingPercent}
                size={40}
                thickness={3}
                sx={{
                  color: getRatingColor(ratingPercent),
                  position: 'absolute',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  },
                }}
              />
              <CircularProgress
                variant="determinate"
                value={100}
                size={40}
                thickness={3}
                sx={{
                  color: 'rgba(255, 255, 255, 0.2)',
                  position: 'absolute',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.65rem',
                  zIndex: 1,
                }}
              >
                {ratingPercent}%
              </Typography>
            </Box>
          )}
        </Box>
        <CardContent
          sx={{
            backgroundColor: 'black',
            paddingTop: 3.5,
            paddingX: 2,
            paddingBottom: 2,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            '&:last-child': {
              paddingBottom: '16px',
            },
          }}
        >
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              lineHeight: 1.3,
              marginBottom: '4px',
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.75rem',
            }}
          >
            {formattedDate}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MediaCard;
