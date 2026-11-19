import { Box, Container, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { Snowflake, Sparkles, Star } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import classes from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <Box className={classes.page}>
      <div className={classes.snow} aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => (
          <span key={index} className={classes.flake} style={{ ['--i' as string]: index }} />
        ))}
      </div>
      <div className={classes.glow} aria-hidden="true" />

      <Container size="xs" className={classes.container}>
        <Paper className={classes.card} radius="xl" p={{ base: 'lg', sm: 'xl' }} shadow="xl">
          <Stack gap="lg">
            <Stack gap={6} align="center">
              <Group gap="xs" className={classes.badge}>
                <Star size={14} />
                <Text size="xs" tt="uppercase" fw={700} lts={1.2}>
                  Acceso privado
                </Text>
              </Group>

              <Group gap="sm" justify="center">
                <Snowflake className={classes.icon} size={28} aria-hidden="true" />
                <Title order={1} className={classes.title} ta="center">
                  Diciembre mágico
                </Title>
                <Sparkles className={classes.iconGold} size={26} aria-hidden="true" />
              </Group>

              <Text c="dimmed" ta="center" maw={360}>
                Un calendario privado para abrir, día a día, la magia de esta temporada.
              </Text>
            </Stack>

            <LoginForm />

            <Group justify="center" gap="xs" className={classes.footerDecor} aria-hidden="true">
              <span />
              <Snowflake size={14} />
              <span />
            </Group>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
