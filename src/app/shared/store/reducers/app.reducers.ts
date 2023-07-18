import { createReducer, on } from "@ngrx/store";
import { Appstate } from "../AppState";
import { setAPIStatus } from "../actions/app.actions";

export const initialAppState: Readonly<Appstate> = {
  apiStatus: '',
  apiResponseMessage: '',
  apiCodeStatus: 200,
  loginStatus: "logout",
  userState: "",
}

export const appReducer = createReducer(
  initialAppState,
  on(setAPIStatus, (state, { apiStatus }) => {
    return {
      ...state,
      ...apiStatus
    };
  })
)
