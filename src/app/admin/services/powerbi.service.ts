// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PowerbiService {
  token: any = localStorage.getItem('powerbi_report_token');

  constructor(private httpClient: HttpClient) {}

  /**
   * @returns embed configuration
   */
  getEmbedConfig(endpoint: string): Observable<any> {
    return this.httpClient.get<any>(endpoint);
  }
}
