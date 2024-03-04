import { createReducer, on } from "@ngrx/store";
import { ProfileImg } from "../../models";
import { PROFILE_IMG_SUCCESS, PROFILE_IMG_UPDATE_SUCCESS, RESET_PROFILE_IMG } from "../actions/profile-image.actions";

export const profileImageFeatureKey = "profileImageState";

export const initialprofileImageState: ProfileImg = {};

export const profileImageReducer = createReducer(
  initialprofileImageState,
on(PROFILE_IMG_SUCCESS, (state, { img }) => {
  return img;
}),
on(PROFILE_IMG_UPDATE_SUCCESS, (state, { img }) => {
  let newState = {...state};
  newState = img;
  return newState;
}),
on(RESET_PROFILE_IMG, (state, ) => {
  let newState = {...state}
  newState = {};
  return newState;
})
);

