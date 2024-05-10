import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CurrentUser } from '../models';
import { Observable } from 'rxjs';
import { ResponseRequest } from 'src/app/responseRequest.model';
import { User } from 'src/app/auth/components/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProfileImg } from '../components/profile/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  token: any;
  serverURL = environment.serverURL;

  constructor(private http: HttpClient) { }

  esBeneficiario() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;
    if (tokenPayload.user.tipoUsuario === "Beneficiario") {
      return true;
    }
    return false;
  }

  esMediken() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;
    if (tokenPayload.user.tipoUsuario === "Mediken") {
      return true;
    }
    return false;
  }

  esBroker() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;
    if (tokenPayload.user.tipoUsuario === "Broker") {
      return true;
    }
    return false;
  }

  esFirstLogin() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;
    if (tokenPayload.user.firstLogin === true) {
      return true;
    }
    return false;
  }

  esAfiliadoTitular() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;
    if (tokenPayload.user.tipoUsuario === "AfiliadoTitular") {
      return true;
    }
    return false;
  }

  rolMediken() {
    this.token = localStorage.getItem('auth_token');
    let tokenPayload: any = this.token? jwtDecode(this.token) : false;
    return tokenPayload.user.tipo;
  }

  tieneRol() {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;
    if (tokenPayload.user.tipo === "A" || tokenPayload.user.tipo === "G" || tokenPayload.user.tipo === "C" || tokenPayload.user.tipo === "R" || tokenPayload.user.tipo === "L") {
      return true;
    }
    return false;
  }

  getUser(): string {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;

    return tokenPayload.user;
  }

  getUserName(): string {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;

    return tokenPayload.user.usuario;
  }

  getBrokerCode(): string {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;

    return tokenPayload.user.codigoBrokerComp;
  }

  obtenerCurrentUser(): CurrentUser {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;

    let user: CurrentUser = {
      nombres: tokenPayload.user.nombres? tokenPayload.user.nombres.trim() : "",
      apellidos: tokenPayload.user.apellidos? tokenPayload.user.apellidos.trim() : "",
      email: tokenPayload.user.email? tokenPayload.user.email.trim() : ""
    }
    return user;
  }

  obtenerBeneficiarios(): Array<string> {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? jwtDecode(this.token) : false;

    return tokenPayload.user;
  }

  changePassword(user: User): Observable<ResponseRequest> {
    try {
      return this.http.put<ResponseRequest>(`${this.serverURL}/users/change-password/${user.usuario}`, { ...user })
    } catch (error) {
      throw error;
    }
  }

  getProfileImage(user: User): Observable<ProfileImg> {
    try {
      return this.http.get<ProfileImg>(`${this.serverURL}/users/img/${user.usuario}`)
    } catch (error) {
      throw error;
    }
  }

  updateProfileImage(user: User): Observable<ProfileImg> {
    try {
      return this.http.put<ProfileImg>(`${this.serverURL}/users/img/${user.usuario}`, { ...user })
    } catch (error) {
      throw error;
    }
  }

  updateFirstLogin(user: User): Observable<User> {
    try {
      return this.http.put<User>(`${this.serverURL}/users/first-login/${user.usuario}`, { ...user })
    } catch (error) {
      throw error;
    }
  }

  obtenerContratos(): Observable<any> {
    try {
      return this.http.get(`${this.serverURL}/users/contratos`);
    } catch (error) {
      throw error;
    }
  }

  updatePassNotif(user: User): Observable<User> {
    try {
      return this.http.put<User>(`${this.serverURL}/users/password-notification/${user.usuario}`, { ...user })
    } catch (error) {
      throw error;
    }
  }
}
