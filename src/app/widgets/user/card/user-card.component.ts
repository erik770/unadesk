import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { GenerateDescriptionPipe } from '@entities/user/pipes/generate-desctiption.pipe';
import { User } from '@entities/user/types/user.types';
import { TuiTooltipModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiTooltipModule,
    GenerateDescriptionPipe,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
  @Input() actionTemplate?: TemplateRef<{ $implicit: User }>;
}
