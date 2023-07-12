import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: '../views/login.component.html',
  styleUrls: ['../styles/login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}
  hide = true;

  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(1)]),
    clave: new FormControl('', [Validators.required, Validators.minLength(1)])
  })

  login() {
    console.log("Hola Mundo");
    this.router.navigate(['admin/dashboard/resumen']);
  }
}
