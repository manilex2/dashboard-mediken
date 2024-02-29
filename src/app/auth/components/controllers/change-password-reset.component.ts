import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/AppState';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { setAPIStatus } from 'src/app/shared/store/actions/app.actions';
import { changePassword } from '../../store/selectors/change-password.selectors';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models';
import decode from 'jwt-decode';
import { AdminService } from 'src/app/admin/services/admin.service';
import { CHANGE_PASSWORD } from '../../store/actions/change-password.actions';
import { LOGIN } from '../../store/actions/login.actions';
import { user } from '../../store/selectors/login.selectors';

@Component({
  selector: 'app-change-password-reset',
  templateUrl: '../views/change-password-reset.component.html',
  styleUrls: ['../styles/change-password-reset.component.scss']
})
export class ChangePasswordResetComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}
  hide = true;
  token = localStorage.getItem("auth_token");
  tokenChange: string = "";
  email: string = "";
  usuario: string = "";

  ngOnInit() {
    if(this.token) {
      this.router.navigate(["admin/dashboard/resumen"]);
    }
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
      this.tokenChange = params['token'];
      this.usuario = params['usuario'];
    })
  }

  changePasswordResetForm = this.fb.group<User>({
    usuario: [''],
    email: [''],
    clave: [''],
    nuevaClave: ['', [Validators.required, Validators.minLength(8)]],
    confirmarClave: ['', [Validators.required, Validators.minLength(8)]],
    token: [''],
  })

  changePasswordReset() {
    if (this.changePasswordResetForm.value.nuevaClave === this.changePasswordResetForm.value.confirmarClave) {
      this.changePasswordResetForm.patchValue({token: this.tokenChange, email: this.email, clave: this.changePasswordResetForm.value.nuevaClave, usuario: this.usuario});
      this.store.dispatch(CHANGE_PASSWORD({ user: this.changePasswordResetForm.value }));
      let apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((data) => {
        if (data.apiStatus === "success" && data.changePasswordStatus === "change") {
          this.appStore.dispatch(setAPIStatus({
            apiStatus: {
              apiCodeStatus: 200,
              apiResponseMessage: '',
              apiStatus: '',
              changePasswordStatus: 'changed'
            }}))
          this.toastr.success("Contraseña cambiada con exito.", "Cambiar Contraseña", {
            progressBar: true
          })
          this.store.pipe(select(changePassword)).subscribe((data => {
            for (let i = 0; i < data.length; i++) {
              this.login();
            }
          }))
        } else if (data.apiStatus === "error" && data.changePasswordStatus === "") {
          this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
          this.toastr.error(data.apiResponseMessage, "Cambiar Contraseña", {
            progressBar: true
          })
          this.router.navigate(['auth/login']);
        }
      })   
    } else {
      this.toastr.error("La contraseña y la confirmación no coinciden, por favor revise.", "Cambiar Contraseña", {
        progressBar: true
      })
    }
  }

  login() {
    this.store.dispatch(LOGIN({ user: this.changePasswordResetForm.value }));
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
        this.store.pipe(select(user)).subscribe((data => {
          for (let i = 0; i < data.length; i++) {
            const token = data[i].token;
            localStorage.setItem('auth_token', token);
            let saveToken = localStorage.getItem("auth_token");
            let tokenPayload: any = saveToken? decode(saveToken) : "";
            console.log(tokenPayload);
            if (tokenPayload.user.tipoUsuario === "Beneficiario") {
              this.router.navigate(['admin/dashboard/beneficiario']);
            } else if (tokenPayload.user.tipoUsuario === "AfiliadoTitular") {
              this.router.navigate(['admin/dashboard/afiliadoTitular']);
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