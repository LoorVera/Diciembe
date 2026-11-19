import { Stack, Text } from '@mantine/core';
import { MailOpen } from 'lucide-react';
import type { NormalDayDefinition } from '../../types';
import classes from './Envelope.module.css';

interface Props {
  day: NormalDayDefinition;
}

export function Envelope({ day }: Props) {
  return (
    <div className={classes.scene} data-accent={day.accent}>
      <div className={classes.envelope}>
        <div className={classes.back} />
        <div className={classes.letter}>
          <MailOpen size={22} className={classes.icon} aria-hidden="true" />
          <Stack gap={4} align="center">
            <Text className={classes.title}>{day.title}</Text>
            <Text className={classes.message} ta="center">
              {day.message}
            </Text>
          </Stack>
        </div>
        <div className={classes.front} />
        <div className={classes.flap} />
      </div>
      <Text size="xs" c="dimmed" ta="center" mt="sm">
        El sobre se abre y su mensaje aparece poco a poco.
      </Text>
    </div>
  );
}
