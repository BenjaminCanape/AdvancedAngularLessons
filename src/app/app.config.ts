import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ActionReducerMap, MetaReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { NoteEffects } from './store/note/note.effect';

import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage';
import { noteReducer } from './store/note/note.reducer';
import { AppState } from './store/app.state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json');

export function localStorageSyncConfig(): LocalStorageConfig {
  return {
    keys: ['notes'],
    rehydrate: true,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync(localStorageSyncConfig())(reducer);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/array-type
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
const reducers: ActionReducerMap<AppState> = { notes: noteReducer };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideTranslateService({
      defaultLanguage: 'en',
    }),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideEffects([NoteEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};
