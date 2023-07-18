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

/* JWT */
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

/* APP MODULES */
import { AuthRoutingModule } from './router/auth-routing.module';
import { MaterialModule } from 'src/material.module';

/* COMPONENTES */
import { AuthComponent } from "./components/controllers/auth.component";
import { LoginComponent } from './components/controllers/login.component';

/* INTERCEPTORES */
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.loginReducer),
    EffectsModule.forFeature([LoginEffect])
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
