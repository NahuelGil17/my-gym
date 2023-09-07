import { Component, NgModule, ViewChild } from '@angular/core';
import { Breadcrumb } from '@core/interfaces/breadcrumb.interface';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  public userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      user: this.fb.group({
        name: [null, Validators.required],
        lastName: [null, [Validators.required]]
        // otros campos
      }),
      rutinas: this.fb.array([])
    });
  }
  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Usuarios',
      url: '/usuarios'
    },
    {
      label: 'Crear Usuario'
    }
  ];

  get routines(): FormArray {
    return this.userForm.get('rutinas') as FormArray;
  }
  public receiveRoutineFormValues(event: FormGroup): void {
    this.routines.push(event);
  }

  sendDataToApi() {
    this.userFormComponent.emitFormValues();
  }

  receiveRoutine(routine: { day: string; startTime: string; endTime: string; exercises: string[] }) {
    this.routines.push(routine);
  }
}
