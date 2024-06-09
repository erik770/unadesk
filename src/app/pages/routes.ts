import { Routes } from '@angular/router';
import { ShellWrapperComponent } from '../wrappers/shell/shell/shell.component';
import { provideUserEntity } from '@entities/providers';

export const mainRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  {
    path: '',
    component: ShellWrapperComponent,
    children: [
      {
        path: 'users',
        providers: [provideUserEntity()],
        loadChildren: () =>
          import('./user/user.routes').then((r) => r.userRoutes),
      },
    ],
  },
];
