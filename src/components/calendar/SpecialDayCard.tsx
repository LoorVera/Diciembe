import { Loader, Text, UnstyledButton } from '@mantine/core';
import { ExternalLink, Sparkles, Star } from 'lucide-react';
import type { RedirectStatus, SpecialDayDefinition } from '../../types';
import classes from './SpecialDayCard.module.css';

interface SpecialDayCardProps {
  day: SpecialDayDefinition;
  status: RedirectStatus | null;
  onOpen: (day: SpecialDayDefinition) => void;
}

export function SpecialDayCard({ day, status, onOpen }: SpecialDayCardProps) {
  const active = status?.day === day.day;
  const loading = active && (status.phase === 'loading' || status.phase === 'success');
  const error = active && status.phase === 'error';

  return (
    <UnstyledButton
      className={classes.card}
      data-accent={day.accent}
      data-loading={loading || undefined}
      data-error={error || undefined}
      onClick={() => onOpen(day)}
      disabled={loading}
      aria-label={`Abrir el día especial ${day.day}`}
      aria-busy={loading}
    >
      <span className={classes.badge}>
        <Star size={12} aria-hidden="true" />
        Día especial
      </span>

      <span className={classes.number}>{day.day}</span>

      <span className={classes.illustration} aria-hidden="true">
        {loading ? <Loader size={22} color="yellow" type="dots" /> : <Sparkles size={30} strokeWidth={1.7} />}
      </span>

      <Text size="xs" className={classes.hint}>
        {loading ? 'Abriendo…' : day.label}
      </Text>

      <span className={classes.corner} aria-hidden="true">
        <ExternalLink size={14} />
      </span>

      {error && status?.message ? (
        <span className={classes.error} role="status">
          {status.message}
        </span>
      ) : null}
    </UnstyledButton>
  );
}
