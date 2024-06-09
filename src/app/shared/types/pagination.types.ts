import { LIMITS_RANGE } from '@shared/constants/limits-range.const';

export interface PaginatedCollection<T> {
  total: number;
  items: T[];
}

export interface PaginationParams {
  limit: (typeof LIMITS_RANGE)[number];
  page: number;
}
