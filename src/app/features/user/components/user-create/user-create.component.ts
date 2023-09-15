import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Breadcrumb } from '@core/interfaces/breadcrumb.interface';
import { UserService } from '@features/user/services/user.service';
import { AddRoutineArray, CreateUser, DeleteRoutineArray, UpdateRoutineArray } from '@features/user/state/user.actions';
import { UserState } from '@features/user/state/user.state';
import { Select, Store } from '@ngxs/store';
import { Observable, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private userService: UserService, private store: Store) {
    this.userForm = this.fb.group({
      user: this.fb.group({
        name: [null, Validators.required],
        lastName: [null, [Validators.required]],
        isActive: [true, Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.$userToEdit.subscribe((user) => {
      if (user) {
        this.isEdit = true;
        this.userForm.patchValue({
          user: {
            name: user.name,
            lastName: user.lastName,
            isActive: user.isActive
          }
        });
      }
    });
  }

  public receiveRoutineFormValues(event: any): void {
    if (!this.routineToEdit) {
      this.store.dispatch(new AddRoutineArray(event));
    } else {
      this.store.dispatch(new UpdateRoutineArray({ routine: event, index: this.editIndex }));
      this.routineToEdit = null;
      this.editIndex = -1;
    }
  }

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

  deleteRoutine(index: number): void {
    this.store.dispatch(new DeleteRoutineArray(index));
  }

  editRoutine(routine: any, index: number): void {
    this.editIndex = index;
    this.routineToEdit = routine;
  }

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
                  lastName: this.userForm.value.user.lastName
                }
              };
              this.store.dispatch(new CreateUser(newUser));
            })
          )
          .subscribe();
      }
    }
  }
}
