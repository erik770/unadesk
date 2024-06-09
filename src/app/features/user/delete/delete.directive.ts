import {
  DestroyRef,
  Directive,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnInit,
  Output,
  inject,
  OnDestroy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, map } from 'rxjs';

import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { UserDeleteDirectiveComponentStore } from './delete.component-store';

@Directive({
  selector: '[appDeleteUser]',
  standalone: true,
  exportAs: 'deleteUserDirective',
  providers: [UserDeleteDirectiveComponentStore, TuiDialogService],
})
export class UserDeleteFeatureDirective implements OnInit, OnDestroy {
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) name: string = '';

  @Output() actionSuccess = new EventEmitter<void>();
  @Output() actionFail = new EventEmitter<void>();

  private readonly clickSubject$$ = new Subject<void>();

  private readonly store = inject(UserDeleteDirectiveComponentStore);
  private readonly alertService = inject(TuiAlertService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  public readonly loading$ = this.store.loading$;

  ngOnInit(): void {
    this.clickSubject$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.alertService
          .open<boolean>(
            new PolymorpheusComponent(ConfirmDialogComponent, this.injector),
            {
              label: `Подтверждение удаления`,
              autoClose: false,
              hasCloseButton: false,
              status: 'info',
              data: { name: this.name },
            }
          )
          .pipe(
            map((response) => {
              if (response) {
                this.store.delete({ id: this.id, name: this.name });
              }
            }),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe();
      });

    this.store.isActionSucceed$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        res ? this.actionSuccess.emit() : this.actionFail.emit();
      });
  }

  ngOnDestroy(): void {
    this.clickSubject$$.complete();
  }

  @HostListener('click', ['$event'])
  private handleClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.id && this.name) {
      this.clickSubject$$.next();
    }
  }
}
