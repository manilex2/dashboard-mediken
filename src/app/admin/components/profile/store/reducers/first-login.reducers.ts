import { createReducer, on } from "@ngrx/store";
import { ProfileImg } from "../../models";
import { FIRST_LOGIN_SUCCESS, RESET_FIRST_LOGIN } from "../actions/first-login.actions";

export const firstLoginFeatureKey = "firstLoginState";

export const initialfirstLoginState: ProfileImg = {};

export const firstLoginReducer = createReducer(
  initialfirstLoginState,
  on(FIRST_LOGIN_SUCCESS, (state, { user }) => {
    return user;
  }),
  on(RESET_FIRST_LOGIN, (state) => initialfirstLoginState)
);

