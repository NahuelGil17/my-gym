import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsHomeComponent } from './components/settings-home/settings-home.component';
import { NotificationSettingsComponent } from './components/notification-settings/notification-settings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { NotificationsFormComponent } from './components/notifications-form/notifications-form.component';

@NgModule({
  declarations: [
    SettingsHomeComponent,
    NotificationSettingsComponent,
    ChangePasswordComponent,
    PasswordFormComponent,
    NotificationsFormComponent
  ],
  imports: [CommonModule, SettingsRoutingModule, SharedModule]
})
export class SettingsModule {}
