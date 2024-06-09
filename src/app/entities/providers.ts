import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { USER_API_SERVICE } from './tokens';
import { UserApiMockService } from './user/__mocks__';

export const provideUserEntity = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: USER_API_SERVICE,
      // useClass: UserApiService,
      useClass: UserApiMockService,
    },
  ]);
};
