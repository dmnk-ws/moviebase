import React, { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface ButtonGroupProps {
  timeWindow: 'day' | 'week';
  onChange: (_event: MouseEvent<HTMLElement>, timeWindow: 'day' | 'week') => void;
  orientation: 'left' | 'right';
}

const ButtonGroup = ({ timeWindow, onChange, orientation }: ButtonGroupProps) => {
  return (
    <ToggleButtonGroup
      value={timeWindow}
      exclusive
      onChange={onChange}
      size="small"
      sx={{
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        '& .MuiToggleButton-root': {
          color: 'rgba(255, 255, 255, 0.7)',
          border: 'none',
          textTransform: 'none',
          px: { xs: 1.5, md: 2.5 },
          py: { xs: 0.3, md: 0.5 },
          fontSize: { xs: '0.75rem', md: '0.9rem' },
          borderRadius: '20px !important',
          '&.Mui-selected': {
            background: `linear-gradient(to ${orientation}, rgba(255, 159, 128, 1), rgba(220, 38, 38, 1))`,
            color: 'white',
            '&:hover': {
              background: `linear-gradient(to ${orientation}, rgba(255, 159, 128, 0.9), rgba(220, 38, 38, 0.9))`,
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      }}
    >
      <ToggleButton value="day">Today</ToggleButton>
      <ToggleButton value="week">This Week</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ButtonGroup;
