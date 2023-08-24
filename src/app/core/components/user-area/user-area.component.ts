import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '@features/auth/interfaces/auth';
import { Logout } from '@features/auth/state/auth.actions';
import { AuthState } from '@features/auth/state/auth.state';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable, take } from 'rxjs';

/**
 * A component that displays the user area and allows the user to log out.
 */
@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent {
  /**
   * The user data observable.
   */
  @Select(AuthState.userData) userData!: Observable<Profile>;

  /**
   * Creates an instance of UserAreaComponent.
   * @param {Store} store - The Ngxs store.
   * @param {Actions} actions - The Ngxs actions.
   * @param {Router} router - The Angular router.
   */
  constructor(private store: Store, private actions: Actions, private router: Router) {}

  /**
   * Logs the user out and navigates to the authentication page.
   */
  logOut(): void {
    this.store.dispatch(new Logout());
    this.actions.pipe(ofActionSuccessful(Logout), take(1)).subscribe(() => {
      this.router.navigate(['auth/login']);
    });
  }
}
