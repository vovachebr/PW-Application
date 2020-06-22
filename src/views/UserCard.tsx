import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    width: '30%',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    boxSizing: 'border-box',
  }
});

type ICard = {
  userInfo: {
    id: number;
    name: string;
    email: string;
    balance: number;
  };
}

export function UserCard({userInfo}: ICard) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.body}>
        <Typography color="textSecondary" gutterBottom>
          {`id: ${userInfo.id}`}
        </Typography>
        <Typography variant="h5">
          {`Name: ${userInfo.name}`}
        </Typography>
        <Typography color="textSecondary">
          {`Email: ${userInfo.email}`}
        </Typography>
        <Typography component="span">
          {`Balance: ${userInfo.balance}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
