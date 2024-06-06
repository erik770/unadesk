import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'unadesk-test';
}
