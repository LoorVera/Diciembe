import { Alert, Box, Stack, Text } from '@mantine/core';
import { AlertCircle, Info } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { ChristmasModal } from '../components/christmas/ChristmasModal';
import { AppLayout } from '../components/layout/AppLayout';
import { DECEMBER_DAYS } from '../config/december';
import { fetchSpecialLink } from '../lib/specialLinks';
import type { NormalDayDefinition, RedirectStatus, SpecialDayDefinition } from '../types';

export default function CalendarPage() {
  const [activeDay, setActiveDay] = useState<NormalDayDefinition | null>(null);
  const [specialStatus, setSpecialStatus] = useState<RedirectStatus | null>(null);

  const openNormal = useCallback((day: NormalDayDefinition) => {
    setSpecialStatus((current) => (current?.phase === 'error' ? null : current));
    setActiveDay(day);
  }, []);

  const closeNormal = useCallback(() => setActiveDay(null), []);

  // Al volver desde el enlace externo (p. ej. con el botón atrás o bfcache),
  // limpiamos el estado de carga/éxito para que la tarjeta no quede bloqueada.
  useEffect(() => {
    const resetTransientStatus = () => {
      setSpecialStatus((current) =>
        current && current.phase !== 'error' ? null : current,
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetTransientStatus();
      }
    };

    window.addEventListener('pageshow', resetTransientStatus);
    window.addEventListener('focus', resetTransientStatus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pageshow', resetTransientStatus);
      window.removeEventListener('focus', resetTransientStatus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const openSpecial = useCallback(async (day: SpecialDayDefinition) => {
    setActiveDay(null);
    setSpecialStatus({ day: day.day, phase: 'loading' });

    try {
      const url = await fetchSpecialLink(day.day);
      setSpecialStatus({ day: day.day, phase: 'success' });
      window.location.assign(url);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No se ha podido abrir el enlace especial.';
      setSpecialStatus({ day: day.day, phase: 'error', message });
    }
  }, []);

  const specialError = specialStatus?.phase === 'error' ? specialStatus.message : null;

  return (
    <AppLayout>
      <Stack gap="lg">
        <Box>
          <Text c="dimmed" size="sm">
            Selecciona un día para descubrir su sorpresa. Las fechas señaladas te llevarán a un
            lugar especial.
          </Text>
        </Box>

        {specialError ? (
          <Alert
            color="red"
            variant="light"
            icon={<AlertCircle size={16} />}
            title={`No se pudo abrir el día ${specialStatus?.day ?? ''}`}
            withCloseButton
            onClose={() => setSpecialStatus(null)}
          >
            {specialError}
          </Alert>
        ) : null}

        <CalendarGrid
          days={DECEMBER_DAYS}
          specialStatus={specialStatus}
          onOpenNormal={openNormal}
          onOpenSpecial={openSpecial}
        />

        <Alert color="yellow" variant="light" icon={<Info size={16} />}>
          Las direcciones de los días especiales se consultan en el servidor solo cuando las
          abres y nunca se incluyen en el código del calendario.
        </Alert>
      </Stack>

      <ChristmasModal day={activeDay} opened={!!activeDay} onClose={closeNormal} />
    </AppLayout>
  );
}
