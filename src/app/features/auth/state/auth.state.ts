import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';
import { pickProperties } from '@core/utilities/helpers';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, catchError, exhaustMap, tap, throwError } from 'rxjs';
import { AuthResponse, Profile, UserPreferences } from '../interfaces/auth';
import { AuthService } from '../services/auth.service';
import { GetUserPreferences, Login, Logout } from './auth.actions';
import { AuthStateModel } from './auth.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: null,
    loading: false,
    preferences: null
  }
})
@Injectable({ providedIn: 'root' })
export class AuthState {
  @Selector()
  static authLoading(state: AuthStateModel): boolean | undefined {
    return state.loading;
  }

  @Selector()
  static accessToken(state: AuthStateModel): string | undefined {
    return state.auth?.jwt;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.auth?.jwt;
  }

  @Selector()
  static userId(state: AuthStateModel): string | undefined {
    return state.preferences?.id;
  }

  @Selector()
  static userNeedsOnboarding(state: AuthStateModel): boolean | undefined {
    return state.preferences?.needOnboarding;
  }

  @Selector()
  static userData(state: AuthStateModel): Profile | undefined {
    return pickProperties(state.preferences, 'firstName', 'lastName', 'email', 'role.name');
  }

  constructor(private authService: AuthService, private utilsService: UtilsService) {}

  @Action(Login, { cancelUncompleted: true })
  login(ctx: StateContext<AuthStateModel>, action: Login): Observable<AuthResponse> {
    ctx.patchState({ loading: true });
    return this.authService.login(action.payload).pipe(
      tap((auth: AuthResponse) => {
        ctx.patchState({ auth });
      }),
      tap(() => {
        ctx.patchState({ loading: false });
      }),
      catchError((err: HttpErrorResponse) => {
        ctx.patchState({ loading: false });
        return throwError(() => err);
      })
    );
  }

  @Action(GetUserPreferences, { cancelUncompleted: true })
  getUserPreferences(ctx: StateContext<AuthStateModel>): Observable<UserPreferences> {
    ctx.patchState({ preferences: null });
    const accessToken = ctx.getState().auth?.jwt;
    const userId = this.utilsService.getUserIdFromToken(accessToken!);

    return this.authService.getUserPreferences(userId).pipe(
      tap((preferences: UserPreferences) => {
        ctx.patchState({ preferences });
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({
      auth: null,
      loading: false,
      preferences: null
    });
    this.utilsService.cleanStorage();
  }
}
