import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from "../models/user.model";
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PIC = 'https://graph.microsoft.com/v1.0/me/photo/$value';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  getUserProfile() {
    return this.httpClient.get<User>(GRAPH_ENDPOINT);
  }

  getUserProfilePic() {
    return this.httpClient.get(GRAPH_ENDPOINT_PIC, {
      responseType: 'blob'
    });
  }
}
