import { createReducer, on } from "@ngrx/store";
import { CurrentUser } from "../../models";
import { GET_CURRENT_USER_SUCCESS, RESET_CURRENT_USER } from "../actions/currentuser.actions";

export const currentUserFeatureKey = "currentUserState";

const initialCurrentState: CurrentUser = {
  nombres: "",
  apellidos: "",
  email: ""
};

export const currentUserReducer = createReducer(
  initialCurrentState,
  on(GET_CURRENT_USER_SUCCESS, (state, {currentUser}) => {
    return currentUser;
  }),
  on(RESET_CURRENT_USER, (state) => initialCurrentState)
)

/* export function reducer(state: CurrentUserState | undefined, action: Action) {
  return currentUserReducer(state, action);
}
 */
