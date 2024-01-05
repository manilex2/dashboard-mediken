import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../components/models';
import { Observable } from 'rxjs';
import { Appstate } from 'src/app/shared/store/AppState';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverURL = environment.serverURL;
  token: any;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
  ) {}

  isAuthenticated(): boolean {
    this.token = localStorage.getItem('auth_token');
    if(this.jwtHelper.isTokenExpired(this.token)) {
      return false;
    }
    return true;
  }

  login(user: User): Observable<User[]> {
    try {
      return this.http.post<User[]>(`${this.serverURL}/auth`, { usuario: user.usuario, clave: user.clave })
    } catch (error) {
      throw error;
    }
  }
}
