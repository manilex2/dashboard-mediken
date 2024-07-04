import { createReducer, on } from "@ngrx/store";
import { User } from "../../components/models/Users";
import { RESET_PASSWORD_SUCCESS, RESET_RESET_PASSWORD } from "../actions/reset-password.actions";
import { ResponseRequest } from "src/app/responseRequest.model";

export const resetPasswordFeatureKey = "resetPasswordState";

export const initialResetPasswordState: ResponseRequest = {};

export const resetPasswordReducer = createReducer(
  initialResetPasswordState,
  on(RESET_PASSWORD_SUCCESS, (state, { reset }) => {
    return reset;
  }),
  on(RESET_RESET_PASSWORD, (state) => initialResetPasswordState)
);
