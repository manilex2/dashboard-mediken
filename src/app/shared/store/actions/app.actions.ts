import { createAction, props } from "@ngrx/store";
import { Appstate } from "../AppState";

export const setAPIStatus = createAction(
  '[API] exito o error estatus',
  props<{ apiStatus: Appstate }>()
);
