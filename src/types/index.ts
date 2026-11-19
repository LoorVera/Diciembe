import type { User as FirebaseUser } from 'firebase/auth';
import type { LoginValues } from '../schemas/auth.schema';

export type AuthUser = FirebaseUser;

export type Accent = 'pine' | 'red' | 'gold' | 'ice';

export type ExperienceKind = 'card' | 'gift' | 'envelope' | 'surprise';

export type SpecialDay = 14 | 21 | 24 | 25 | 30 | 31;

export interface NormalDayDefinition {
  day: number;
  isSpecial: false;
  kind: ExperienceKind;
  title: string;
  message: string;
  accent: Accent;
}

export interface SpecialDayDefinition {
  day: SpecialDay;
  isSpecial: true;
  label: string;
  accent: Accent;
}

export type DayDefinition = NormalDayDefinition | SpecialDayDefinition;

export type RedirectPhase = 'idle' | 'loading' | 'success' | 'error';

export interface RedirectStatus {
  day: SpecialDay;
  phase: RedirectPhase;
  message?: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
  login: (values: LoginValues) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
