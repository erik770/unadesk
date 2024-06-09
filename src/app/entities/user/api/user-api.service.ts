import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import {
  PaginatedCollection,
  PaginationParams,
} from '@shared/types/pagination.types';
import { Observable, map } from 'rxjs';
import { User, UserFilters } from '../types/user.types';
import {
  IUserApiService,
  UserDto,
  UserListResponseDto,
} from '../types/user.dto.types';

const API_URL = '/api/users';

@Injectable()
export class UserApiService implements IUserApiService {
  private readonly http = inject(HttpClient);

  getList(
    pagination: PaginationParams,
    filters?: UserFilters
  ): Observable<PaginatedCollection<User>> {
    let params = new HttpParams().appendAll({
      itemsPerPage: pagination.limit,
      pageNumber: pagination.page,
    });

    if (filters) {
      if (filters.name) {
        params = params.append('search', filters.name);
      }
    }

    return this.http.get<UserListResponseDto>(API_URL, { params }).pipe(
      map(({ items, total_count }) => ({
        items: items.map(({ id, user_name, is_active }) => ({
          id,
          name: user_name,
          isActive: is_active,
        })),
        total: total_count,
      }))
    );
  }

  getOne(id: string): Observable<User> {
    return this.http.get<UserDto>(`${API_URL}/${id}`).pipe(
      map(({ id, user_name, is_active }) => ({
        id,
        name: user_name,
        isActive: is_active,
      }))
    );
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`${API_URL}/${id}`, {
      observe: 'body',
      responseType: 'text',
    });
  }
}
