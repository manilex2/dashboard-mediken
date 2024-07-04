import { createReducer, on } from "@ngrx/store";
import { Appstate } from "../AppState";
import { RESET_API_STATUS, SET_API_STATUS } from "../actions/app.actions";

export const initialAppState: Readonly<Appstate> = {
  apiStatus: '',
  apiResponseMessage: '',
  apiCodeStatus: 200,
  loginStatus: "logout",
  userState: "",
  resetPasswordStatus: "",
  changePasswordStatus: "",
  profileImageStatus: "",
  firstLoginStatus: ""
}

export const appReducer = createReducer(
  initialAppState,
  on(SET_API_STATUS, (state, { apiStatus }) => {
    return {
      ...state,
      ...apiStatus
    };
  }),
  on(RESET_API_STATUS, (state) => initialAppState)
)
