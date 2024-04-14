import { atom } from 'jotai';
import { QueryRequest } from '../types/request.type';

type CreateRequestAtomParams<T> = { data?: T; initialLoading?: boolean };

export function createRequestAtom<T>({
  data,
  initialLoading,
}: CreateRequestAtomParams<T> = {}) {
  return atom<QueryRequest<T>>({
    loading: typeof initialLoading === 'boolean' ? initialLoading : !data,
    data,
  });
}
