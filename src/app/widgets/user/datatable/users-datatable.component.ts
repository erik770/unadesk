import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { GenerateDescriptionPipe } from '@entities/user/pipes/generate-desctiption.pipe';
import { User } from '@entities/user/types/user.types';
import { TuiLoaderModule, TuiTooltipModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-users-datatable',
  standalone: true,
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiAvatarModule,
    TuiTooltipModule,
    GenerateDescriptionPipe,
  ],
  templateUrl: './users-datatable.component.html',
  styleUrl: './users-datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDatatableComponent {
  @Input({ required: true }) users: User[] = [];
  @Input({ required: true }) isLoading: boolean = false;
  @Input() itemActionTemplate?: TemplateRef<{ $implicit: User }>;
}
