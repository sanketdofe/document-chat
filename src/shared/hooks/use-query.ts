import { QueryRequest } from '../types/request.type';
import { PrimitiveAtom, useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';
import { AuthAtom } from '../states/authenticated';
import APIError from '../errors/api-error';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AlertBarAtom } from '../states/alert-bar';

type WithInitialValue<Value> = {
  init: Value;
};

type QueryRequestParams<T> = {
  requestAtom: PrimitiveAtom<QueryRequest<T>> &
    WithInitialValue<QueryRequest<T>>;
  queryFunction?: (...args: any) => Promise<T>;
  autoFetch?: boolean;
  cacheData?: boolean;
};

type QueryResponseParams<T> = {
  loading: boolean;
  error?: Error;
  data?: T;
};

type QueryHookResponse<T> = {
  requestData: QueryRequest<T>;
  setData: (data: T) => void;
  setLoading: (loading: boolean) => void;
  fetchData: () => Promise<QueryResponseParams<T>>;
};

export default function useQuery<T>({
  requestAtom,
  queryFunction,
  autoFetch = true,
  cacheData,
}: QueryRequestParams<T>): QueryHookResponse<T> {
  const [authAtom, setAuthAtom] = useAtom(AuthAtom);
  const [requestData, setRequestData] = useAtom(requestAtom);
  const setAlertBarAtom = useSetAtom(AlertBarAtom);

  const navigate = useNavigate();

  const dataRef = useRef(requestData?.data);
  dataRef.current = requestData?.data;

  const setData = useCallback(
    (data: T) => {
      setRequestData((prev) => ({ ...prev, data }));
    },
    [setRequestData]
  );

  const setLoading = useCallback(
    (loading: boolean) => {
      setRequestData((prev) => ({ ...prev, loading }));
    },
    [setRequestData]
  );

  const fetchData = useCallback(async () => {
    if (typeof queryFunction !== 'function') {
      const response: QueryResponseParams<T> = {
        data: undefined,
        loading: false,
        error: undefined,
      };
      setRequestData((prev) => ({ ...prev, ...response }));
      return Promise.resolve(response);
    }

    if (cacheData && dataRef.current) {
      const response: QueryResponseParams<T> = {
        data: dataRef.current,
        loading: false,
        error: undefined,
      };
      setRequestData((prev) => ({ ...prev, ...response }));
      return Promise.resolve(response);
    }
    try {
      const data = await queryFunction(authAtom.token);
      const response: QueryResponseParams<T> = {
        loading: false,
        error: undefined,
        data,
      };
      setRequestData((prev) => ({ ...prev, ...response }));
      return response;
    } catch (error) {
      const err = error as APIError;
      if (err.status === 'UNAUTHORIZED') {
        setAuthAtom({
          token: '',
          isAuthenticated: false,
        });
        navigate(ROUTES.LOGIN, {
          replace: true,
        });
        setAlertBarAtom({
          message: 'Invalid token',
          open: true,
          timeout: 5000,
          severity: 'error',
        });
      }
      const response: QueryResponseParams<T> = {
        loading: false,
        error: error as Error,
        data: undefined,
      };
      setRequestData((prev) => ({ ...prev, ...response }));
      return response;
    }
  }, [
    authAtom,
    cacheData,
    navigate,
    queryFunction,
    setAuthAtom,
    setRequestData,
  ]);

  useEffect(() => {
    if (autoFetch && authAtom.token) {
      fetchData();
    } else {
      setRequestData((prev) => ({
        ...prev,
        loading: false,
        error: undefined,
      }));
    }
  }, [fetchData, autoFetch, setRequestData, authAtom]);

  return {
    requestData,
    setData,
    setLoading,
    fetchData,
  };
}
