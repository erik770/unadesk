import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppSharedModule } from '@shared/shared.module';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-shell-wrapper',
  standalone: true,
  imports: [CommonModule, AppSharedModule, HeaderComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellWrapperComponent {}
