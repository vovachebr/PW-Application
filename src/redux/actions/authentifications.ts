import { Dispatch } from 'react';
import { createAction } from 'redux-actions';
import { Actions, UserRegister, UserLogin } from '../../types';
export const applicationHttpError = createAction<{value: string, type: string}>(Actions.APPLICATION_HTTP_MESSAGE);
export const removeApplicationMessage = createAction(Actions.REMOVE_APPLICATION_MESSAGE);

export const registerUserFetch = (user: UserRegister) => {
  return (dispatch: Dispatch<any>) => {
    autorizeUser('/users', user, dispatch);
  }
}

export const loginUserFetch = (user: UserLogin) => {
  return (dispatch: Dispatch<any>) => {
    autorizeUser('/sessions/create', user, dispatch);
  }
}

const autorizeUser = async (url: string, user: UserRegister | UserLogin, dispatch: Dispatch<any>) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(user)
  });
  if(response.ok){
    const result = await response.json();
    if (result.id_token) {
      localStorage.setItem("token", result.id_token);
      window.location.reload();
    }
  }else{
    const result = await response.text();
    dispatch(applicationHttpError({value: result, type: "error"}));
  }
}