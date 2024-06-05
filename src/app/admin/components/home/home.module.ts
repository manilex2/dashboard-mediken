/* Modulos */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../..//material.module';

/* NGRX */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CurrentUserEffect } from '../../store/effects/currentuser.effects';
import * as fromCurrentUser from '../../store/reducers/currentuser.reducers';
import { MenuComponent } from './controllers/menu.component';
import { SearchComponent } from './controllers/search.component';
import { DashboardRoutingModule } from '../dashboard/router/dashboard-routing.module';


@NgModule({
  declarations: [
    MenuComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCurrentUser.currentUserFeatureKey, fromCurrentUser.currentUserReducer),
    EffectsModule.forFeature([CurrentUserEffect]),
    MaterialModule,
    DashboardRoutingModule
  ],
  exports: [MenuComponent, SearchComponent]
})
export class HomeModule { }
