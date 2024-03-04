import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../controllers/profile.component';
import { FirstLoginComponent } from '../controllers/first-login.component';
import { EditProfileComponent } from '../controllers/edit-profile.component';
import { AdminService } from 'src/app/admin/services/admin.service';
import { AuthService } from 'src/app/auth/services/auth.service';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: '', redirectTo: 'first-login', pathMatch: "full" },
      { path: '', component: ProfileComponent, children: [
        { path: 'first-login', component: FirstLoginComponent, canActivate: [() => inject(AuthService).isAuthenticated(), () => inject(AdminService).esFirstLogin()]},
        { path: 'edit-profile', component: EditProfileComponent, canActivate: [() => inject(AuthService).isAuthenticated()] }
      ]},
    ]},
  {
    path: "**", redirectTo: "profile"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
