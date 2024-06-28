export interface Error {
  status_code: number;
  detail: string;
}

export interface Response<T> {
  statusCode: number;
  data: {
    read?: T[];
    created?: T[];
    updated?: T[];
    deleted?: T[];
  };
  error?: Error;
}
