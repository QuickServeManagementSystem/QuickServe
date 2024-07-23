export interface BaseResType<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  success?: boolean;
  sort?: string;
  errors?: any;
  data: T[];
}

export interface BaseResTypeSingle<T> {
  success?: boolean;
  errors?: any;
  data: T;
}
