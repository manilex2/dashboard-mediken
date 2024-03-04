import { createReducer, on } from "@ngrx/store";
import { User } from "../../components/models/Users";
import { CHANGE_PASSWORD_RESET_SUCCESS, CHANGE_PASSWORD_SUCCESS, RESET_CHANGE_PASSWORD, RESET_CHANGE_PASSWORD_RESET } from "../actions/change-password.actions";
import { ResponseRequest } from "src/app/responseRequest.model";

export const changePasswordResetFeatureKey = "changePasswordResetState";
export const changePasswordFeatureKey = "changePasswordState";

export const initialChangePasswordResetState: ResponseRequest = {};
export const initialChangePasswordState: ResponseRequest = {};

export const changePasswordResetReducer = createReducer(
    initialChangePasswordResetState,
  on(CHANGE_PASSWORD_RESET_SUCCESS, (state, { response }) => {
    return response;
  }),
  on(RESET_CHANGE_PASSWORD_RESET, (state, ) => {
    let newState = {...state}
    newState = {};
    return newState;
  })
);

export const changePasswordReducer = createReducer(
    initialChangePasswordState,
  on(CHANGE_PASSWORD_SUCCESS, (state, { response }) => {
    return response;
  }),
  on(RESET_CHANGE_PASSWORD, (state, ) => {
    let newState = {...state}
    newState = {};
    return newState;
  })
);

