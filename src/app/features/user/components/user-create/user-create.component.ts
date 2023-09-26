import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Breadcrumb } from '@core/interfaces/breadcrumb.interface';
import { SnackBarService } from '@core/services/snackbar.service';
import { UserService } from '@features/user/services/user.service';
import {
  AddRoutineArray,
  CreateUser,
  DeleteRoutineArray,
  SetRoutines,
  SetSelectedUser,
  UpdateRoutineArray,
  UpdateUser
} from '@features/user/state/user.actions';
import { UserState } from '@features/user/state/user.state';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable, forkJoin, take, tap } from 'rxjs';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {
  @Select(UserState.getRoutines) routines!: Observable<any[]>;

  $userToEdit = this.store.select(UserState.getSelectedUser);
  public userForm!: FormGroup;
  public body: any = {};
  public routineIds: string[] = [];
  public routineToEdit: any = null;
  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Usuarios',
      url: '/usuarios'
    },
    {
      label: 'Crear Usuario'
    }
  ];
  public isEdit = false;
  public editIndex!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private store: Store,
    private actions: Actions,
    private snackbarService: SnackBarService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      user: this.fb.group({
        id: [null],
        name: [null, Validators.required],
        lastName: [null, [Validators.required]],
        isActive: [true, Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.$userToEdit.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.isEdit = true;
        this.userForm.patchValue({
          user: {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            isActive: user.isActive
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.isEdit = false;
    this.store.dispatch(new SetSelectedUser(null));
    this.store.dispatch(new SetRoutines([]));
  }
  // Routines
  /**
   * Receives the form values for a routine and dispatches an action to add or update the routine array.
   * @param event - The form values for the routine.
   */
  public receiveRoutineFormValues(event: any): void {
    if (!this.routineToEdit) {
      this.store.dispatch(new AddRoutineArray(event));
    } else {
      this.store.dispatch(
        new UpdateRoutineArray({ routine: { id: this.routineToEdit.id, ...event }, index: this.editIndex })
      );
      this.routineToEdit = null;
      this.editIndex = -1;
    }
  }

  /**
   * Deletes a routine from the routine array.
   * @param index - The index of the routine to delete.
   */
  deleteRoutine(index: number): void {
    this.store.dispatch(new DeleteRoutineArray(index));
  }

  /**
   * Sets the routine to edit and its index in the routine array.
   * @param routine - The routine to edit.
   * @param index - The index of the routine to edit.
   */
  editRoutine(routine: any, index: number): void {
    this.editIndex = index;
    this.routineToEdit = routine;
  }

  /**
   * Converts a time string to a formatted time string.
   * @param time - The time string to convert.
   * @returns The formatted time string.
   */
  public convertTime(time: string): string {
    // Assuming you've received the time string
    const timeString = time;

    // Parse hours and minutes from the time string
    const [h, m] = timeString.split(':').map(Number);

    // Create a new Date object for the current date
    const currentDate = new Date();

    // Set hours and minutes for the Date object
    currentDate.setHours(h, m, 0, 0); // Sets the seconds and milliseconds to 0

    // Obtén los componentes de tiempo de la fecha.
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const milliseconds = currentDate.getMilliseconds();

    // Formatea los componentes de tiempo en una cadena con el formato deseado.
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;

    return formattedTime;
  }

  /**
   * Sends the user and routine data to the API.
   */
  sendDataToApi(): void {
    if (!this.isEdit) {
      const routines = this.store.selectSnapshot(UserState.getRoutines);
      if (routines) {
        const routineCreationObservables = routines.map((routine) => {
          const newRoutine = {
            ...routine
          };
          newRoutine.startTime = this.convertTime(routine.startTime);
          newRoutine.endTime = this.convertTime(routine.endTime);

          return this.userService.createRoutine(newRoutine);
        });
        forkJoin(routineCreationObservables)
          .pipe(
            tap((routines) => {
              this.routineIds = routines.map((routine: any) => routine.data.id);

              const newUser: any = {
                data: {
                  routines: this.routineIds,
                  name: this.userForm.value.user.name,
                  lastName: this.userForm.value.user.lastName,
                  isActive: this.userForm.value.user.isActive
                }
              };
              this.store.dispatch(new CreateUser(newUser));
            })
          )
          .subscribe();

        this.actions.pipe(ofActionSuccessful(CreateUser), take(1)).subscribe(() => {
          this.snackbarService.showSuccess('Usuario', 'Usuario creado exitosamente');
          this.userForm.reset();
          this.store.dispatch(new SetRoutines([]));
          // this.router.navigate(['/usuarios']);
        });
      }
    } else {
      const routines = this.store.selectSnapshot(UserState.getRoutines);
      if (routines) {
        const routineCreationObservables = routines.map((routine) => {
          const newRoutine = {
            ...routine
          };
          newRoutine.startTime = this.convertTime(routine.startTime);
          newRoutine.endTime = this.convertTime(routine.endTime);
          if (newRoutine.id) {
            return this.userService.updateRoutine(newRoutine);
          } else {
            return this.userService.createRoutine(newRoutine);
          }
        });
        forkJoin(routineCreationObservables)
          .pipe(
            tap((routines) => {
              this.routineIds = routines.map((routine: any) => routine.data.id);

              const newUser: any = {
                data: {
                  routines: this.routineIds,
                  name: this.userForm.value.user.name,
                  lastName: this.userForm.value.user.lastName,
                  isActive: this.userForm.value.user.isActive,
                  id: this.userForm.value.user.id
                }
              };
              this.store.dispatch(new UpdateUser(newUser.data));
            })
          )
          .subscribe();
        this.actions.pipe(ofActionSuccessful(UpdateUser), take(1)).subscribe(() => {
          this.snackbarService.showSuccess('Usuario', 'Usuario actualizado exitosamente');
          this.userForm.reset();
          this.store.dispatch(new SetRoutines([]));
          this.router.navigate(['/usuarios']);
        });
      }
    }
  }
}
