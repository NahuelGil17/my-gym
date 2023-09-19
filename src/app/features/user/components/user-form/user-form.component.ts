import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm!: FormGroup;

  @Output() readonly userFormValues = new EventEmitter<User>();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    });
  }

  emitFormValues(): void {
    const formData = this.userForm.value;
    this.userFormValues.emit(formData);
    this.userForm.reset();
  }

  /**
   * Reset form values.
   */
  cancel(): void {
    this.userForm.reset();
  }
}
