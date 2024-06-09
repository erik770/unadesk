import { InjectionToken } from '@angular/core';

import { IUserApiService } from './user/types/user.dto.types';

export const USER_API_SERVICE = new InjectionToken<IUserApiService>(
  'IUserApiService'
);
