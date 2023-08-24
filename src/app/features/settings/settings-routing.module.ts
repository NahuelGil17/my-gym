import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsHomeComponent } from './components/settings-home/settings-home.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NotificationSettingsComponent } from './components/notification-settings/notification-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsHomeComponent,
    children: [
      { path: '', redirectTo: 'password-change', pathMatch: 'full' },
      { path: 'password-change', component: ChangePasswordComponent },
      { path: 'notifications', component: NotificationSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
