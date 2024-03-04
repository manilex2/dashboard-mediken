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
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { UploadImageComponent } from './controllers/upload-image.component';
import { DialogUploadImgComponent } from './controllers/dialog-upload-img.component';
import { WebcamModule } from 'ngx-webcam';
import { EditProfileComponent } from './controllers/edit-profile.component';

/* NGRX */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProfileImage from './store/reducers/profile-image.reducers';
import { ProfileImageEffect } from './store/effects/profile-image.effects';
import * as fromFirstLogin from './store/reducers/first-login.reducers';
import { FirstLoginEffect } from './store/effects/first-login.effects';


@NgModule({
  declarations: [
    FirstLoginComponent,
    ProfileComponent,
    UploadImageComponent,
    DialogUploadImgComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    NgxPhotoEditorModule,
    WebcamModule,
    StoreModule.forFeature(fromProfileImage.profileImageFeatureKey, fromProfileImage.profileImageReducer),
    StoreModule.forFeature(fromFirstLogin.firstLoginFeatureKey, fromFirstLogin.firstLoginReducer),
    EffectsModule.forFeature([ProfileImageEffect, FirstLoginEffect])
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class ProfileModule { }
