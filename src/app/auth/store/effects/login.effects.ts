import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from "@ngrx/store";
import { catchError, map, concatMap, tap, withLatestFrom } from 'rxjs';
import { Appstate } from "../../../shared/store/AppState";
import { AuthService } from '../../services/auth.service';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_LOGIN
} from '../actions/login.actions';
import { setAPIStatus } from "../../../shared/store/actions/app.actions";
import { Router } from "@angular/router";
import { selectUser, user } from "../selectors/login.selectors";
import { CurrentUser } from "../../../admin/models/CurrentUser";
import { RESET_CURRENT_USER } from "../../../admin/store/actions/currentuser.actions";
import { User } from "../../components/models/Users";
import { RESET_CHANGE_PASSWORD, RESET_CHANGE_PASSWORD_RESET } from "../actions/change-password.actions";
import { RESET_RESET_PASSWORD } from "../actions/reset-password.actions";
import { ResponseRequest } from "src/app/responseRequest.model";
import { ProfileImg } from "src/app/admin/components/profile/models";
import { RESET_PROFILE_IMG } from "src/app/admin/components/profile/store/actions/profile-image.actions";
import { RESET_FIRST_LOGIN } from "src/app/admin/components/profile/store/actions/first-login.actions";

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private appStore: Store<Appstate>,
    private router: Router,
    private store: Store,
    private currentUserStore: Store<CurrentUser>,
    private loginStore: Store<User[]>,
    private passwordStore: Store<ResponseRequest>,
    private profileImageStore: Store<ProfileImg>,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN),
      withLatestFrom(this.store.pipe(select(selectUser))),
      concatMap(([action, loginFromStore]) => {
        if (loginFromStore.length > 0) {
          this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: '', apiCodeStatus: 200, loginStatus: 'logged'}}))
        }
        return this.authService.login(action.user).pipe(
          map(users => {
            this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success', apiCodeStatus: 200, loginStatus: "login"}}));
            return LOGIN_SUCCESS({ users })
          }),
          catchError((error) => {
            if (error.statusText === "Unknown Error") {
              this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: "Ocurrió un error con el servidor, intente de nuevo, en caso de persistir, comuniquese con el personal de sistemas", apiStatus: 'error', apiCodeStatus: error.status}}))
              throw error;
            } else if (error.statusText === "Unauthorized") {
              this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: "Su token de sesión expiró o es inválido. Inicie nuevamente sesión.", apiStatus: 'error', apiCodeStatus: error.status}}))
              throw error;
            } else if (error.statusText === "Forbidden") {
              this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: error.error.message, apiStatus: 'error', apiCodeStatus: error.status}}))
              throw error;
            } else {
              this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: error.error.message, apiStatus: 'error', apiCodeStatus: error.status}}))
              throw error;
            }
          })
        )
      }),
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGOUT),
      tap(() => {
        this.currentUserStore.dispatch(RESET_CURRENT_USER());
        this.loginStore.dispatch(RESET_LOGIN());
        this.loginStore.dispatch(RESET_FIRST_LOGIN());
        this.passwordStore.dispatch(RESET_RESET_PASSWORD());
        this.passwordStore.dispatch(RESET_CHANGE_PASSWORD());
        this.passwordStore.dispatch(RESET_CHANGE_PASSWORD_RESET());
        this.profileImageStore.dispatch(RESET_PROFILE_IMG());
        this.appStore.dispatch(setAPIStatus({
          apiStatus: {
            apiCodeStatus: 200,
            apiResponseMessage: "",
            apiStatus: "",
            loginStatus: "logout",
            userState: "",
            changePasswordStatus: "",
            resetPasswordStatus: "",
            profileImageStatus: "",
            firstLoginStatus: ""
          }
        }));
        localStorage.removeItem('auth_token');
        localStorage.removeItem('powerbi_report_token');
        localStorage.removeItem('contratos_afiliado');
        localStorage.removeItem('changePasswordState');
        localStorage.removeItem('changePasswordResetState');
        localStorage.removeItem('resetPasswordState');
        localStorage.removeItem('loginState');
        localStorage.removeItem('profileImageState');
        localStorage.removeItem('currentUserState');
        localStorage.removeItem('appState');
        localStorage.removeItem('firstLoginState');
        this.router.navigate(['auth']);
      })
    ), {dispatch: false}
  )
}
