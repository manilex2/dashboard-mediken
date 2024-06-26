import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/controllers/login.component';
import { ResetPasswordComponent } from '../components/controllers/reset-password.component';
import { ChangePasswordResetComponent } from '../components/controllers/change-password-reset.component';
import { AuthService } from '../services/auth.service';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', children: [
        { path: '', pathMatch: 'full', redirectTo: 'iniciar-sesion' },
        { path: 'iniciar-sesion', component: LoginComponent, canActivate: [() => !inject(AuthService).isAuthenticated()] },
        { path: 'reset-password', component: ResetPasswordComponent, canActivate: [() => !inject(AuthService).isAuthenticated()] },
        { path: 'change-password-reset', component: ChangePasswordResetComponent, canActivate: [() => !inject(AuthService).isAuthenticated()] },
        { path: '**', redirectTo: 'iniciar-sesion' }
      ]},
    ]
  },
  { path: '**', redirectTo: 'auth' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
