import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UsersStateModel } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetUser, GetUsers, UpdateUser } from './user.actions';
import { throwError } from 'rxjs';

export interface UsersStateModel {
  users: User[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
    total: 0,
    loading: false,
    error: null
  }
})
@Injectable({
  providedIn: 'root'
})
export class UsersState {
  constructor(private userService: UserService) {}

  @Selector()
  static getUsers(state: UsersStateModel): User[] {
    return state.users;
  }

  @Selector()
  static getTotal(state: UsersStateModel): number {
    return state.total;
  }
  @Selector()
  static getUserById(state: UsersStateModel) {
    return (id: string): User | undefined => {
      return state.users.find((user) => user.id === id);
    };
  }

  @Selector()
  static isLoading(state: UsersStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getError(state: UsersStateModel): HttpErrorResponse | null {
    return state.error;
  }

  @Action(GetUsers)
  getUsers(ctx: StateContext<UsersStateModel>): void {
    ctx.patchState({ loading: true, error: null });
    this.userService.getUsers().pipe(
      tap((users: User[]) => {
        ctx.patchState({ users, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ error, loading: false });
        return throwError(() => error);
      })
    );
  }

  @Action(GetUser)
  getUser(ctx: StateContext<UsersStateModel>, { id }: GetUser): void {
    ctx.patchState({ loading: true, error: null });
    this.userService.getUser(id).pipe(
      tap((user: User) => {
        ctx.patchState({ users: [user], loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ error, loading: false });
        return throwError(() => error);
      })
    );
  }
  @Action(UpdateUser)
  updateUser(ctx: StateContext<UsersStateModel>, { user }: UpdateUser): void {
    ctx.patchState({ loading: true, error: null });
    this.userService.updateUser(user).pipe(
      tap((updatedUser: User) => {
        const users = ctx.getState().users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
        ctx.patchState({ users, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ error, loading: false });
        return throwError(() => error);
      })
    );
  }

  // @Action(DeleteUser)
  // deleteUser(ctx: StateContext<UsersStateModel>, { id }: DeleteUser): void {
  //   ctx.patchState({ loading: true, error: null });
  //   this.userService.deleteUser(id).pipe(
  //     tap(() => {
  //       const users = ctx.getState().users.filter((u) => u.id !== id);
  //       ctx.patchState({ users, loading: false });
  //     }),
  //     catchError((error) => {
  //       ctx.patchState({ error, loading: false });
  //       return throwError(() => error);
  //     })
  //   );
  // }
}
