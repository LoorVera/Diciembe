import { z } from 'zod';

export const SPECIAL_DAY_PARAMS = ['14', '21', '24', '25', '30', '31'] as const;
export type SpecialDayParam = (typeof SPECIAL_DAY_PARAMS)[number];

export function isSpecialDayParam(value: string): value is SpecialDayParam {
  return (SPECIAL_DAY_PARAMS as readonly string[]).includes(value);
}

/** Respuesta que la Pages Function devuelve al frontend autenticado. */
export const redirectResponseSchema = z.object({
  url: z.string().url('La respuesta del servidor no contiene una URL válida.'),
});
export type RedirectResponse = z.infer<typeof redirectResponseSchema>;

/** Variables privadas leídas únicamente por la Pages Function. */
export const redirectEnvSchema = z.object({
  FIREBASE_PROJECT_ID: z.string().min(1),
  ALLOWED_UID: z.string().min(1),
  DAY_14_URL: z.string().url(),
  DAY_21_URL: z.string().url(),
  DAY_24_URL: z.string().url(),
  DAY_25_URL: z.string().url(),
  DAY_30_URL: z.string().url(),
  DAY_31_URL: z.string().url(),
});
export type RedirectEnv = z.infer<typeof redirectEnvSchema>;

export type RedirectEnvKey = keyof Pick<
  RedirectEnv,
  'DAY_14_URL' | 'DAY_21_URL' | 'DAY_24_URL' | 'DAY_25_URL' | 'DAY_30_URL' | 'DAY_31_URL'
>;

export const DAY_ENV_KEYS: Record<SpecialDayParam, RedirectEnvKey> = {
  '14': 'DAY_14_URL',
  '21': 'DAY_21_URL',
  '24': 'DAY_24_URL',
  '25': 'DAY_25_URL',
  '30': 'DAY_30_URL',
  '31': 'DAY_31_URL',
};
