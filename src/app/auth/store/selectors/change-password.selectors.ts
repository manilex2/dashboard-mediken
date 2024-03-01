import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../components/models/Users';
import { changePasswordFeatureKey } from '../reducers/change-password.reducers';

export const selectChangePassword = createFeatureSelector<User[]>(changePasswordFeatureKey);

export const changePassword = createSelector(
    selectChangePassword,
  (selectChangePassword) => selectChangePassword
)
