import type {
  Accent,
  DayDefinition,
  ExperienceKind,
  NormalDayDefinition,
  SpecialDay,
  SpecialDayDefinition,
} from '../types';

/** Toda la identidad y el contenido del calendario viven aquí. */
export const CALENDAR_CONFIG = {
  year: 2026,
  month: 12,
  monthName: 'Diciembre',
  title: 'Diciembre mágico',
  subtitle: '31 días para abrir, poco a poco, la magia de la Navidad.',
  quote: 'Que la luz que enciendas hoy te acompañe también mañana.',
  footer: 'Un rincón privado para celebrar los días que quedan del año.',
} as const;

export const SPECIAL_DAYS: readonly SpecialDay[] = [14, 21, 24, 25, 30, 31];

const SPECIAL_DAY_LABELS: Record<SpecialDay, string> = {
  14: 'Enlace privado',
  21: 'Enlace privado',
  24: 'Enlace privado',
  25: 'Enlace privado',
  30: 'Enlace privado',
  31: 'Enlace privado',
};

const ACCENTS: readonly Accent[] = ['pine', 'red', 'gold', 'ice'];

interface NormalDaySeed {
  day: number;
  kind: ExperienceKind;
  title: string;
  message: string;
}

/** Mensajes de ejemplo, fáciles de sustituir sin tocar los componentes. */
const NORMAL_DAY_SEEDS: readonly NormalDaySeed[] = [
  {
    day: 1,
    kind: 'card',
    title: 'El primer copo',
    message: 'Hoy empieza la cuenta atrás. Que cada día traiga una pequeña razón para sonreír.',
  },
  {
    day: 2,
    kind: 'gift',
    title: 'Un detalle inesperado',
    message: 'La magia de diciembre suele esconderse en los detalles más sencillos. Ábrelo despacio.',
  },
  {
    day: 3,
    kind: 'envelope',
    title: 'Carta para ti',
    message: 'Si algo merece ser dicho, que sea en una tarjeta con olor a invierno.',
  },
  {
    day: 4,
    kind: 'surprise',
    title: 'Luz en la noche',
    message: 'Incluso la noche más larga tiene una estrella esperándote.',
  },
  {
    day: 5,
    kind: 'card',
    title: 'Pino y canela',
    message: 'Que esta temporada te regale momentos cálidos, conversaciones largas y calma.',
  },
  {
    day: 6,
    kind: 'gift',
    title: 'La cinta dorada',
    message: 'Hay regalos que no se ven: paciencia, tiempo y ganas de compartir. Hoy te regalo uno.',
  },
  {
    day: 7,
    kind: 'envelope',
    title: 'Palabras de nieve',
    message: 'Escribe algo bonito hoy. Dentro de unos años seguirá brillando.',
  },
  {
    day: 8,
    kind: 'surprise',
    title: 'Campanas suaves',
    message: 'Escucha un instante: diciembre también suena a silencio compartido.',
  },
  {
    day: 9,
    kind: 'card',
    title: 'Mañana de mercado',
    message: 'Entre luces y aromas, que encuentres eso que no sabías que buscabas.',
  },
  {
    day: 10,
    kind: 'gift',
    title: 'Caja de deseos',
    message: 'Guarda aquí un deseo para el año que viene. No hace falta decirlo en voz alta.',
  },
  {
    day: 11,
    kind: 'envelope',
    title: 'Sobre sellado',
    message: 'Hay mensajes que llegan justo cuando más falta hacen. Este es uno de ellos.',
  },
  {
    day: 12,
    kind: 'surprise',
    title: 'Estrella fugaz',
    message: 'Pide un deseo sin prisa. Las estrellas de diciembre tienen tiempo.',
  },
  {
    day: 13,
    kind: 'card',
    title: 'Mesa compartida',
    message: 'Que sobre comida, sobre risas y, sobre todo, lo bueno.',
  },
  {
    day: 15,
    kind: 'gift',
    title: 'Guirnalda secreta',
    message: 'Cada luz de la casa guarda un pequeño recuerdo. Hoy te regalo uno.',
  },
  {
    day: 16,
    kind: 'envelope',
    title: 'Nota del árbol',
    message: 'Debajo del árbol siempre cabe una nota que dice: gracias por estar aquí.',
  },
  {
    day: 17,
    kind: 'card',
    title: 'Viento de invierno',
    message: 'Que el frío de fuera no alcance nunca la calma de dentro.',
  },
  {
    day: 18,
    kind: 'surprise',
    title: 'Copo de cristal',
    message: 'Ningún copo es igual a otro. Tú tampoco, y eso es parte de la magia.',
  },
  {
    day: 19,
    kind: 'gift',
    title: 'Paquete sin nombre',
    message: 'Algunos regalos no llevan etiqueta: se reconocen por la emoción al abrirlos.',
  },
  {
    day: 20,
    kind: 'envelope',
    title: 'Carta de noche',
    message: 'Si hoy fue un día largo, deja esta nota cerca. Mañana será más ligero.',
  },
  {
    day: 22,
    kind: 'card',
    title: 'Víspera de algo',
    message: 'Las mejores historias empiezan con un «¿y si...?» dicho en voz baja.',
  },
  {
    day: 23,
    kind: 'surprise',
    title: 'Brillo dorado',
    message: 'Encuentra brillo en lo cotidiano: una taza caliente, una ventana, una sonrisa.',
  },
  {
    day: 26,
    kind: 'gift',
    title: 'Últimos preparativos',
    message: 'Cerrar bien una caja también es un acto de cariño. Hoy lo hacemos por ti.',
  },
  {
    day: 27,
    kind: 'card',
    title: 'Luces en la ventana',
    message: 'Deja una luz encendida. Siempre ayuda a alguien a encontrar el camino.',
  },
  {
    day: 28,
    kind: 'envelope',
    title: 'Mensaje final',
    message: 'Gracias por recorrer estos días. La magia también la haces tú.',
  },
  {
    day: 29,
    kind: 'surprise',
    title: 'Abrazo de diciembre',
    message: 'Que este mes se quede contigo un poquito más allá del 31.',
  },
];

const normalDays: NormalDayDefinition[] = NORMAL_DAY_SEEDS.map((seed, index) => ({
  ...seed,
  isSpecial: false,
  accent: ACCENTS[index % ACCENTS.length],
}));

const specialDays: SpecialDayDefinition[] = SPECIAL_DAYS.map((day, index) => ({
  day,
  isSpecial: true,
  label: SPECIAL_DAY_LABELS[day],
  accent: ACCENTS[(index + 1) % ACCENTS.length],
}));

const normalByDay = new Map<number, NormalDayDefinition>(
  normalDays.map((day) => [day.day, day]),
);
const specialByDay = new Map<SpecialDay, SpecialDayDefinition>(
  specialDays.map((day) => [day.day, day]),
);

/** Los 31 días, generados siempre desde la misma configuración. */
export const DECEMBER_DAYS: readonly DayDefinition[] = Array.from(
  { length: 31 },
  (_, index) => index + 1,
).map((day) => {
  const special = specialByDay.get(day as SpecialDay);
  if (special) return special;

  const normal = normalByDay.get(day);
  if (!normal) {
    throw new Error(`Falta configuración para el día ${day} de diciembre.`);
  }
  return normal;
});

export function getDayDefinition(day: number): DayDefinition | undefined {
  return DECEMBER_DAYS[day - 1];
}

export function isSpecialDay(day: number): day is SpecialDay {
  return (SPECIAL_DAYS as readonly number[]).includes(day);
}
