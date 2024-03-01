import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/AppState';
import { RESET_PASSWORD } from '../../store/actions/reset-password.actions';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { setAPIStatus } from 'src/app/shared/store/actions/app.actions';
import { resetPassword } from '../../store/selectors/reset-password.selectors';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models';

@Component({
  selector: 'app-reset-password',
  templateUrl: '../views/reset-password.component.html',
  styleUrls: ['../styles/reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private toastr: ToastrService
  ) {}
  hide = true;
  token = localStorage.getItem("auth_token");
  resetError = false;

  ngOnInit() {
    if(this.token) {
      this.router.navigate(["admin/dashboard/resumen"]);
    }
  }

  resetPasswordForm = this.fb.group<User>({
    email: ['', [Validators.required, Validators.minLength(1)]],
  });

  resetPassword() {
    this.store.dispatch(RESET_PASSWORD({ user: this.resetPasswordForm.value }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((data) => {
      if (data.apiStatus === "success" && data.resetPasswordStatus === "reset") {
        this.appStore.dispatch(setAPIStatus({
          apiStatus: {
            apiCodeStatus: 200,
            apiResponseMessage: '',
            apiStatus: '',
            resetPasswordStatus: 'reseted'
          }}))
        this.toastr.success(`Correo electrónico enviado con exito a la dirección de correo: ${this.resetPasswordForm.value.email}`, "Reestablecer Contraseña", {
          progressBar: true
        })
        this.store.pipe(select(resetPassword)).subscribe((data => {
          for (let i = 0; i < data.length; i++) {
            this.router.navigate(['auth/login']);
          }
        }))
      } else if (data.apiStatus === "error" && data.changePasswordStatus === "") {
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
        this.toastr.error(data.apiResponseMessage, "Reestablecer Contraseña", {
          progressBar: true
        })
        this.resetError = true;
      }
    })
  }
}
