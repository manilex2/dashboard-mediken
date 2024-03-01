/* NG MODULES */
import { NgModule } from '@angular/core';

/* COMMON */
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/* FORMS */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NGRX */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLogin from './store/reducers/login.reducers';
import { LoginEffect } from './store/effects/login.effects';
import * as fromChangePassword from './store/reducers/change-password.reducers';
import { ChangePasswordEffect } from './store/effects/change-password.effects';
import * as fromResetPassword from './store/reducers/reset-password.reducers';
import { ResetPasswordEffect } from './store/effects/reset-password.effects';

/* JWT */
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

/* APP MODULES */
import { AuthRoutingModule } from './router/auth-routing.module';
import { MaterialModule } from '../../material.module';

/* COMPONENTES */
import { AuthComponent } from "./components/controllers/auth.component";
import { LoginComponent } from './components/controllers/login.component';

/* INTERCEPTORES */
import { AuthInterceptor } from './services/auth.interceptor';
import { ResetPasswordComponent } from './components//controllers/reset-password.component';
import { ChangePasswordResetComponent } from './components//controllers/change-password-reset.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent,
    ChangePasswordResetComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.loginReducer),
    StoreModule.forFeature(fromChangePassword.changePasswordFeatureKey, fromChangePassword.changePasswordReducer),
    StoreModule.forFeature(fromResetPassword.resetPasswordFeatureKey, fromResetPassword.resetPasswordReducer),
    EffectsModule.forFeature([LoginEffect, ChangePasswordEffect, ResetPasswordEffect])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [],
  exports: []
})
export class AuthModule { }
