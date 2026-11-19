import { Stack, Text } from '@mantine/core';
import { Sparkles, Star } from 'lucide-react';
import type { NormalDayDefinition } from '../../types';
import classes from './Surprise.module.css';

interface Props {
  day: NormalDayDefinition;
}

export function Surprise({ day }: Props) {
  return (
    <div className={classes.scene} data-accent={day.accent}>
      <div className={classes.orb} aria-hidden="true">
        <span className={classes.ring} />
        <span className={classes.ring} />
        <span className={classes.ring} />
        <Star className={classes.star} size={34} />
        <Sparkles className={classes.sparkleA} size={18} />
        <Sparkles className={classes.sparkleB} size={14} />
      </div>
      <div className={classes.card}>
        <Stack gap={6} align="center">
          <Text className={classes.title}>{day.title}</Text>
          <Text className={classes.message} ta="center">
            {day.message}
          </Text>
        </Stack>
      </div>
      <Text size="xs" c="dimmed" ta="center" mt="sm">
        Una pequeña sorpresa aparece entre destellos.
      </Text>
    </div>
  );
}
