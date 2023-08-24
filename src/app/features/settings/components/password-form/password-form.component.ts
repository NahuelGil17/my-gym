import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/core/validators/password-match.validator';
import { passwordValidator } from 'src/app/core/validators/password.validator';

/**
 * The PasswordFormComponent displays a form that allows users to change their password.
 */
@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {
  /** The password form. */
  passwordForm!: FormGroup;

  /** Whether the current password is currently visible. */
  showCurrent = false;

  /** Whether the new password is currently visible. */
  showPassword = false;

  /** Whether the password confirmation is currently visible. */
  showConfirm = false;

  /**
   * Creates a new instance of the PasswordFormComponent.
   * @param fb The FormBuilder service.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    // Create the password form with current, password, and confirm fields
    this.passwordForm = this.fb.group(
      {
        current: [null, [Validators.required]],
        password: [null, [Validators.required, passwordValidator()]],
        confirm: [null, [Validators.required]]
      },
      { validators: passwordMatchValidator() }
    );
  }

  /**
   * Changes the user's password.
   */
  changePassword(): void {
    // TODO: Implement change password logic
  }

  /**
   * Cancels the password change.
   */
  cancel(): void {
    this.passwordForm.reset();
  }
}
