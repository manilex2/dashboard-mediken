import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../views/dashboard.component.html',
  styleUrls: ['../styles/dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  isSmallScreen = false;
  opened = true;
  token = localStorage.getItem("auth_token");

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  ngOnInit() {
    if(!this.token) {
      this.router.navigate(["auth/login"]);
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
