import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { X } from 'lucide-react';
import type { NormalDayDefinition } from '../../types';
import { ChristmasCard } from './ChristmasCard';
import { Envelope } from './Envelope';
import { GiftBox } from './GiftBox';
import { Surprise } from './Surprise';
import classes from './ChristmasModal.module.css';

interface ChristmasModalProps {
  day: NormalDayDefinition | null;
  opened: boolean;
  onClose: () => void;
}

export function ChristmasModal({ day, opened, onClose }: ChristmasModalProps) {
  return (
    <Modal
      opened={opened && !!day}
      onClose={onClose}
      centered
      size="lg"
      radius="lg"
      padding="lg"
      title={
        day ? (
          <Group gap="xs">
            <Text fw={700}>Día {day.day}</Text>
            <Text c="dimmed" size="sm">
              · {day.title}
            </Text>
          </Group>
        ) : null
      }
      classNames={{ content: classes.content, header: classes.header, body: classes.body }}
      overlayProps={{ backgroundOpacity: 0.6, blur: 6 }}
    >
      {day ? (
        <Stack gap="lg">
          <div className={classes.stage}>
            {day.kind === 'card' && <ChristmasCard day={day} />}
            {day.kind === 'gift' && <GiftBox day={day} />}
            {day.kind === 'envelope' && <Envelope day={day} />}
            {day.kind === 'surprise' && <Surprise day={day} />}
          </div>

          <Group justify="flex-end">
            <Button variant="light" color="yellow" leftSection={<X size={16} />} onClick={onClose}>
              Cerrar
            </Button>
          </Group>
        </Stack>
      ) : null}
    </Modal>
  );
}
