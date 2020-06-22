import { createSelector } from 'reselect';
import { RootState } from '../reducers';

const userState = (state: RootState) => state.user;

export const userInfoSelector = createSelector(
  userState,
  (userState) => userState.userInfo
)

export const userBalanceSelector = createSelector(
  userInfoSelector,
  (userInfo) => userInfo?.balance
)

export const usersListSelector = createSelector(
  userState,
  (state) => state.users
)

export const isLoadingUsersListSelector = createSelector(
  userState,
  (state) => state.isLoadingUsersList
)