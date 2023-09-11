import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard-mediken';
  token: any;

  constructor() {}

  ngOnInit() {
    document.body.classList.add("mat-typography", "mat-app-background");
  }
}
