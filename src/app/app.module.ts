import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizeInterceptor } from '@core/interceptors/authorize.interceptor';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { TokenInterceptor } from '@core/interceptors/token.interceptor';
import { AuthState } from '@features/auth/state/auth.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule, SESSION_STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';
import { UserState } from '@features/user/state/user.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,

    NgxsModule.forRoot([AuthState, UserState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: [
        {
          key: AuthState,
          engine: SESSION_STORAGE_ENGINE
        }
      ]
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeInterceptor,
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000
      }
    },
    {
      provide: DEFAULT_DIALOG_CONFIG,
      useValue: {
        autoFocus: false,
        backdropClass: ['bg-opacity-75', 'transition-opacity', 'bg-black'],
        hasBackdrop: true,
        panelClass: ['w-full', 'md:w-2/5', 'max-w-2/5', '!m-4']
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
