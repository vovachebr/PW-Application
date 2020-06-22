import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { LoginForm as LoginFormView } from '../../views';
import { loginUserFetch } from '../../redux/actions';
import { UserLogin } from '../../types';

type LoginFormType = {
  login: (userData: any) => void;
  enqueueSnackbar: any
}

function LoginFormContainer({enqueueSnackbar, login}: LoginFormType) {
  const submitForm = (email: string, password: string) => {
    const validateData = (email: string, password: string): boolean => {
      let hasError = false;
      if(password === ""){
        hasError = true;
        enqueueSnackbar("Passwords can't be empty", {variant: "error"});
      }
      if(!/\S+@\S+\.\S+/.test(email)){
        hasError = true;
        enqueueSnackbar("Email must be valid", {variant: "error"});
      }
      return hasError;
    };

    const hasError = validateData(email, password);
    if(hasError){
      return;
    }

    login({email, password});
  }
  
  return <LoginFormView onSubmit={submitForm}/>
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  login: (userData: UserLogin) => dispatch(loginUserFetch(userData))
});

export const LoginForm = withSnackbar(
  connect(null, mapDispatchToProps)
  (LoginFormContainer)
);