import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileImg } from '../../models';
import { profileImageFeatureKey } from '../reducers/profile-image.reducers';

export const selectProfileImage = createFeatureSelector<ProfileImg>(profileImageFeatureKey);

export const profileImage = createSelector(
    selectProfileImage,
  (selectProfileImage) => selectProfileImage
)