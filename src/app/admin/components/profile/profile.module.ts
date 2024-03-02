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


@NgModule({
  declarations: [
    FirstLoginComponent,
    ProfileComponent,
    UploadImageComponent,
    DialogUploadImgComponent
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
    WebcamModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class ProfileModule { }
