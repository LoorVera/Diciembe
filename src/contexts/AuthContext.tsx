import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getAuthErrorMessage } from '../lib/authErrors';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import type { LoginValues } from '../schemas/auth.schema';
import type { AuthContextValue, AuthUser } from '../types';

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    const start = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch {
        if (active) {
          setError('No se ha podido activar la persistencia de la sesión en este navegador.');
        }
      }

      if (!active) return;

      unsubscribe = onAuthStateChanged(
        auth,
        (firebaseUser) => {
          if (!active) return;
          setUser(firebaseUser);
          setError(null);
          setLoading(false);
        },
        (authError) => {
          if (!active) return;
          setError(getAuthErrorMessage(authError));
          setLoading(false);
        },
      );
    };

    void start();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const login = useCallback(async (values: LoginValues) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      const message = getAuthErrorMessage(error);
      setError(message);
      throw new Error(message);
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (error) {
      const message = getAuthErrorMessage(error);
      setError(message);
      throw new Error(message);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      error,
      isConfigured: isFirebaseConfigured,
      login,
      logout,
      clearError,
    }),
    [user, loading, error, login, logout, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
