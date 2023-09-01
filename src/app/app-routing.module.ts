import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaderComponent } from '@core/components/loader/loader.component';
import { authGuard } from '@core/guards/auth.guard';
import { signInGuard } from '@core/guards/sign-in.guard';
import { DashboardLayoutComponent } from './core/components/dashboard-layout/dashboard-layout.component';
import { UserModule } from './features/user/user.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [signInGuard],
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      {
        path: 'usuarios',
        loadChildren: () => import('./features/user/user.module').then((m) => m.UserModule),
        title: 'Usuarios'
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.module').then((m) => m.SettingsModule),
        title: 'Settings'
      }
    ]
  },
  {
    path: 'auth',
    title: 'Authentication',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [authGuard]
  },

  { path: 'loading', component: LoaderComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
