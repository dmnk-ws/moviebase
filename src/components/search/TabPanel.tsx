import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import LoadMore from '../LoadMore';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  onLoadMore: () => void;
  loading: boolean;
  hasMore?: boolean;
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
    <Box component="div" role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box paddingTop={3}>
          {children}
          {hasMore && (
            <Box display="flex" justifyContent="center" marginTop={4}>
              <LoadMore onClick={onLoadMore} loading={loading} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;
