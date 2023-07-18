import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { CurrentUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  token: any;
  constructor() { }

  esBeneficiario() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;
    if (tokenPayload.user.tipoUsuario === "Beneficiario") {
      return true;
    }
    return false;
  }

  esMediken() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;
    if (tokenPayload.user.tipoUsuario === "Mediken") {
      return true;
    }
    return false;
  }

  getUserName(): string {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;

    return tokenPayload.user;
  }

  obtenerCurrentUser(): CurrentUser {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;

    let user: CurrentUser = {
      nombre: tokenPayload.user.nombre? tokenPayload.user.nombre.trim() : "",
      apellido: tokenPayload.user.apellido? tokenPayload.user.apellido.trim() : "",
      email: tokenPayload.user.email? tokenPayload.user.email.trim() : ""
    }
    return user;
  }
}
