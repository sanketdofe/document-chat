import { atomWithReset } from 'jotai/utils';

export const AlertBarAtom = atomWithReset<{
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  open: boolean;
  timeout: number;
}>({
  message: '',
  severity: 'info',
  open: false,
  timeout: 0,
});
