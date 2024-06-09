import { Route } from '@angular/router';
import { UsersPageComponent } from './components';

export const userRoutes: Route[] = [
  {
    path: '',
    component: UsersPageComponent,
    children: [
      // {
      //   path: ':id',
      //   children: [
      //     {
      //       path: '',
      //       outlet: 'sidebar',
      //       component: VendorsSidebarComponent,
      //     },
      //   ],
      // },
    ],
  },
];
