import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';

import { RegistrationForm, LoginForm } from '../../containers';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '5%',
  }
});

export function LoginPage() {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState("registration");

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={(event, value) => setTabValue(value)}
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab label="Sign in" value="authorization" />
          <Tab label="Sign up" value="registration" />
        </Tabs>
      </AppBar>
      <div className={classes.form}>
      {tabValue === "authorization" && <LoginForm />}
      {tabValue === "registration" && <RegistrationForm />}
      </div>
    </>
  );
}
