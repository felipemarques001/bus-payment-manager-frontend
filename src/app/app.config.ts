import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  LOCALE_ID,
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  provideZoneChangeDetection,
} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideToastr(),
    provideAnimations(),
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ]
};
