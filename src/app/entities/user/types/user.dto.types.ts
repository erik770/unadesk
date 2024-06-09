import {
  PaginatedCollection,
  PaginationParams,
} from '@shared/types/pagination.types';
import { User, UserFilters } from './user.types';
import { Observable } from 'rxjs';
import { LIMITS_RANGE } from '@shared/constants/limits-range.const';

export interface UserDto {
  id: string;
  user_name: string;
  is_active: boolean;
}

export interface UserListResponseDto {
  total_count: number;
  items: UserDto[];
}

export interface ListRequest {
  pageNumber: number;
  search?: string;
  itemsPerPage: (typeof LIMITS_RANGE)[number];
}

export interface IUserApiService {
  getList(
    pagination: PaginationParams,
    filters?: UserFilters
  ): Observable<PaginatedCollection<User>>;
  getOne(id: string): Observable<User>;

  delete(propertyId: string): Observable<string>;
}
