/* MODULOS */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './router/admin-routing.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ProfileModule } from './components/profile/profile.module';
import { HomeModule } from './components/home/home.module';
import { MaterialModule } from '../../material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardModule,
    ProfileModule,
    HomeModule,
    MaterialModule
  ],
})
export class AdminModule { }
