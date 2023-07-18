import { createAction, props } from '@ngrx/store';
import { CurrentUser } from "../../models";

export const GET_CURRENT_USER = createAction('[GET USER] Init');

export const GET_CURRENT_USER_SUCCESS = createAction(
  '[GET USER] Usuario Actual Exito',
  props<{ currentUser: CurrentUser }>()
);

export const RESET_CURRENT_USER = createAction(
  '[RESET USER] Usuario Actual Reiniciado',
);
