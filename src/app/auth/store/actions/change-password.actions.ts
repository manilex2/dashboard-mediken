import { createAction, props } from '@ngrx/store';
import { User } from "../../components/models";

export const CHANGE_PASSWORD = createAction(
  '[CHANGE PASSWORD] Cambiar Contraseña',
  props<{ user: User }>()
);

export const CHANGE_PASSWORD_SUCCESS = createAction(
  '[CHANGE PASSWORD] Cambio de contraseña Exito',
  props<{ users: User[] }>()
);

export const RESET_CHANGE_PASSWORD = createAction(
  '[RESET LOGIN] Reiniciar Cambiar Contraseña'
);