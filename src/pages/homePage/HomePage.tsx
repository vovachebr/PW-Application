import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserCard, LogoutButton, TransactionsTable, MoneyTransferForm } from '../../containers';

const useStyles = makeStyles({
  page: {
    margin: "20px 20px auto 20px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
});

export function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <div className={classes.card}>
        <UserCard />
        <MoneyTransferForm />
        <div>
          <LogoutButton />
        </div>
      </div>
      <TransactionsTable />
    </div>
  );
}
