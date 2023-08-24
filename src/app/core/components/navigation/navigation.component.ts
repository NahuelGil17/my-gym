import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * The NavigationComponent displays the navigation bar of the application.
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  /**
   * The name of the application.
   */
  appName = environment.appName;
}
