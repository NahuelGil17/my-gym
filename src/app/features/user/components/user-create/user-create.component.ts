import { Component, ViewChild } from '@angular/core';
import { Breadcrumb } from '@core/interfaces/breadcrumb.interface';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateRoutine, CreateUser } from '@features/user/state/user.actions';
import { Store } from '@ngxs/store';
import { forkJoin, tap } from 'rxjs';
import { User } from '@features/user/interfaces/user.interface';
import { UserService } from '@features/user/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  public userForm!: FormGroup;
  public routines: any[] = [];
  public body: any = {};
  public routineIds: string[] = [];
  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Usuarios',
      url: '/usuarios'
    },
    {
      label: 'Crear Usuario'
    }
  ];

  constructor(private fb: FormBuilder, private userService: UserService, private store: Store) {
    this.userForm = this.fb.group({
      user: this.fb.group({
        name: [null, Validators.required],
        lastName: [null, [Validators.required]],
        isActive: [true, Validators.required]
      })
    });
  }

  public receiveRoutineFormValues(event: any): void {
    this.routines.push(event);
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
    this.routines.splice(index, 1);
  }

  sendDataToApi(): void {
    const routineCreationObservables = this.routines.map((routine) => {
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
