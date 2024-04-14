import { createAtomWithLocalStorage } from './storage';

export const AuthAtom = createAtomWithLocalStorage<{
  isAuthenticated: boolean;
  token: string;
}>('AuthAtom', {
  isAuthenticated: false,
  token: '',
});
