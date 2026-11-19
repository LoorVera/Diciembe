import { Text, UnstyledButton } from '@mantine/core';
import { Gift, Mail, Sparkles, TreePine } from 'lucide-react';
import type { NormalDayDefinition } from '../../types';
import classes from './DayCard.module.css';

interface DayCardProps {
  day: NormalDayDefinition;
  onOpen: (day: NormalDayDefinition) => void;
}

const iconByKind = {
  card: TreePine,
  gift: Gift,
  envelope: Mail,
  surprise: Sparkles,
} as const;

export function DayCard({ day, onOpen }: DayCardProps) {
  const Icon = iconByKind[day.kind];

  return (
    <UnstyledButton
      className={classes.card}
      data-accent={day.accent}
      data-kind={day.kind}
      onClick={() => onOpen(day)}
      aria-label={`Abrir el día ${day.day}: ${day.title}`}
    >
      <span className={classes.number}>{day.day}</span>
      <span className={classes.illustration} aria-hidden="true">
        <Icon size={28} strokeWidth={1.8} />
      </span>
      <Text size="xs" className={classes.hint}>
        {day.kind === 'card' && 'Tarjeta'}
        {day.kind === 'gift' && 'Regalo'}
        {day.kind === 'envelope' && 'Sobre'}
        {day.kind === 'surprise' && 'Sorpresa'}
      </Text>
      <span className={classes.shine} aria-hidden="true" />
    </UnstyledButton>
  );
}
