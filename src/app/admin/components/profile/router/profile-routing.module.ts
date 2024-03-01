import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../controllers/profile.component';
import { FirstLoginComponent } from '../controllers/first-login.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: '', redirectTo: 'first-login', pathMatch: "full" },
      { path: '', component: ProfileComponent, children: [
        { path: 'first-login', component: FirstLoginComponent }
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
