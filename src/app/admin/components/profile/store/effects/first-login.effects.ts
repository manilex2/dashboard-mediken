import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from "@ngrx/store";
import { catchError, map, concatMap, withLatestFrom, switchMap, of } from 'rxjs';
import { Appstate } from "../../../../../shared/store/AppState";
import { AdminService } from '../../../../services/admin.service';
import {
  FIRST_LOGIN,
  FIRST_LOGIN_SUCCESS
} from '../actions/first-login.actions';
import { setAPIStatus } from "../../../../../shared/store/actions/app.actions";
import { selectFirstLogin } from "../selectors/first-login.selectors";


@Injectable()
export class FirstLoginEffect {
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private appStore: Store<Appstate>,
    private store: Store,
  ) {}

  profileImageUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FIRST_LOGIN),
      withLatestFrom(this.store.pipe(select(selectFirstLogin))),
      concatMap(([action, profileImageUpdateFromStore]) => {
        if (profileImageUpdateFromStore && Object.keys(profileImageUpdateFromStore).length > 0) {
            this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: '', apiCodeStatus: 200, firstLoginStatus: 'setted'}}))
        }
        return this.adminService.updateFirstLogin(action.user).pipe(
          map(user => {
            this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success', apiCodeStatus: 200, firstLoginStatus: 'set'}}))
            return FIRST_LOGIN_SUCCESS({ user })
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