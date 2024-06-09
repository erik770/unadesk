import { Injectable } from '@angular/core';
import { Observable, delay, map, of, throwError } from 'rxjs';

import {
  PaginatedCollection,
  PaginationParams,
} from '@shared/types/pagination.types';
import { IUserApiService, UserListResponseDto } from '../types/user.dto.types';
import { User, UserFilters } from '../types/user.types';
import { DB } from './data';
import { limitOffset } from './utils';
import { DELAY_TIME } from './constants';

@Injectable()
export class UserApiMockService implements IUserApiService {
  getList(
    pagination: PaginationParams,
    filters?: UserFilters
  ): Observable<PaginatedCollection<User>> {
    let users = DB;
    if (filters?.name) {
      users = users.filter((item) =>
        item.user_name.includes(filters.name ?? '')
      );
    }
    const total = users.length;
    users = limitOffset(
      users,
      pagination.limit,
      pagination.limit * pagination.page
    );

    return of<UserListResponseDto>({
      items: users,
      total_count: total,
    }).pipe(
      delay(DELAY_TIME),
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
    const userIndex = DB.findIndex((item) => item.id === id);
    if (userIndex == -1) {
      throwError(() => new Error());
    }
    return of(DB[userIndex]).pipe(
      map(({ id, user_name, is_active }) => ({
        id,
        name: user_name,
        isActive: is_active,
      }))
    );
  }

  delete(id: string): Observable<string> {
    const userIndex = DB.findIndex((item) => item.id === id);
    if (userIndex == -1) {
      throwError(() => new Error());
    }
    DB.splice(userIndex, 1);
    return of(`User delete success ${id}`).pipe(delay(DELAY_TIME));
  }
}
