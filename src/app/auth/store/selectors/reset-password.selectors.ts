import { createFeatureSelector, createSelector } from '@ngrx/store';
import { resetPasswordFeatureKey } from '../reducers/reset-password.reducers';
import { ResponseRequest } from 'src/app/responseRequest.model';

export const selectResetPassword = createFeatureSelector<ResponseRequest>(resetPasswordFeatureKey);

export const resetPassword = createSelector(
    selectResetPassword,
  (selectResetPassword) => selectResetPassword
)
