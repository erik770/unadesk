import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { LIMITS_RANGE } from '@shared/constants/limits-range.const';
import {
  PaginatedCollection,
  PaginationParams,
} from '@shared/types/pagination.types';
import { Entry } from '@shared/types/utility.types';

import { Observable, switchMap, tap, withLatestFrom } from 'rxjs';

interface DataListState<Item, Filters extends object> {
  loading: boolean;
  isInit: boolean;
  items: Item[];
  page: number;
  limit: (typeof LIMITS_RANGE)[number];
  total: number;
  filters: Filters;
}

export abstract class AbstractDataListStore<
  Item,
  Filters extends object,
  StateExpansion extends object = Record<string, unknown>
> extends ComponentStore<DataListState<Item, Filters> & StateExpansion> {
  public readonly loading$ = this.select((state) => state.loading);
  public readonly items$ = this.select((state) => state.items);
  public readonly total$ = this.select((state) => state.total);
  public readonly filters$ = this.select((state) => state.filters);
  public readonly page$ = this.select((state) => state.page);
  public readonly limit$ = this.select((state) => state.limit);
  public readonly isInit$ = this.select((state) => state.isInit);

  protected abstract fetchData(
    payload: {
      pagination: PaginationParams;
      filters?: Filters;
    },
    state?: (DataListState<Item, Filters> & StateExpansion) | StateExpansion
  ): Observable<PaginatedCollection<Item>>;

  protected abstract readonly defaultFiltersState: Filters;

  protected readonly setLoading = this.updater(
    (state, value: boolean): DataListState<Item, Filters> & StateExpansion => ({
      ...state,
      loading: value,
    })
  );
  protected readonly setIsInit = this.updater(
    (state, value: boolean): DataListState<Item, Filters> & StateExpansion => ({
      ...state,
      isInit: value,
    })
  );
  protected readonly setPage = this.updater(
    (state, value: number): DataListState<Item, Filters> & StateExpansion => ({
      ...state,
      page: value,
    })
  );
  protected readonly setLimit = this.updater(
    (
      state,
      value: (typeof LIMITS_RANGE)[number]
    ): DataListState<Item, Filters> & StateExpansion => ({
      ...state,
      limit: value,
    })
  );
  protected readonly setFilters = this.updater(
    (state, value: Filters): DataListState<Item, Filters> & StateExpansion => ({
      ...state,
      filters: value,
    })
  );
  protected readonly setData = this.updater(
    (
      state,
      value: PaginatedCollection<Item>
    ): DataListState<Item, Filters> & StateExpansion => ({
      ...state,
      items: value.items,
      total: value.total,
    })
  );
  protected readonly clearItems = this.updater(
    (state): DataListState<Item, Filters> & StateExpansion => ({
      ...state,
      items: [],
    })
  );

  public readonly resetData = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => {
        this.setData({ items: [], total: 0 });
      })
    )
  );

  protected readonly loadData = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.state$),
      tap(() => {
        this.setLoading(true);
      }),
      switchMap(([, state]) => {
        const { page, limit, filters, isInit } = state;
        return this.fetchData(
          { filters, pagination: { page, limit } },
          state
        ).pipe(
          tapResponse(
            (response) => {
              const data: PaginatedCollection<Item> = {
                total: response.total,
                items: response.items,
              };
              this.setData(data);
              this.setLoading(false);
              if (!isInit) {
                this.setIsInit(true);
              }
            },
            () => {
              this.resetData();
              this.setLoading(false);
            }
          )
        );
      })
    )
  );

  protected readonly invalidate = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => {
        this.loadData();
      })
    )
  );

  public readonly updatePage = this.effect((page$: Observable<number>) =>
    page$.pipe(
      tap((page) => {
        this.setPage(page);
        this.invalidate();
      })
    )
  );

  public readonly updateLimit = this.effect(
    (limit$: Observable<(typeof LIMITS_RANGE)[number]>) =>
      limit$.pipe(
        tap((limit) => {
          this.setLimit(limit);
          this.setPage(0);
          this.invalidate();
        })
      )
  );

  public readonly updateFilters = this.effect(
    (filters$: Observable<Filters>) => {
      return filters$.pipe(
        tap((filters) => {
          this.setFilters(filters);
          this.setPage(0);
          this.invalidate();
        })
      );
    }
  );

  public readonly updateFiltersByKey = this.effect(
    (filter$: Observable<Entry<Filters>>) =>
      filter$.pipe(
        withLatestFrom(this.filters$),
        tap(([changes, filters]) => {
          const [key, value] = changes;

          const nextFilters = { ...filters, [key]: value };

          return this.updateFilters(nextFilters);
        })
      )
  );

  public readonly resetFilters = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => {
        this.updateFilters(this.defaultFiltersState);
      })
    )
  );

  public readonly refresh = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => {
        this.invalidate();
      })
    )
  );
}
