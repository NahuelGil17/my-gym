import { Component, NgModule } from '@angular/core';
import { Breadcrumb } from '@core/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  public routines: { day: string, startTime: string, endTime: string, exercises: string[] }[] = [];

  constructor() {
    this.userFormData = {
      name: '',
      lastName: ''
    };
    this.routineFormdata = {
      day: '',
      startTime: '',
      endTime: '',
      exercises: []
    }
  }
  public userFormData: { name: string, lastName: string };
  public routineFormdata: { day: string, startTime: string, endTime: string, exercises: string[] }
  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Usuarios',
      url: '/usuarios'
    },
    {
      label: 'Crear Usuario'
    }
  ];

  public receiveUserFormValues(event: { name: string, lastName: string }): void {
    this.userFormData = event;
  }

  public receiveRoutineFormValues(event: { day: string, startTime: string, endTime: string, exercises: string[] }): void {
    this.routineFormdata = event;
  }

  sendDataToApi() {
    console.log(this.userFormData);
    console.log(this.routineFormdata);
  }

  receiveRoutine(routine: { day: string, startTime: string, endTime: string, exercises: string[] }) {
    this.routines.push(routine);
  }
}
