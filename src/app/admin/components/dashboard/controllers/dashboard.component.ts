import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../views/dashboard.component.html',
  styleUrls: ['../styles/dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  isSmallScreen = false;
  opened = true;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {

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
