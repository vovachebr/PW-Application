import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { RegistrationForm as RegistrationFormView } from '../../views';
import { registerUserFetch } from '../../redux/actions';
import { UserRegister } from '../../types';

type RegistrationFormType = {
  register: (userData: any) => void;
  enqueueSnackbar: any
}

function RegistrationFormContainer({enqueueSnackbar, register}: RegistrationFormType) {
  const validateData = (login: string, email: string, password: string, confirm: string): boolean => {
    let hasError = false;
    if(password !== confirm){
      hasError = true;
      enqueueSnackbar("Passwords must be same", {variant: "error"});
    }
    if(password === ""){
      hasError = true;
      enqueueSnackbar("Passwords can't be empty", {variant: "error"});
    }
    if(!/\S+@\S+\.\S+/.test(email)){
      hasError = true;
      enqueueSnackbar("Email must be valid", {variant: "error"});
    }
    if(!login){
      hasError = true;
      enqueueSnackbar("Login can't be empty", {variant: "error"});
    }
    return hasError;
  };

  const submitForm = (login: string, email: string, password: string, confirm: string) => {
    const hasError = validateData(login, email, password, confirm);
    if(hasError){
      return;
    }

    register({username: login, email, password});
  }

  return <RegistrationFormView onSubmit={submitForm}/>;
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  register: (userData: UserRegister) => dispatch(registerUserFetch(userData))
});

export const RegistrationForm = withSnackbar(
  connect(null, mapDispatchToProps)
  (RegistrationFormContainer)
);
