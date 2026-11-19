import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Escribe tu correo electrónico.')
    .email('Introduce una dirección de correo válida.'),
  password: z.string().min(1, 'Escribe tu contraseña.'),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type LoginField = keyof LoginValues;
export type LoginFieldErrors = Partial<Record<LoginField, string>>;

/** Extrae errores por campo sin depender de la API interna de Zod. */
export function getLoginFieldErrors(error: z.ZodError): LoginFieldErrors {
  const errors: LoginFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (field === 'email' || field === 'password') {
      errors[field] ??= issue.message;
    }
  }

  return errors;
}
