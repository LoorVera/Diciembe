import { Center, Loader, Stack, Text } from '@mantine/core';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function AuthGate() {
  return (
    <Center mih="100dvh" px="md">
      <Stack align="center" gap="sm">
        <Loader color="yellow" type="dots" />
        <Text c="dimmed" size="sm">
          Comprobando tu sesión…
        </Text>
      </Stack>
    </Center>
  );
}

/** Solo permite el acceso a personas autenticadas. */
export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <AuthGate />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

/** Evita que una sesión ya iniciada vuelva a ver el formulario de acceso. */
export function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) return <AuthGate />;

  if (user) {
    return <Navigate to="/calendario" replace />;
  }

  return <Outlet />;
}
