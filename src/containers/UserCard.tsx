import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { UserCard as UserCardView } from '../views';
import { userInfoFetch } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { userInfoSelector } from '../redux/selectors';

type UserCardType = {
  userInfoFetch: () => void;
  userInfo?: {
    id: number;
    name: string;
    email: string;
    balance: number;
  };
}

export function UserCardContainer({userInfoFetch, userInfo}: UserCardType) {
  if(!userInfo){
    userInfoFetch();
    return <CircularProgress />;
  }

  return <UserCardView userInfo={userInfo}/>
}

const mapStateToProps = (state: RootState) => ({
  userInfo: userInfoSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  userInfoFetch: () => dispatch(userInfoFetch())
});

export const UserCard = 
  connect(mapStateToProps, mapDispatchToProps)
  (UserCardContainer);
