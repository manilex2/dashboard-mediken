import { Injectable, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: '../views/login.component.html',
  styleUrls: ['../styles/login.component.scss']
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  hide = true;
  loginForm = this.fb.group<User>({
    usuario: ["", Validators.required],
    clave: ["", Validators.required]
  });

  onSubmit() {
    if (this.loginForm.value.usuario === "prueba" && this.loginForm.value.clave==="Prueba1234*") {
      this.router.navigate(['admin']);
    } else {
      this.toastr.error("Usuario incorrecto", "Login", {
        progressBar: true
      })
    }
  }
}
