import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/controllers/login.component';
import { LoginFailedComponent } from '../components/controllers/login-failed.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: "login", pathMatch: "full"},
      { path: 'login', component: LoginComponent },
      { path: 'login-failed', component: LoginFailedComponent}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
