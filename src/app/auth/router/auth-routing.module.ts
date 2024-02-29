import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/controllers/login.component';
import { ResetPasswordComponent } from '../components/controllers/reset-password.component';
import { ChangePasswordResetComponent } from '../components/controllers/change-password-reset.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: "login", pathMatch: "full"},
      { path: 'login', component: LoginComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'change-password-reset', component: ChangePasswordResetComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
