import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from "@ngrx/store";
import { catchError, map, concatMap, withLatestFrom, switchMap, of } from 'rxjs';
import { Appstate } from "../../../../../shared/store/AppState";
import { AdminService } from '../../../../services/admin.service';
import {
  PROFILE_IMG,
  PROFILE_IMG_SUCCESS,
  PROFILE_IMG_UPDATE,
  PROFILE_IMG_UPDATE_SUCCESS
} from '../actions/profile-image.actions';
import { SET_API_STATUS } from "../../../../../shared/store/actions/app.actions";
import { selectProfileImage } from "../selectors/profile-image.selectors";


@Injectable()
export class ProfileImageEffect {
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private appStore: Store<Appstate>,
    private store: Store,
  ) {}
  

  profileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PROFILE_IMG),
      withLatestFrom(this.store.pipe(select(selectProfileImage))),
      switchMap(([action, profileImageFromStore]) => {
        if (profileImageFromStore && Object.keys(profileImageFromStore).length > 0) {
          this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: '', apiStatus: '', apiCodeStatus: 200, profileImageStatus: 'getted'}}));
          return of(PROFILE_IMG_SUCCESS({ img: profileImageFromStore })); // Emit success action with existing image
        } else {
          return this.adminService.getProfileImage(action.user).pipe(
            map(img => {
              this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: '', apiStatus: 'success', apiCodeStatus: 200, profileImageStatus: 'get'}}))
              return PROFILE_IMG_SUCCESS({ img })
            }),
            catchError((error) => {
              if (error.statusText === "Unknown Error") {
                this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: "Ocurrió un error con el servidor, intente de nuevo, en caso de persistir, comuniquese con el personal de sistemas", apiStatus: 'error', apiCodeStatus: error.status}}))
                throw error;
              } else if (error.statusText === "Unauthorized") {
                this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: "Su token de sesión expiró o es inválido. Inicie nuevamente sesión.", apiStatus: 'error', apiCodeStatus: error.status}}))
                throw error;
              } else if (error.statusText === "Forbidden") {
                this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: error.error.message, apiStatus: 'error', apiCodeStatus: error.status}}))
                throw error;
              } else {
                this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: error.error.message, apiStatus: 'error', apiCodeStatus: error.status}}))
                throw error;
              }
            })
          )
        }
      })
    )
  );

  profileImageUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PROFILE_IMG_UPDATE),
      withLatestFrom(this.store.pipe(select(selectProfileImage))),
      concatMap(([action, profileImageUpdateFromStore]) => {
        if (profileImageUpdateFromStore && Object.keys(profileImageUpdateFromStore).length > 0) {
            this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: '', apiStatus: '', apiCodeStatus: 200, profileImageStatus: 'updated'}}))
        }
        return this.adminService.updateProfileImage(action.user).pipe(
          map(img => {
            this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: '', apiStatus: 'success', apiCodeStatus: 200, profileImageStatus: 'update'}}))
            return PROFILE_IMG_UPDATE_SUCCESS({ img })
          }),
          catchError((error) => {
            if (error.statusText === "Unknown Error") {
              this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: "Ocurrió un error con el servidor, intente de nuevo, en caso de persistir, comuniquese con el personal de sistemas", apiStatus: 'error', apiCodeStatus: error.status}}))
              throw error;
            } else if (error.statusText === "Unauthorized") {
              this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: "Su token de sesión expiró o es inválido. Inicie nuevamente sesión.", apiStatus: 'error', apiCodeStatus: error.status}}))
              throw error;
            } else if (error.statusText === "Forbidden") {
              this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: error.error.message, apiStatus: 'error', apiCodeStatus: error.status}}))
              throw error;
            } else {
              this.appStore.dispatch(SET_API_STATUS({apiStatus: {apiResponseMessage: error.error.message, apiStatus: 'error', apiCodeStatus: error.status}}))
              throw error;
            }
          })
        )
      }),
    )
  );
}