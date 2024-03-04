import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../components/models/Users';
import { changePasswordFeatureKey, changePasswordResetFeatureKey } from '../reducers/change-password.reducers';
import { ResponseRequest } from 'src/app/responseRequest.model';

export const selectChangePasswordReset = createFeatureSelector<ResponseRequest>(changePasswordResetFeatureKey);

export const selectChangePassword = createFeatureSelector<ResponseRequest>(changePasswordFeatureKey);

export const changePasswordReset = createSelector(
    selectChangePasswordReset,
  (selectChangePasswordReset) => selectChangePasswordReset
)

export const changePassword = createSelector(
    selectChangePassword,
  (selectChangePassword) => selectChangePassword
)