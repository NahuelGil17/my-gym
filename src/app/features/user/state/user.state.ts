import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Routine, User, UserApiResponse } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddRoutineArray,
  CreateRoutine,
  CreateUser,
  DeleteRoutineArray,
  DesactivateUser,
  GetUser,
  GetUsers,
  SetRoutines,
  SetSelectedUser,
  UpdateRoutineArray,
  UpdateUser
} from './user.actions';
import { Observable, throwError } from 'rxjs';
import { UserStateModel } from './user.model';
import { ro } from 'date-fns/locale';

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    selectedUser: null,
    total: 0,
    loading: false,
    error: null,
    currentPage: 0,
    pageSize: 0,
    routines: [],
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

  @Selector()
  static getRoutines(state: UserStateModel): any[] | undefined | null {
    return state.routines;
  }

  @Selector()
  static getSelectedUser(state: UserStateModel): User | undefined | null {
    return state.selectedUser;
  }

  constructor(private userService: UserService) {}

  @Action(GetUsers, { cancelUncompleted: true })
  getUsers(ctx: StateContext<UserStateModel>, action: GetUsers): Observable<UserApiResponse[]> {
    ctx.patchState({ loading: true, error: null });
    const { page, pageSize, searchQ, isActive } = action.payload;

    let getUsersObservable: Observable<UserApiResponse[]>;
    if (searchQ === null || searchQ === undefined) {
      getUsersObservable = this.userService.getUsers(page, pageSize, '', isActive);
    } else {
      getUsersObservable = this.userService.getUsers(page, pageSize, searchQ, isActive);
    }

    return getUsersObservable.pipe(
      tap((response: any) => {
        const users = response.data.map((user: any) => ({
          id: user.id,
          ...user.attributes
        }));
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
      tap((res: any) => {
        const { data } = res;
        const { attributes } = data;
        const { routines } = attributes;
        const routinesToAdd = routines.data.map(
          (routine: any) => ({ id: routine.id, ...routine.attributes } as Routine)
        );
        const user = { id: data.id, ...attributes, routines: routinesToAdd };
        ctx.patchState({ selectedUser: user, routines: routinesToAdd, loading: false });
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

  @Action(SetSelectedUser, { cancelUncompleted: true })
  setSelectedUser(ctx: StateContext<UserStateModel>, { user }: SetSelectedUser): void {
    ctx.patchState({ selectedUser: user });
  }

  @Action(SetRoutines, { cancelUncompleted: true })
  setRoutines(ctx: StateContext<UserStateModel>, { routines }: SetRoutines): void {
    ctx.patchState({ routines: routines });
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

  @Action(DesactivateUser, { cancelUncompleted: true })
  desactivateUser(ctx: StateContext<UserStateModel>, { id }: DesactivateUser): Observable<User> {
    ctx.patchState({ loading: true, error: null });
    return this.userService.desactivateUser(id).pipe(
      tap(() => {
        const users = ctx.getState().users?.map((user) => (user.id === id ? { ...user, isActive: false } : user));

        ctx.patchState({ users, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ error, loading: false });
        return throwError(() => error);
      })
    );
  }
  // Routines Array
  @Action(AddRoutineArray, { cancelUncompleted: true })
  addRoutine(ctx: StateContext<UserStateModel>, { routine }: AddRoutineArray): void {
    ctx.patchState({ loading: true, error: null });
    const routines = ctx.getState().routines?.concat(routine);
    ctx.patchState({ routines, loading: false });
  }

  @Action(UpdateRoutineArray, { cancelUncompleted: true })
  updateRoutine(ctx: StateContext<UserStateModel>, action: UpdateRoutineArray): void {
    //repalce the routine in the array with the new one
    ctx.patchState({ loading: true, error: null });
    const routines = ctx.getState().routines?.map((r, i) => (i === action.payload.index ? action.payload.routine : r));
    ctx.patchState({ routines, loading: false });
  }

  @Action(DeleteRoutineArray, { cancelUncompleted: true })
  deleteRoutine(ctx: StateContext<UserStateModel>, { index }: DeleteRoutineArray): void {
    ctx.patchState({ loading: true, error: null });
    const routines = ctx.getState().routines?.filter((r, i) => i !== index);
    ctx.patchState({ routines, loading: false });
  }
}
