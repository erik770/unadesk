import { Injectable, inject } from '@angular/core';
import { USER_API_SERVICE } from '@entities/tokens';
import { User, UserFilters } from '@entities/user/types/user.types';
import { AbstractDataListStore } from '@shared/abstract-stores/abstract-datalist.store';
import { LIMITS_RANGE } from '@shared/constants/limits-range.const';
import {
  PaginatedCollection,
  PaginationParams,
} from '@shared/types/pagination.types';
import { Observable, tap } from 'rxjs';

@Injectable()
export class UsersPageComponentStore extends AbstractDataListStore<
  User,
  UserFilters,
  { selectedId: string | null }
> {
  public selectedId$ = this.select((state) => state.selectedId);

  private readonly api = inject(USER_API_SERVICE);

  protected override defaultFiltersState: UserFilters = {
    name: null,
  };

  constructor() {
    super({
      isInit: false,
      loading: false,
      items: [],
      page: 0,
      limit: LIMITS_RANGE[0],
      total: 0,
      filters: {
        name: null,
      },
      selectedId: null,
    });
  }

  protected override fetchData(payload: {
    pagination: PaginationParams;
    filters?: UserFilters;
  }): Observable<PaginatedCollection<User>> {
    const { pagination, filters } = payload;
    return this.api.getList(pagination, filters);
  }

  public updateSelectedId = this.effect((id$: Observable<string | null>) =>
    id$.pipe(
      tap((id) => {
        this.patchState({ selectedId: id });
      })
    )
  );
}
