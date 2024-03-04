import { createAction, props } from '@ngrx/store';
import { User } from "../../components/models/Users";
import { ResponseRequest } from 'src/app/responseRequest.model';

export const CHANGE_PASSWORD = createAction(
  '[CHANGE PASSWORD] Cambiar Contraseña',
  props<{ user: User }>()
);

export const CHANGE_PASSWORD_SUCCESS = createAction(
  '[CHANGE PASSWORD] Cambiar Contraseña',
  props<{ response: ResponseRequest }>()
);

export const RESET_CHANGE_PASSWORD = createAction(
  '[CHANGE PASSWORD] Reiniciar Cambiar Contraseña Reset'
);

export const CHANGE_PASSWORD_RESET = createAction(
  '[CHANGE PASSWORD RESET] Cambiar Contraseña Reset',
  props<{ user: User }>()
);

export const CHANGE_PASSWORD_RESET_SUCCESS = createAction(
  '[CHANGE PASSWORD RESET] Cambio de contraseña Reset Exito',
  props<{ response: ResponseRequest }>()
);

export const RESET_CHANGE_PASSWORD_RESET = createAction(
  '[CHANGE PASSWORD RESET] Reiniciar Cambiar Contraseña Reset'
);