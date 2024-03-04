import { createAction, props } from '@ngrx/store';
import { User } from "../../components/models/Users";
import { ResponseRequest } from 'src/app/responseRequest.model';

export const RESET_PASSWORD = createAction(
  '[RESET PASSWORD] Reiniciar Contraseña',
  props<{ user: User }>()
);

export const RESET_PASSWORD_SUCCESS = createAction(
  '[RESET PASSWORD] Reinicio de contraseña Exito',
  props<{ reset: ResponseRequest }>()
);

export const RESET_RESET_PASSWORD = createAction(
  '[RESET PASSWORD] Reiniciar Reseteo Contraseña'
);