import React from 'react';
import {
  Avatar,
  Box,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const formatDate = (date?: string) => {
  if (!date) return '';

  try {
    return new Date(date).getFullYear().toString();
  } catch {
    return '';
  }
};

interface SearchEntryProps {
  path: string;
  imagePath: string | null;
  name: string;
  date?: string;
  description?: string;
  voteAverage?: number;
}

const SearchEntry = ({
  path,
  imagePath,
  name,
  date,
  description,
  voteAverage,
}: SearchEntryProps) => {
  const navigate = useNavigate();

  return (
    <ListItem
      onClick={() => navigate(path)}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 2,
        mb: 2,
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 159, 128, 0.05)',
          borderColor: 'rgba(220, 38, 38, 0.3)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={imagePath || undefined}
          alt={name}
          variant="rounded"
          sx={{
            width: 80,
            height: 120,
            borderRadius: 2,
            mr: 2,
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" color="white" fontWeight={600}>
              {name}
            </Typography>
            {date && (
              <Typography color="rgba(255, 255, 255, 0.5)" fontSize="1rem">
                ({formatDate(date)})
              </Typography>
            )}
          </Box>
        }
        secondary={
          <Box marginTop={1}>
            <Typography
              color="rgba(255, 255, 255, 0.7)"
              fontSize="0.9rem"
              lineHeight={1.5}
              display="-webkit-box"
              overflow="hidden"
              sx={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description || 'No description available'}
            </Typography>
            {voteAverage !== undefined && voteAverage > 0 && (
              <Chip
                label={`★ ${voteAverage.toFixed(1)}`}
                size="small"
                sx={{
                  mt: 1,
                  backgroundColor: 'rgba(220, 38, 38, 0.2)',
                  color: 'rgba(255, 159, 128, 1)',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        }
        slotProps={{
          secondary: {
            component: 'div',
          },
        }}
      />
    </ListItem>
  );
};

export default SearchEntry;
