import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from '@features/user/user-routing.module';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserCreateRutineFormComponent } from './components/user-create-rutine-form/user-create-rutine-form.component';

@NgModule({
  declarations: [
    UserCreateComponent,
    UserFormComponent,
    UserLayoutComponent,
    UserHomeComponent,
    UserTableComponent,
    UserCreateRutineFormComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class UserModule {}
