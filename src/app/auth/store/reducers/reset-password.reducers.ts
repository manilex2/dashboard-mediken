import { createReducer, on } from "@ngrx/store";
import { User } from "../../components/models";
import { RESET_PASSWORD_SUCCESS, RESET_RESET_PASSWORD } from "../actions/reset-password.actions";

export const resetPasswordFeatureKey = "resetPasswordState";

export const initialResetPasswordState: User[] = [];

export const resetPasswordReducer = createReducer(
  initialResetPasswordState,
  on(RESET_PASSWORD_SUCCESS, (state, { users }) => {
    return users;
  }),
  on(RESET_RESET_PASSWORD, (state, ) => {
    let newState = [...state]
    newState.length = 0;
    return newState;
  })
);
