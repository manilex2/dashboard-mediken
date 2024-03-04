import { createAction, props } from '@ngrx/store';
import { ProfileImg } from '../../models';
import { User } from 'src/app/auth/components/models';

export const PROFILE_IMG = createAction(
  '[PROFILE IMAGE] Obtener imágen de perfil',
  props<{ user: User }>()
);

export const PROFILE_IMG_SUCCESS = createAction(
  '[PROFILE IMAGE] Imágen de Perfil Obtenida',
  props<{ img: ProfileImg }>()
);

export const PROFILE_IMG_UPDATE = createAction(
  '[PROFILE IMAGE UPDATE] Actualizar Imágen de Perfil',
  props<{ user: User }>()
);

export const PROFILE_IMG_UPDATE_SUCCESS = createAction(
  '[PROFILE IMAGE UPDATE] Actualización de Imágen de Perfil Exito',
  props<{ img: ProfileImg }>()
);

export const RESET_PROFILE_IMG = createAction(
  '[PROFILE IMAGE] Reiniciar Imágen de Perfil'
);