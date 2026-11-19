import { auth } from './firebase';
import { redirectResponseSchema } from '../schemas/redirect.schema';
import type { SpecialDay } from '../types';

export type SpecialLinkErrorCode =
  | 'session'
  | 'network'
  | 'timeout'
  | 'unauthorized'
  | 'not-found'
  | 'not-configured'
  | 'server'
  | 'invalid'
  | 'insecure';

export class SpecialLinkError extends Error {
  constructor(
    message: string,
    readonly code: SpecialLinkErrorCode,
  ) {
    super(message);
    this.name = 'SpecialLinkError';
  }
}

/**
 * Pide la URL a la Pages Function. La URL privada nunca viaja en el bundle:
 * solo se obtiene aquí, con el token del usuario autenticado.
 */
export async function fetchSpecialLink(day: SpecialDay): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new SpecialLinkError('Tu sesión ha caducado. Vuelve a iniciar sesión.', 'session');
  }

  let token: string;
  try {
    token = await user.getIdToken();
  } catch {
    throw new SpecialLinkError('No hemos podido verificar tu sesión. Vuelve a entrar.', 'session');
  }

  let response: Response;
  try {
    response = await fetch(`/api/redirect/${day}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    const isTimeout = error instanceof DOMException && error.name === 'TimeoutError';
    throw new SpecialLinkError(
      isTimeout
        ? 'El servidor ha tardado demasiado en responder.'
        : 'No se ha podido contactar con el servidor de enlaces. Revisa tu conexión.',
      isTimeout ? 'timeout' : 'network',
    );
  }

  if (response.status === 401) {
    throw new SpecialLinkError(
      'No tienes permiso para abrir este enlace. Vuelve a iniciar sesión.',
      'unauthorized',
    );
  }

  if (response.status === 400 || response.status === 404) {
    throw new SpecialLinkError('Este día no tiene un enlace configurado.', 'not-found');
  }

  if (!response.ok) {
    throw new SpecialLinkError(
      'El servidor no ha podido devolver el enlace. Inténtalo más tarde.',
      'server',
    );
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new SpecialLinkError(
      'La función de enlaces no está disponible en este entorno. Usa npm run dev:cf o Cloudflare Pages.',
      'server',
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new SpecialLinkError('La respuesta del servidor no es válida.', 'invalid');
  }

  const parsed = redirectResponseSchema.safeParse(payload);
  if (!parsed.success) {
    throw new SpecialLinkError('La respuesta del servidor no es válida.', 'invalid');
  }

  let url: URL;
  try {
    url = new URL(parsed.data.url);
  } catch {
    throw new SpecialLinkError('El enlace configurado no es válido.', 'invalid');
  }

  if (url.protocol !== 'https:') {
    throw new SpecialLinkError('El enlace configurado no usa HTTPS.', 'insecure');
  }

  return url.toString();
}
