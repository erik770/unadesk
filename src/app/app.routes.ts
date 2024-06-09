import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@core/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/routes').then((m) => m.mainRoutes),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
