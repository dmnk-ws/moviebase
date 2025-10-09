import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, Box, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

export interface CardCoverProps {
  to: string;
  alt: string;
  imagePath: string | null;
}

const CARD_DIMENSIONS = {
  width: { xs: 150, sm: 180, md: 200 },
  height: { xs: 225, sm: 270, md: 300 },
};

const CardCover = ({ to, alt, imagePath }: CardCoverProps) => {
  const hasImage = imagePath && imagePath.trim() !== '';

  return (
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
      <Link to={to}>
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
      </Link>
    </Card>
  );
};

export default CardCover;
