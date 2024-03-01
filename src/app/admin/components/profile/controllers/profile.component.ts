import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { LOGOUT } from 'src/app/auth/store/actions/login.actions';

@Component({
  selector: 'app-profile',
  templateUrl: '../views/profile.component.html',
  styleUrl: '../styles/profile.component.scss'
})
export class ProfileComponent {
  isSmallScreen = false;
  opened = true;
  token = localStorage.getItem("auth_token");

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store) {}

  ngOnInit() {
    if(!this.token) {
      this.store.dispatch(LOGOUT());
    }
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
        if (this.isSmallScreen) {
          this.opened = false;
        } else {
          this.opened = true;
        }
      });
  }
}
