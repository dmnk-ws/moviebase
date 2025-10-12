import React, { ReactNode } from 'react';
import { Stack } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingX={2}
      minHeight="100vh"
      marginBottom={10}
    >
      <Stack
        spacing={10}
        mx={{ xs: 0, md: 25, '2xl': 'auto' }}
        maxWidth="1280px"
        mt={10}
        width="100%"
        flex={1}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default Layout;
