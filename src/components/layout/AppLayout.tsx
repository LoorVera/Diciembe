import { Box, Container, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import { CALENDAR_CONFIG } from '../../config/december';
import { Header } from './Header';
import classes from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box className={classes.shell}>
      <div className={classes.background} aria-hidden="true">
        <div className={classes.stars} />
      </div>
      <Header />
      <Container size="lg" component="main" className={classes.main} py={{ base: 'md', sm: 'xl' }}>
        {children}
      </Container>
      <Box component="footer" className={classes.footer}>
        <Container size="lg">
          <Text size="sm" c="dimmed" ta="center">
            {CALENDAR_CONFIG.footer}
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
