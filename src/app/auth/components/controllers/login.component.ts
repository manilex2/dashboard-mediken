import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/AppState';
import { LOGIN } from '../../store/actions/login.actions';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { SET_API_STATUS } from 'src/app/shared/store/actions/app.actions';
import { user } from '../../store/selectors/login.selectors';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models';
import { jwtDecode } from 'jwt-decode';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
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
        this.appStore.dispatch(SET_API_STATUS({
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
            this.spinner.show("login");
            const token = data[i].token;
            localStorage.setItem('auth_token', token);
            let saveToken = localStorage.getItem("auth_token");
            let tokenPayload: any = saveToken? jwtDecode(saveToken) : "";
            if (tokenPayload.user.firstLogin === true) {
              setTimeout(() => {
                this.spinner.hide("login");
                this.router.navigate(['admin/profile/first-login']);
              }, 5000);
            } else if (tokenPayload.user.tipoUsuario === "Beneficiario") {
              this.adminService.obtenerContratos().subscribe(async (contratos: string) => {
                localStorage.setItem('contratos_afiliado', JSON.stringify(contratos));
              });
              setTimeout(() => {
                this.spinner.hide("login");
                this.router.navigate(['admin/dashboard/afiliado-beneficiarios']);
              }, 5000);
            } else if (tokenPayload.user.tipoUsuario === "AfiliadoTitular") {
              this.adminService.obtenerContratos().subscribe(async (contratos: string) => {
                localStorage.setItem('contratos_afiliado', JSON.stringify(contratos));
              });
              setTimeout(() => {
                this.spinner.hide("login");
                this.router.navigate(['admin/dashboard/afiliado-titular']);
              }, 5000);
            } else if (tokenPayload.user.tipoUsuario === "Broker") {
              setTimeout(() => {
                this.spinner.hide("login");
                this.router.navigate(['admin/dashboard/brokers']);
              }, 5000);
            } else if (this.adminService.tieneRol()) {
              setTimeout(() => {
                this.spinner.hide("login");
                this.router.navigate(['admin/dashboard/resumen']);
              }, 5000);
            } else {
              setTimeout(() => {
                this.spinner.hide("login");
                this.router.navigate(['admin/dashboard/sinrol']);
              }, 5000);
            }
          }
        }))
      } else if (data.apiStatus === "error" && data.loginStatus === "logout") {
        this.appStore.dispatch(SET_API_STATUS({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
        this.toastr.error(data.apiResponseMessage, "Login", {
          progressBar: true
        })
      }
    })
  }
}
