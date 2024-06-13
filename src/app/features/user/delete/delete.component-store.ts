import { inject, Injectable, OnDestroy } from '@angular/core';
import { USER_API_SERVICE } from '@entities/tokens';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { TuiAlertService } from '@taiga-ui/core';
import { Observable, Subject, switchMap, take, tap } from 'rxjs';

interface DeleteStoreState {
  loading: boolean;
}

@Injectable()
export class UserDeleteDirectiveComponentStore
  extends ComponentStore<DeleteStoreState>
  implements OnDestroy
{
  private readonly api = inject(USER_API_SERVICE);
  private readonly alertService = inject(TuiAlertService);
  private readonly isActionSucceed$$ = new Subject<boolean>();

  public readonly loading$ = this.select((state) => state.loading);
  public readonly isActionSucceed$ = this.isActionSucceed$$.asObservable();

  private readonly setLoading = this.updater(
    (state, value: boolean): DeleteStoreState => ({ ...state, loading: value })
  );

  constructor() {
    super({
      loading: false,
    });
  }

  override ngOnDestroy(): void {
    this.isActionSucceed$$.complete();

    super.ngOnDestroy();
  }

  public readonly delete = this.effect(
    (payload$: Observable<{ id: string; name: string }>) =>
      payload$.pipe(
        tap(() => {
          this.setLoading(true);
        }),
        switchMap(({ id, name }) =>
          this.api.delete(id).pipe(
            tapResponse(
              () => {
                this.setLoading(false);
                this.showSuccessNotification(name);
                this.isActionSucceed$$.next(true);
              },
              () => {
                this.setLoading(false);
                this.isActionSucceed$$.next(false);
              }
            )
          )
        )
      )
  );

  private readonly showSuccessNotification = this.effect(
    (name$: Observable<string>) =>
      name$.pipe(
        tap((name) =>
          this.alertService
            .open(`Пользователь "${name}" успешно удален`, {
              label: `Готово!`,
              status: 'success',
            })
            .pipe(take(1))
            .subscribe()
        )
      )
  );
}
