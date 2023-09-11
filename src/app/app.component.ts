import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { LOGOUT } from './auth/store/actions/login.actions';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard-mediken';

  constructor(
    private authService: AuthService,
    private store: Store,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    document.body.classList.add("mat-typography", "mat-app-background");
    if (!this.authService.isAuthenticated()) {
      this.store.dispatch(LOGOUT());
    }
  }
}
