import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles({
  form: {
    width: '50%'
  },
  field: {
    marginBottom: '15px'
  }
});

type IForm = {
  onSubmit: (login: string, email: string, password: string, confirm: string) => void;
}

export function RegistrationForm({onSubmit}: IForm) {
  const classes = useStyles();

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <FormControl className={classes.form}>
        <TextField
          className={classes.field}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          label="Login" 
          variant="outlined"
        />
        <TextField
          className={classes.field}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          type="email" 
          variant="outlined"
        />
        <TextField
          className={classes.field}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password" 
          variant="outlined"
        />
        <TextField
          className={classes.field}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm password"
          type="password" 
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmit(login, email, password, confirmPassword)}
        >
          sing up
        </Button>
      </FormControl>
    </>
  );
}
