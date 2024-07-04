import { createAction, props } from "@ngrx/store";
import { Appstate } from "../AppState";

export const SET_API_STATUS = createAction(
  '[API] exito o error estatus',
  props<{ apiStatus: Appstate }>()
);

export const RESET_API_STATUS = createAction(
  '[API] Resetear estatus'
);
