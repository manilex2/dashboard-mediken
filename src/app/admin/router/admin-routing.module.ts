import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

const routes: Routes = [
  { path: '', children: [{ path: '', redirectTo: 'dashboard', pathMatch: "full" }]},
  { path: 'dashboard', loadChildren: () => import('../components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [() => inject(AuthService).isAuthenticated()]},
  { path: 'profile', loadChildren: () => import('../components/profile/profile.module').then(m => m.ProfileModule), canActivate: [() => inject(AuthService).isAuthenticated()]},
  { path: "**", redirectTo: "admin" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
