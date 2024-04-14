import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export function createAtomWithLocalStorage<T>(
  name: string,
  someInitialValue: T
) {
  return atomWithStorage<T>(
    name,
    someInitialValue,
    createJSONStorage<T>(() => localStorage)
  );
}
