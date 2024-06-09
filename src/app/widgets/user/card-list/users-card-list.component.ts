import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { User } from '@entities/user/types/user.types';
import { UserCardComponent } from '../card/user-card.component';
import { TuiLoaderModule } from '@taiga-ui/core';

@Component({
  selector: 'app-users-card-list',
  standalone: true,
  imports: [CommonModule, TuiLoaderModule, UserCardComponent],
  templateUrl: './users-card-list.component.html',
  styleUrl: './users-card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCardListComponent {
  @Input({ required: true }) users: User[] = [];
  @Input({ required: true }) isLoading: boolean = false;
  @Input() itemActionTemplate?: TemplateRef<{ $implicit: User }>;
}
