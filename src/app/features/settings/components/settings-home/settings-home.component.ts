import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.css']
})
export class SettingsHomeComponent {
  tabs = [
    {
      label: 'Change Password',
      routerLink: '/settings/password-change',
      requiredRoles: []
    },
    {
      label: 'Notifications',
      routerLink: '/settings/notifications',
      requiredRoles: []
    }
  ];
}
