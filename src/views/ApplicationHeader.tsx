import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.svg';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#282c34',
    minHeight: '5vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(5px + 2vmin)',
    color: 'white',
  },
  logo: {
    height: '5vh',
  }
});

export function ApplicationHeader() {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <img src={logo} className={classes.logo} alt="logo" />
      <p>PW Application</p>
      <img src={logo} className={classes.logo} alt="logo" />
    </header>
  );
}
