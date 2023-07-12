/* MODULOS */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './router/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';

/* COMPONENTES */
import { AuthComponent } from "./components/controllers/auth.component";
import { LoginComponent } from './components/controllers/login.component';
import { LoginFailedComponent } from './components/controllers/login-failed.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LoginFailedComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  exports: []
})
export class AuthModule { }
