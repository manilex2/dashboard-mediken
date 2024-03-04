import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/components/models';

export const FIRST_LOGIN = createAction(
  '[FIRST LOGIN] Actualizar First Login',
  props<{ user: User }>()
);

export const FIRST_LOGIN_SUCCESS = createAction(
  '[FIRST LOGIN] First Login Actualizado con Éxito',
  props<{ user: User }>()
);

export const RESET_FIRST_LOGIN = createAction(
  '[FIRST LOGIN] Reiniciar First Login'
);