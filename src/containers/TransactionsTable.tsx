import React, { useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { TransactionsTable as TransactionsTableView } from '../views';
import { getTransactionFetch, commitTransactionFetch } from '../redux/actions';
import { TransactionType } from '../types';
import { RootState } from '../redux/reducers';
import { userBalanceSelector } from '../redux/selectors';
import { isLoadingTransactionsSelector, transactionsListSelector } from '../redux/selectors/transactions';

type TransactionsTableType = {
  isLoadingTransaction: boolean;
  userBalance?: number;
  transactionsList: Array<TransactionType>
  getTransaction: () => void;
  commitTransaction: (name: string, amount: number) => void;
  enqueueSnackbar: any;
}

function TransactionsTableContainer({
  isLoadingTransaction,
  getTransaction,
  userBalance,
  transactionsList,
  commitTransaction,
  enqueueSnackbar
}: TransactionsTableType) {

  useEffect(() => getTransaction(), [])

  const transferMoney = (transaction: TransactionType) => {
    const amount = Math.abs(transaction.amount);
    if(userBalance && userBalance < amount){
      enqueueSnackbar("Not enough money", {variant: "error"});
      return;
    }

    commitTransaction(transaction.username, amount);
  };

  const data = transactionsList.map(t => ({...t, date: t.date.split(',')[0], time: t.date.split(',')[1].trim()}));
  return <TransactionsTableView
    transactions={data}
    isBlockRepeat={isLoadingTransaction}
    onRepeat={transferMoney}
    />
}

const mapStateToProps = (state: RootState) => ({
  isLoadingTransaction: isLoadingTransactionsSelector(state),
  userBalance: userBalanceSelector(state),
  transactionsList: transactionsListSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getTransaction: () => dispatch(getTransactionFetch()),
  commitTransaction: (name: string, amount: number) => dispatch(commitTransactionFetch(name, amount))
});

export const TransactionsTable = withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)
  (TransactionsTableContainer)
);
