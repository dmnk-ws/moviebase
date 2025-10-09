import { Box } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { ReactNode, useRef, useState } from 'react';
import CarouselButton from './CarouselButton';

interface CarouselProps {
  children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth - 100;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      position="relative"
      width="100%"
      marginBottom={3}
      paddingX={2}
      sx={{
        '&:hover .carousel-arrow': { opacity: 1 },
        boxSizing: 'border-box',
      }}
    >
      {showLeftArrow && (
        <CarouselButton
          icon={<ChevronLeft fontSize="large" />}
          direction="left"
          onClick={() => scroll('left')}
        />
      )}
      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        display="flex"
        gap={4}
        padding={4}
        sx={{
          overflowX: 'scroll',
          overflowY: 'visible',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {children}
      </Box>
      {showRightArrow && (
        <CarouselButton
          icon={<ChevronRight fontSize="large" />}
          direction="right"
          onClick={() => scroll('right')}
        />
      )}
    </Box>
  );
};

export default Carousel;
