import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../components/models';
import { loginFeatureKey } from '../reducers/login.reducers';

export const selectUser = createFeatureSelector<User[]>(loginFeatureKey);

export const user = createSelector(
  selectUser,
  (selectUser) => selectUser
)
