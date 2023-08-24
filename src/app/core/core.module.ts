import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserAreaComponent } from './components/user-area/user-area.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [DashboardLayoutComponent, NavigationComponent, UserAreaComponent, LoaderComponent],
  imports: [CommonModule, SharedModule]
})
export class CoreModule {}
