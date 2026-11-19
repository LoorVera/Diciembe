import { Alert, Button, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { AlertCircle, LogIn, Mail } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getLoginFieldErrors, loginSchema, type LoginFieldErrors } from '../../schemas/auth.schema';

export function LoginForm() {
  const { login, isConfigured, error: authError, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const visibleError = localError ?? authError;
  const disabled = !isConfigured || submitting;

  const helper = useMemo(() => {
    if (isConfigured) return null;
    return 'La configuración de Firebase aún no está lista. Completa el archivo .env.local y reinicia el servidor.';
  }, [isConfigured]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setLocalError(null);
    clearError();

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setFieldErrors(getLoginFieldErrors(parsed.error));
      return;
    }

    setSubmitting(true);
    try {
      await login(parsed.data);
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : 'No se pudo iniciar sesión.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack gap="md">
        {helper ? (
          <Alert color="yellow" variant="light" icon={<AlertCircle size={16} />}>
            {helper}
          </Alert>
        ) : null}

        {visibleError ? (
          <Alert color="red" variant="light" icon={<AlertCircle size={16} />}>
            {visibleError}
          </Alert>
        ) : null}

        <TextInput
          label="Correo electrónico"
          placeholder="nombre@ejemplo.com"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          error={fieldErrors.email}
          leftSection={<Mail size={16} />}
          disabled={submitting}
          size="md"
        />

        <PasswordInput
          label="Contraseña"
          placeholder="Tu contraseña"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          error={fieldErrors.password}
          disabled={submitting}
          size="md"
        />

        <Button
          type="submit"
          size="md"
          loading={submitting}
          disabled={disabled}
          leftSection={<LogIn size={18} />}
          fullWidth
          mt="xs"
        >
          Entrar al calendario
        </Button>

        <Text size="xs" c="dimmed" ta="center">
          Acceso privado. Solo la persona autorizada puede iniciar sesión.
        </Text>
      </Stack>
    </form>
  );
}
