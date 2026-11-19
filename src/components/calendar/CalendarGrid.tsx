import { SimpleGrid } from '@mantine/core';
import type { DayDefinition, NormalDayDefinition, RedirectStatus, SpecialDayDefinition } from '../../types';
import { DayCard } from './DayCard';
import { SpecialDayCard } from './SpecialDayCard';

interface CalendarGridProps {
  days: readonly DayDefinition[];
  specialStatus: RedirectStatus | null;
  onOpenNormal: (day: NormalDayDefinition) => void;
  onOpenSpecial: (day: SpecialDayDefinition) => void;
}

export function CalendarGrid({
  days,
  specialStatus,
  onOpenNormal,
  onOpenSpecial,
}: CalendarGridProps) {
  return (
    <SimpleGrid cols={{ base: 3, xs: 4, sm: 5, md: 6, lg: 7 }} spacing={{ base: 'sm', sm: 'md' }}>
      {days.map((day) =>
        day.isSpecial ? (
          <SpecialDayCard
            key={day.day}
            day={day}
            status={specialStatus}
            onOpen={onOpenSpecial}
          />
        ) : (
          <DayCard key={day.day} day={day} onOpen={onOpenNormal} />
        ),
      )}
    </SimpleGrid>
  );
}
