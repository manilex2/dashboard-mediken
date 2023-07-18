import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard-mediken';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    document.body.classList.add("mat-typography", "mat-app-background");
    if (!this.authService.isAuthenticated()) {
      localStorage.removeItem('auth_token');
    }
  }
}
