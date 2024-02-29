import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from "@ngrx/store";
import { catchError, map, concatMap, withLatestFrom } from 'rxjs';
import { Appstate } from "../../../shared/store/AppState";
import { AuthService } from '../../services/auth.service';
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS
} from '../actions/change-password.actions';
import { setAPIStatus } from "../../../shared/store/actions/app.actions";
import { selectChangePassword } from "../selectors/change-password.selectors";


@Injectable()
export class ChangePasswordEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private appStore: Store<Appstate>,
    private store: Store,
  ) {}

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CHANGE_PASSWORD),
      withLatestFrom(this.store.pipe(select(selectChangePassword))),
      concatMap(([action, changePasswordFromStore]) => {
        if (changePasswordFromStore.length > 0) {
            this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: '', apiCodeStatus: 200, changePasswordStatus: 'changed'}}))
        }
        return this.authService.changePasswordReset(action.user).pipe(
          map(users => {
            this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success', apiCodeStatus: 200, changePasswordStatus: 'change'}}))
            return CHANGE_PASSWORD_SUCCESS({ users })
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
