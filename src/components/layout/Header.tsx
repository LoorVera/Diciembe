import { ActionIcon, Box, Container, Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { LogOut, Snowflake, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import { CALENDAR_CONFIG } from '../../config/december';
import { useAuth } from '../../hooks/useAuth';
import classes from './Header.module.css';

export function Header() {
  const { logout } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const onLogout = async () => {
    setSigningOut(true);
    try {
      await logout();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <Box component="header" className={classes.header}>
      <div className={classes.lights} aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className={classes.bulb} style={{ ['--i' as string]: i }} />
        ))}
      </div>

      <Container size="lg" py={{ base: 'md', sm: 'xl' }}>
        <Group justify="space-between" align="flex-start" gap="md" wrap="wrap">
          <Stack gap={6} className={classes.hero}>
            <Group gap="xs" className={classes.kicker}>
              <Snowflake size={16} />
              <Text size="xs" tt="uppercase" fw={700} lts={1.4}>
                {CALENDAR_CONFIG.monthName} {CALENDAR_CONFIG.year}
              </Text>
            </Group>

            <Group gap="sm" align="center">
              <Title order={1} className={classes.title}>
                {CALENDAR_CONFIG.title}
              </Title>
              <Sparkles className={classes.sparkle} size={24} aria-hidden="true" />
            </Group>

            <Text className={classes.subtitle} maw={620}>
              {CALENDAR_CONFIG.subtitle}
            </Text>

            <Group gap="xs" className={classes.quote}>
              <Star size={14} aria-hidden="true" />
              <Text size="sm" fs="italic">
                {CALENDAR_CONFIG.quote}
              </Text>
            </Group>
          </Stack>

          <Tooltip label="Cerrar sesión" withArrow>
            <ActionIcon
              variant="light"
              color="yellow"
              size="lg"
              radius="xl"
              onClick={onLogout}
              loading={signingOut}
              aria-label="Cerrar sesión"
              className={classes.logout}
            >
              <LogOut size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Container>
    </Box>
  );
}
