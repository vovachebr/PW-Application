import React from 'react';
import { LogoutButton as LogoutButtonView} from '../views';

export function LogoutButton(props: any) {
  const logoutCallback = () => {
    //запроса на логаут нету, поэтому просто удаляем его из LS и обновляем страницу
    localStorage.removeItem("token");
    window.location.reload();
  }
  
  return <LogoutButtonView onClick={logoutCallback} />
}