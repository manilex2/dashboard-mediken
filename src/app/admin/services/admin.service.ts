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

  esBroker() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;
    if (tokenPayload.user.tipoUsuario === "Broker") {
      return true;
    }
    return false;
  }

  esAfiliadoTitular() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;
    if (tokenPayload.user.tipoUsuario === "AfiliadoTitular") {
      return true;
    }
    return false;
  }

  rolMediken() {
    this.token = localStorage.getItem('auth_token');
    let tokenPayload: any = this.token? decode(this.token) : false;
    return tokenPayload.user.tipo;
  }

  tieneRol() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;
    if (tokenPayload.user.tipo === "A" || tokenPayload.user.tipo === "G" || tokenPayload.user.tipo === "C" || tokenPayload.user.tipo === "R" || tokenPayload.user.tipo === "L") {
      return true;
    }
    return false;
  }

  getUser(): string {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;

    return tokenPayload.user;
  }

  getUserName(): string {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;

    return tokenPayload.user.usuario;
  }

  obtenerCurrentUser(): CurrentUser {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;

    let user: CurrentUser = {
      nombres: tokenPayload.user.nombres? tokenPayload.user.nombres.trim() : "",
      apellidos: tokenPayload.user.apellidos? tokenPayload.user.apellidos.trim() : "",
      email: tokenPayload.user.email? tokenPayload.user.email.trim() : ""
    }
    return user;
  }

  obtenerBeneficiarios(): Array<string> {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;

    return tokenPayload.user;
  }
}
