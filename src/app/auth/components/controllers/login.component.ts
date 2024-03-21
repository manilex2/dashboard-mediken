import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/AppState';
import { LOGIN } from '../../store/actions/login.actions';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { setAPIStatus } from 'src/app/shared/store/actions/app.actions';
import { user } from '../../store/selectors/login.selectors';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models';
import { jwtDecode } from 'jwt-decode';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login.component.html',
  styleUrls: ['../styles/login.component.scss']
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {}
  hide = true;
  token = localStorage.getItem("auth_token");

  ngOnInit() {
    if(this.token) {
      this.router.navigate(["admin/dashboard/resumen"]);
    }
  }

  loginForm = this.fb.group<User>({
    usuario: ['', [Validators.required, Validators.minLength(1)]],
    clave: ['', [Validators.required, Validators.minLength(1)]]
  })

  login() {
    this.store.dispatch(LOGIN({ user: this.loginForm.value }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((data) => {
      if (data.apiStatus === "success" && data.loginStatus === "login") {
        this.appStore.dispatch(setAPIStatus({
          apiStatus: {
            apiCodeStatus: 200,
            apiResponseMessage: '',
            apiStatus: '',
            loginStatus: "logged"
          }}))
        this.toastr.success("Usuario logeado con exito.", "Login", {
          progressBar: true
        })
        this.store.pipe(select(user)).subscribe((async data => {
          for (let i = 0; i < data.length; i++) {
            const token = data[i].token;
            localStorage.setItem('auth_token', token);
            let saveToken = localStorage.getItem("auth_token");
            let tokenPayload: any = saveToken? jwtDecode(saveToken) : "";
            if (tokenPayload.user.firstLogin === true) {
              this.router.navigate(['admin/profile/first-login']);
            } else if (tokenPayload.user.tipoUsuario === "Beneficiario") {
              this.adminService.obtenerContratos().subscribe(async (contratos: string) => {
                localStorage.setItem('contratos_afiliado', JSON.stringify(contratos));
              });
              this.router.navigate(['admin/dashboard/afiliado-beneficiarios']);
            } else if (tokenPayload.user.tipoUsuario === "AfiliadoTitular") {
              this.adminService.obtenerContratos().subscribe(async (contratos: string) => {
                localStorage.setItem('contratos_afiliado', JSON.stringify(contratos));
              });
              this.router.navigate(['admin/dashboard/afiliado-titular']);
            } else if (tokenPayload.user.tipoUsuario === "Broker") {
              this.router.navigate(['admin/dashboard/brokers']);
            } else if (this.adminService.tieneRol()) {
              this.router.navigate(['admin/dashboard/resumen']);
            } else {
              this.router.navigate(['admin/dashboard/sinrol']);
            }
          }
        }))
      } else if (data.apiStatus === "error" && data.loginStatus === "logout") {
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
        this.toastr.error(data.apiResponseMessage, "Login", {
          progressBar: true
        })
      }
    })
  }
}
