/* MODULOS */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './router/auth-routing.module';

/* COMPONENTES */
import { AuthComponent } from "./components/controllers/auth.component";
import { LoginComponent } from './components/controllers/login.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
