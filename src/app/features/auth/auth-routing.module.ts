import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { checkRequiredParamsGuard } from 'src/app/core/guards/check-required-params.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Log in to your account' },
      { path: 'forgot', component: ForgotPasswordComponent, title: 'Forgot password' },
      {
        path: 'reset',
        component: ResetPasswordComponent,
        title: 'Set new password',
        data: {
          params: ['token'],
          redirectTo: ['auth']
        },
        canMatch: [checkRequiredParamsGuard]
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
