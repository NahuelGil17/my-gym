import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from '@core/services/snackbar.service';
import { Login } from '@features/auth/state/auth.actions';
import { AuthState } from '@features/auth/state/auth.state';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { passwordValidator } from 'src/app/core/validators/password.validator';

/**
 * The LoginComponent displays a login form that allows users to log in to the application.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  showPassword = false;
  private destroy = new Subject<void>();

  @Select(AuthState.authLoading) loading!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private actions: Actions,
    private snackbar: SnackBarService
  ) {}

  ngOnInit(): void {
    // Create the login form with email and password fields
    this.loginForm = this.fb.group({
      identifier: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, passwordValidator()]]
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /**
   * Authenticate the user and redirect to dashboard
   * @returns void
   */
  login(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(new Login(this.loginForm.value));

      this.actions.pipe(ofActionSuccessful(Login), takeUntil(this.destroy)).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
