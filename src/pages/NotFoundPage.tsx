import { Button, Container, Paper, Stack, Text, Title } from '@mantine/core';
import { Compass, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container size="sm" py={80}>
      <Paper
        radius="xl"
        p="xl"
        style={{
          background: 'rgba(12, 28, 50, 0.6)',
          border: '1px solid rgba(243, 221, 176, 0.16)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Stack align="center" gap="md">
          <Compass size={40} color="var(--gold)" />
          <Title order={2} ta="center">
            Esta página no existe
          </Title>
          <Text c="dimmed" ta="center" maw={420}>
            Parece que este camino no está en el mapa de diciembre. Puedes volver al calendario
            para seguir descubriendo los días.
          </Text>
          <Button component={Link} to="/calendario" leftSection={<Home size={16} />} mt="sm">
            Volver al calendario
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
