import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationHomeComponent } from './components/organization-home/organization-home.component';
import { OrganizationLayoutComponent } from './components/organization-layout/organization-layout.component';
import { OrganizationCreateComponent } from './components/organization-create/organization-create.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationLayoutComponent,
    children: [
      { path: '', component: OrganizationHomeComponent },
      { path: 'create', component: OrganizationCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
