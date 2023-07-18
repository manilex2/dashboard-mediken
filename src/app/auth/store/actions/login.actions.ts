import { createAction, props } from '@ngrx/store';
import { User } from "../../components/models";

export const LOGIN = createAction(
  '[LOGIN] Iniciar Sesion',
  props<{ user: User }>()
);

export const LOGIN_SUCCESS = createAction(
  '[LOGIN] Login Exito',
  props<{ users: User[] }>()
);

export const LOGOUT = createAction(
  '[LOGOUT] Cerrar Sesion'
);

export const RESET_LOGIN = createAction(
  '[RESET LOGIN] Reiniciar Login'
);
