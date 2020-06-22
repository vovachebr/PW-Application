import { Dispatch } from 'react';
import { createAction } from 'redux-actions';
import { UserInfo, Actions } from '../../types';
import { applicationHttpError } from '.';

export const userInfo = createAction<UserInfo>(Actions.SET_USER_INFO);
export const loadingUsers = createAction<boolean>(Actions.LOADING_USERS);
export const loadedUsers = createAction<Array<{id: number, name: string}>>(Actions.LOADED_USERS);

export const userInfoFetch = () => {
  return async (dispatch: Dispatch<any>) => {
    const response = await fetch('/api/protected/user-info', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if(response.ok){
      const result = await response.json();
      dispatch(userInfo(result.user_info_token));
    }else{
      const result = await response.text();
      if(result.includes('jwt expired')){
        localStorage.removeItem("token");
        window.location.reload();
      }
      dispatch(applicationHttpError({value: result, type: "error"}));
    }
  }
}

export const userListFetch = (filter = '') => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(loadingUsers(true));
    const response = await fetch('/api/protected/users/list', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({filter})
    });
    if(response.ok){
      const result = await response.json();
      dispatch(loadedUsers(result));
    }else{
      const result = await response.text();
      dispatch(applicationHttpError({value: result, type: "error"}));
    }
    dispatch(loadingUsers(false));
  }
}
