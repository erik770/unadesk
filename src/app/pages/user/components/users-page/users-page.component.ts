import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { UserDeleteFeatureDirective } from '@features/user/delete/delete.directive';
import { LIMITS_RANGE } from '@shared/constants/limits-range.const';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import { UsersDatatableComponent } from '@widgets/user/datatable/users-datatable.component';
import { UsersFiltersComponent } from '@widgets/user/filters/users-filters.component';
import { UsersPaginatorComponent } from '@widgets/user/paginator/users-paginator.component';
import { combineLatest } from 'rxjs';
import { UsersPageComponentStore } from './users-page.component-store';
import { UserFilters } from '@entities/user/types/user.types';
import { Entry } from '@shared/types/utility.types';
import { TuiRadioBlockModule } from '@taiga-ui/kit';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsersCardListComponent } from '@widgets/user/card-list/users-card-list.component';

enum UserListShowMode {
  DATATABLE = 1,
  CARDS,
}

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    CommonModule,
    UsersDatatableComponent,
    UsersCardListComponent,
    UsersPaginatorComponent,
    UsersFiltersComponent,
    UserDeleteFeatureDirective,
    TuiButtonModule,
    TuiLetModule,
    TuiGroupModule,
    TuiRadioBlockModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UsersPageComponentStore],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {
  private readonly store = inject(UsersPageComponentStore);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly vm$ = combineLatest({
    items: this.store.items$,
    total: this.store.total$,
    page: this.store.page$,
    limit: this.store.limit$,
    filters: this.store.filters$,
    isLoading: this.store.loading$,
  });

  ngOnInit(): void {
    this.store.refresh();
  }

  protected readonly showModes = UserListShowMode;
  protected readonly form = this.fb.group({
    listDisplayMode: this.fb.control<UserListShowMode>(
      UserListShowMode.DATATABLE
    ),
  });

  protected handleLimitChange(limit: (typeof LIMITS_RANGE)[number]): void {
    this.store.updateLimit(limit);
  }
  protected handlePageChange(page: number): void {
    this.store.updatePage(page);
  }
  protected handleFilterChange(change: Entry<UserFilters>): void {
    this.store.updateFiltersByKey(change);
  }

  protected updateDatatable(): void {
    this.store.refresh();
  }
}
