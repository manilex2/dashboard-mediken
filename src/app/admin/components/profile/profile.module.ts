/* MODULOS */
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './router/profile-routing.module';
import { MaterialModule } from '../../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* COMPONENTES */
import { FirstLoginComponent } from './controllers/first-login.component';
import { ProfileComponent } from './controllers/profile.component';
import { HomeModule } from '../home/home.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


@NgModule({
  declarations: [
    FirstLoginComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    HomeModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class ProfileModule { }
