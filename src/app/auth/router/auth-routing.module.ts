import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/controllers/login.component';
import { ResetPasswordComponent } from '../components/controllers/reset-password.component';
import { ChangePasswordResetComponent } from '../components/controllers/change-password-reset.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login/iniciar-sesion' },
      { path: 'login', children: [
        { path: '', pathMatch: 'full', redirectTo: 'iniciar-sesion' },
        { path: 'iniciar-sesion', component: LoginComponent },
        { path: 'reset-password', component: ResetPasswordComponent },
        { path: 'change-password-reset', component: ChangePasswordResetComponent },
        { path: '**', redirectTo: 'iniciar-sesion' }
      ]},
    ]
  },
  { path: '**', redirectTo: 'auth/login/iniciar-sesion' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
