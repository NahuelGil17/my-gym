import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Routine, User, UserApiResponse } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreateRoutine, CreateUser, GetUser, GetUsers, UpdateUser } from './user.actions';
import { Observable, throwError } from 'rxjs';
import { UserStateModel } from './user.model';

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    total: 0,
    loading: false,
    error: null,
    currentPage: 0,
    pageSize: 0,
    pageCount: 0
  }
})
@Injectable({
  providedIn: 'root'
})
export class UserState {
  @Selector()
  static getUsers(state: UserStateModel): User[] | undefined | null {
    return state.users;
  }

  @Selector()
  static getTotal(state: UserStateModel): number | undefined | null {
    return state.total;
  }

  @Selector()
  static getUserById(state: UserStateModel): (id: string) => User | undefined {
    return (id: string): User | undefined => {
      return state.users?.find((user) => user.id === id);
    };
  }

  @Selector()
  static isLoading(state: UserStateModel): boolean | undefined | null {
    return state.loading;
  }

  @Selector()
  static getError(state: UserStateModel): HttpErrorResponse | null | undefined {
    return state.error;
  }

  constructor(private userService: UserService) {}

  @Action(GetUsers, { cancelUncompleted: true })
  getUsers(ctx: StateContext<UserStateModel>, action: GetUsers): Observable<UserApiResponse[]> {
    ctx.patchState({ loading: true, error: null });
    const { page, pageSize, searchQ } = action.payload;

    let getUsersObservable: Observable<UserApiResponse[]>;
    if (searchQ === null || searchQ === undefined) {
      getUsersObservable = this.userService.getUsers(page, pageSize);
    } else {
      getUsersObservable = this.userService.getUsers(page, pageSize, searchQ);
    }

    return getUsersObservable.pipe(
      tap((response: any) => {
        const users = response.data.map((user: any) => user.attributes); // Extraemos la información del usuario
        const total = response.meta.pagination.total;
        const pageCount = Math.ceil(total / pageSize);

        ctx.patchState({
          users,
          total,
          loading: false,
          currentPage: page,
          pageSize,
          pageCount
        });
      }),
      catchError((error) => {
        ctx.patchState({ error, loading: false });
        return throwError(() => error);
      })
    );
  }

  @Action(GetUser, { cancelUncompleted: true })
  getUser(ctx: StateContext<UserStateModel>, { id }: GetUser): Observable<User> {
    ctx.patchState({ loading: true, error: null });
    return this.userService.getUser(id).pipe(
      tap((user: User) => {
        ctx.patchState({ users: [user], loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ error, loading: false });
        return throwError(() => error);
      })
    );
  }
  @Action(UpdateUser, { cancelUncompleted: true })
  updateUser(ctx: StateContext<UserStateModel>, { user }: UpdateUser): Observable<User> {
    ctx.patchState({ loading: true, error: null });
    return this.userService.updateUser(user).pipe(
      tap((updatedUser: User) => {
        const users = ctx.getState().users?.map((u) => (u.id === updatedUser.id ? updatedUser : u));
        ctx.patchState({ users, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ error, loading: false });
        return throwError(() => error);
      })
    );
  }

  @Action(CreateUser)
  createUser(ctx: StateContext<UserStateModel>, { user }: CreateUser): Observable<User> {
    ctx.patchState({ loading: true, error: null });
    return this.userService.createUser(user).pipe(
      tap((createdUser: User) => {
        const users = ctx.getState().users?.concat(createdUser);
        ctx.patchState({ users, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ error, loading: false });
        return throwError(() => error);
      })
    );
  }

  @Action(CreateRoutine)
  createRoutine(ctx: StateContext<UserStateModel>, { routine }: CreateRoutine): Observable<Routine> {
    ctx.patchState({ loading: true, error: null });
    return this.userService.createRoutine(routine).pipe(
      catchError((error) => {
        ctx.patchState({ error, loading: false });
        return throwError(() => error);
      })
    );
  }

  // @Action(DeleteUser)
  // deleteUser(ctx: StateContext<UserStateModel>, { id }: DeleteUser): void {
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
