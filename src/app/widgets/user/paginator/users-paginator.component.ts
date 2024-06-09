import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LIMITS_RANGE } from '@shared/constants/limits-range.const';
import { TuiPaginationModule, TuiRadioBlockModule } from '@taiga-ui/kit';
import { TuiGroupModule } from '@taiga-ui/core';

@Component({
  selector: 'app-users-paginator',
  standalone: true,
  imports: [
    CommonModule,
    TuiPaginationModule,
    TuiGroupModule,
    TuiRadioBlockModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './users-paginator.component.html',
  styleUrl: './users-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPaginatorComponent implements OnInit {
  @Input({ required: true }) total: number = 0;
  @Input({ required: true }) limit: number = 0;
  @Input({ required: true }) page: number = 0;

  @Output() changeLimit = new EventEmitter<(typeof LIMITS_RANGE)[number]>();
  @Output() changePage = new EventEmitter<number>();

  private readonly destroyRef = inject(DestroyRef);

  protected readonly math = Math;

  protected readonly limitControl = new FormControl<
    (typeof LIMITS_RANGE)[number]
  >(LIMITS_RANGE[0]);
  protected readonly limitParams = LIMITS_RANGE;

  protected handleChangePage(page: number): void {
    this.changePage.emit(page);
    return;
  }

  protected handleChangeLimit(limit: (typeof LIMITS_RANGE)[number]): void {
    this.changeLimit.emit(limit);
    return;
  }

  ngOnInit(): void {
    this.limitControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.changeLimit.emit(value);
        }
      });
  }
}
