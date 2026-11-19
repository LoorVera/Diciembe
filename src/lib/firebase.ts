import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { z } from 'zod';

const firebaseConfigSchema = z.object({
  apiKey: z.string().min(1),
  authDomain: z.string().min(1),
  projectId: z.string().min(1),
  appId: z.string().min(1),
  storageBucket: z.string().optional(),
  messagingSenderId: z.string().optional(),
});

const rawConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
};

const configResult = firebaseConfigSchema.safeParse(rawConfig);

export const isFirebaseConfigured = configResult.success;

/** Solo para mostrar un aviso útil en desarrollo; nunca contiene secretos. */
export const missingFirebaseVars = [
  ['VITE_FIREBASE_API_KEY', rawConfig.apiKey],
  ['VITE_FIREBASE_AUTH_DOMAIN', rawConfig.authDomain],
  ['VITE_FIREBASE_PROJECT_ID', rawConfig.projectId],
  ['VITE_FIREBASE_APP_ID', rawConfig.appId],
]
  .filter(([, value]) => !value)
  .map(([name]) => name);

// Valores ficticios para que el SDK pueda inicializarse antes de configurar
// el proyecto. El formulario permanece deshabilitado hasta que haya config real.
const safeConfig = configResult.success
  ? configResult.data
  : {
      apiKey: 'missing-api-key',
      authDomain: 'placeholder.firebaseapp.com',
      projectId: 'placeholder-project',
      storageBucket: 'placeholder.appspot.com',
      messagingSenderId: '000000000000',
      appId: '1:000000000000:web:0000000000000000000000',
    };

export const firebaseApp = getApps().length ? getApp() : initializeApp(safeConfig);
export const auth = getAuth(firebaseApp);
