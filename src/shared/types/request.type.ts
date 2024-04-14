export type QueryRequest<T> = {
  loading: boolean;
  error?: Error;
  data?: T;
  fetched?: boolean;
};
