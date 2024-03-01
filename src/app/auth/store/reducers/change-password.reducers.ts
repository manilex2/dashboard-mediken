import { createReducer, on } from "@ngrx/store";
import { User } from "../../components/models/Users";
import { CHANGE_PASSWORD_SUCCESS, RESET_CHANGE_PASSWORD } from "../actions/change-password.actions";

export const changePasswordFeatureKey = "changePasswordState";

export const initialChangePasswordState: User[] = [];

export const changePasswordReducer = createReducer(
    initialChangePasswordState,
  on(CHANGE_PASSWORD_SUCCESS, (state, { users }) => {
    return users;
  }),
  on(RESET_CHANGE_PASSWORD, (state, ) => {
    let newState = [...state]
    newState.length = 0;
    return newState;
  })
);
