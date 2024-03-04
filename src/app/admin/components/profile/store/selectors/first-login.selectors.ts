import { createFeatureSelector, createSelector } from '@ngrx/store';
import { firstLoginFeatureKey } from '../reducers/first-login.reducers';
import { User } from 'src/app/auth/components/models';

export const selectFirstLogin = createFeatureSelector<User>(firstLoginFeatureKey);

export const firstLogin = createSelector(
    selectFirstLogin,
  (selectFirstLogin) => selectFirstLogin
)