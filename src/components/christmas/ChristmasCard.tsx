import { Stack, Text } from '@mantine/core';
import { TreePine } from 'lucide-react';
import type { NormalDayDefinition } from '../../types';
import classes from './ChristmasCard.module.css';

interface Props {
  day: NormalDayDefinition;
}

export function ChristmasCard({ day }: Props) {
  return (
    <div className={classes.scene} data-accent={day.accent}>
      <div className={classes.card}>
        <div className={`${classes.panel} ${classes.left}`}>
          <div className={classes.coverDecor} aria-hidden="true">
            <TreePine size={42} />
          </div>
          <Text className={classes.coverText}>Para ti</Text>
        </div>
        <div className={`${classes.panel} ${classes.right}`}>
          <div className={classes.coverPattern} aria-hidden="true" />
        </div>
        <div className={classes.inside}>
          <Stack gap="xs" align="center">
            <Text className={classes.insideTitle}>{day.title}</Text>
            <Text className={classes.message} ta="center">
              {day.message}
            </Text>
          </Stack>
        </div>
      </div>
      <Text size="xs" c="dimmed" ta="center" mt="sm">
        Una tarjeta que se abre con la magia de diciembre.
      </Text>
    </div>
  );
}
