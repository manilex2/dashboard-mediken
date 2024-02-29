import { createAction, props } from '@ngrx/store';
import { User } from "../../components/models";

export const RESET_PASSWORD = createAction(
  '[RESET PASSWORD] Reiniciar Contraseña',
  props<{ user: User }>()
);

export const RESET_PASSWORD_SUCCESS = createAction(
  '[RESET PASSWORD] Reinicio de contraseña Exito',
  props<{ users: User[] }>()
);

export const RESET_RESET_PASSWORD = createAction(
  '[RESET PASSWORD] Reiniciar Reseteo Contraseña'
);