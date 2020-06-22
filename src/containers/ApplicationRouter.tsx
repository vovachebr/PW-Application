import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { LoginPage, HomePage } from '../pages';
import { removeApplicationMessage } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { applicationMessageSelector } from '../redux/selectors';

type ApplicationRouterType = {
  message?: {value: string, type: string};
  removeApplicationMessage: () => void;
  enqueueSnackbar: any;
}

function ApplicationRouter({
  enqueueSnackbar,
  message,
  removeApplicationMessage
}: ApplicationRouterType) {
  const logged = !!localStorage.getItem("token");
  if(message){
    setTimeout(() => {
      enqueueSnackbar(message.value, {variant: message.type})
      removeApplicationMessage();
    }, 0);
  }
  
  return (
    <BrowserRouter>
      <Switch>
        {!logged && <>
          <Route path="/login" component={LoginPage}/>
          <Redirect to="/login"/>
        </>}
        {logged && <>
          <Route path="/home" component={HomePage} exact/>
          <Redirect to="/home"/>
        </>}
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: RootState) => ({
  message: applicationMessageSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  removeApplicationMessage: () => dispatch(removeApplicationMessage())
});

export const ApplicationRouterContainer = withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)
  (ApplicationRouter)
);
