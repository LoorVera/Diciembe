import { Stack, Text } from '@mantine/core';
import { Gift } from 'lucide-react';
import type { NormalDayDefinition } from '../../types';
import classes from './GiftBox.module.css';

interface Props {
  day: NormalDayDefinition;
}

export function GiftBox({ day }: Props) {
  return (
    <div className={classes.scene} data-accent={day.accent}>
      <div className={classes.boxWrap}>
        <div className={classes.lid}>
          <span className={classes.bow} aria-hidden="true" />
        </div>
        <div className={classes.ribbonV} aria-hidden="true" />
        <div className={classes.ribbonH} aria-hidden="true" />
        <div className={classes.box}>
          <div className={classes.reveal}>
            <Gift size={28} className={classes.icon} aria-hidden="true" />
            <Stack gap={4} align="center">
              <Text className={classes.title}>{day.title}</Text>
              <Text className={classes.message} ta="center">
                {day.message}
              </Text>
            </Stack>
          </div>
        </div>
      </div>
      <Text size="xs" c="dimmed" ta="center" mt="sm">
        Tira de la cinta y descubre lo que hay dentro.
      </Text>
    </div>
  );
}
