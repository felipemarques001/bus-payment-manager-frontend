import { provideRouter } from '@angular/router';
import { 
  LOCALE_ID, 
  ApplicationConfig, 
  DEFAULT_CURRENCY_CODE, 
  provideZoneChangeDetection,
} from '@angular/core';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideToastr(),
    provideAnimations(),
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ]
};
