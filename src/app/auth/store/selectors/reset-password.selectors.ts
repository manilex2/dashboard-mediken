import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../components/models/Users';
import { resetPasswordFeatureKey } from '../reducers/reset-password.reducers';

export const selectResetPassword = createFeatureSelector<User[]>(resetPasswordFeatureKey);

export const resetPassword = createSelector(
    selectResetPassword,
  (selectResetPassword) => selectResetPassword
)
