import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationHomeComponent } from './components/organization-home/organization-home.component';
import { OrganizationTableComponent } from './components/organization-table/organization-table.component';
import { DashboardRoutingModule } from './organization-routing.module';
import { OrganizationCreateComponent } from './components/organization-create/organization-create.component';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { OrganizationLayoutComponent } from './components/organization-layout/organization-layout.component';

@NgModule({
  declarations: [
    OrganizationHomeComponent,
    OrganizationTableComponent,
    OrganizationCreateComponent,
    OrganizationFormComponent,
    OrganizationLayoutComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class OrganizationModule {}
