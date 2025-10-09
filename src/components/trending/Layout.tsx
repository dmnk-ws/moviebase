import React, { MouseEvent } from 'react';
import { Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Carousel, Header, TrendingButtonGroup, CarouselSkeleton } from '../index';

interface LayoutProps {
  header: string;
  timeWindow: 'day' | 'week';
  onTimeWindowChange: (
    _event: MouseEvent<HTMLElement>,
    timeWindow: 'day' | 'week'
  ) => void;
  loading: boolean;
  children: React.ReactNode;
}

const Layout = ({
  header,
  timeWindow,
  onTimeWindowChange,
  loading,
  children,
}: LayoutProps) => {
  const orientation = timeWindow === 'day' ? 'left' : 'right';

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        display="flex"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={{ xs: 2, md: 0 }}
      >
        <Stack direction="row" spacing={2} display="flex" alignItems="center">
          <TrendingUpIcon
            sx={{ color: 'white', fontSize: { xs: '1.5rem', md: '2.5rem' } }}
          />
          <Header text={header} />
        </Stack>
        <TrendingButtonGroup
          timeWindow={timeWindow}
          onChange={onTimeWindowChange}
          orientation={orientation}
        />
      </Stack>
      {loading ? <CarouselSkeleton /> : <Carousel>{children}</Carousel>}
    </Stack>
  );
};

export default Layout;
