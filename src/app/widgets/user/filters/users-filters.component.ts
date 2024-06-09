import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserFilters } from '@entities/user/types/user.types';
import { Entry } from '@shared/types/utility.types';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-users-filters',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    CommonModule,
  ],
  templateUrl: './users-filters.component.html',
  styleUrl: './users-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFiltersComponent implements OnInit {
  @Input({ required: true }) set filters(value: UserFilters) {}
  @Input() extraActionTemplate?: TemplateRef<void>;

  @Output() filterChange = new EventEmitter<Entry<UserFilters>>();

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.fb.group({
    name: this.fb.control<string>('', {
      validators: [Validators.maxLength(50)],
    }),
  });

  ngOnInit(): void {
    this.form.controls.name.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.filterChange.emit(['name', value]);
          return;
        }
        this.filterChange.emit(['name', null]);
      });
  }
}
