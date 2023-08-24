import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/core/validators/password-match.validator';
import { passwordValidator } from 'src/app/core/validators/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  showPassword = false;
  showConfirm = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        password: [null, [Validators.required, passwordValidator()]],
        confirm: [null, [Validators.required]]
      },
      { validators: passwordMatchValidator() }
    );
  }

  reset(): void {
    // TODO
    this.router.navigate(['auth/login']);
  }
}
