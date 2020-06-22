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
  onSubmit: (email: string, password: string) => void;
}

export function LoginForm({onSubmit}: IForm) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <FormControl className={classes.form}>
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
        <Button variant="contained" color="primary" onClick={() => onSubmit(email, password)}>
          sing in
        </Button>
      </FormControl>
    </>
  );
}
