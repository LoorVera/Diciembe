import { createRemoteJWKSet, jwtVerify } from 'jose';

interface Env {
  FIREBASE_PROJECT_ID?: string;
  ALLOWED_UID?: string;
  DAY_14_URL?: string;
  DAY_21_URL?: string;
  DAY_24_URL?: string;
  DAY_25_URL?: string;
  DAY_30_URL?: string;
  DAY_31_URL?: string;
}

const SPECIAL_DAYS = ['14', '21', '24', '25', '30', '31'] as const;
type SpecialDay = (typeof SPECIAL_DAYS)[number];

const DAY_ENV_KEYS: Record<SpecialDay, keyof Env> = {
  '14': 'DAY_14_URL',
  '21': 'DAY_21_URL',
  '24': 'DAY_24_URL',
  '25': 'DAY_25_URL',
  '30': 'DAY_30_URL',
  '31': 'DAY_31_URL',
};

// Claves públicas de Google usadas por Firebase Authentication (ID tokens RS256).
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'),
);

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function isSpecialDay(day: string): day is SpecialDay {
  return (SPECIAL_DAYS as readonly string[]).includes(day);
}

function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

export const onRequestGet: PagesFunction<Env> = async ({ request, params, env }) => {
  const dayParam = typeof params.day === 'string' ? params.day : '';

  if (!isSpecialDay(dayParam)) {
    return json({ error: 'not_found' }, 404);
  }

  const authorization = request.headers.get('Authorization') ?? '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
  if (!token) {
    return json({ error: 'unauthorized' }, 401);
  }

  const projectId = env.FIREBASE_PROJECT_ID?.trim();
  const allowedUid = env.ALLOWED_UID?.trim();
  if (!projectId || !allowedUid) {
    // Configuración del servidor incompleta: no revelar detalles ni enlaces.
    return json({ error: 'unavailable' }, 503);
  }

  let uid: string | undefined;
  try {
    const verified = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });
    uid = verified.payload.sub;
  } catch {
    return json({ error: 'unauthorized' }, 401);
  }

  if (!uid || uid !== allowedUid) {
    return json({ error: 'unauthorized' }, 401);
  }

  const target = env[DAY_ENV_KEYS[dayParam]]?.trim() ?? '';
  if (!target) {
    return json({ error: 'not_configured' }, 404);
  }

  if (!isHttpsUrl(target)) {
    return json({ error: 'invalid_url' }, 500);
  }

  return json({ url: target }, 200);
};
