import React, { ReactNode } from 'react';
import { Box, Button } from '@mui/material';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

const TabPanel = ({
  children,
  value,
  index,
  onLoadMore,
  hasMore,
  loading,
}: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
          {hasMore && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="outlined"
                onClick={onLoadMore}
                disabled={loading}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 159, 128, 0.5)',
                  '&:hover': {
                    borderColor: 'rgba(255, 159, 128, 1)',
                    backgroundColor: 'rgba(255, 159, 128, 0.1)',
                  },
                  '&:disabled': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                {loading ? 'Loading...' : 'Show More'}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
