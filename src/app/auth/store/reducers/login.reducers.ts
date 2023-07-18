import { createReducer, on } from "@ngrx/store";
import { User } from "../../components/models";
import { LOGIN_SUCCESS, LOGOUT, RESET_LOGIN } from "../actions/login.actions";

export const loginFeatureKey = "loginState";

export const initialLoginState: User[] = [];

export const loginReducer = createReducer(
  initialLoginState,
  on(LOGIN_SUCCESS, (state, { users }) => {
    return users;
  }),
  on(LOGOUT, (state) => {
    return state;
  }),
  on(RESET_LOGIN, (state, ) => {
    let newState = [...state]
    newState.length = 0;
    return newState;
  })
);
