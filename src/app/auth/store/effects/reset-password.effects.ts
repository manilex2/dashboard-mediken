import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from "@ngrx/store";
import { catchError, map, concatMap, withLatestFrom } from 'rxjs';
import { Appstate } from "../../../shared/store/AppState";
import { AuthService } from '../../services/auth.service';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS
} from '../actions/reset-password.actions';
import { setAPIStatus } from "../../../shared/store/actions/app.actions";
import { selectResetPassword } from "../selectors/reset-password.selectors";


@Injectable()
export class ResetPasswordEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private appStore: Store<Appstate>,
    private store: Store,
  ) {}

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RESET_PASSWORD),
      withLatestFrom(this.store.pipe(select(selectResetPassword))),
      concatMap(([action, resetPasswordFromStore]) => {
        if (resetPasswordFromStore.length > 0) {
          this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: '', apiCodeStatus: 200, resetPasswordStatus: 'reseted'}}))
        }
        return this.authService.resetPassword(action.user).pipe(
          map(users => {
            this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success', apiCodeStatus: 200, resetPasswordStatus: 'reset'}}))
            return RESET_PASSWORD_SUCCESS({ users })
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
}
