import React, { useState, Dispatch } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { MoneyTransferForm as MoneyTransferFormView } from '../views';
import { userListFetch } from '../redux/actions';
import { commitTransactionFetch } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { userBalanceSelector, usersListSelector, isLoadingUsersListSelector } from '../redux/selectors';
import { isLoadingTransactionsSelector } from '../redux/selectors/transactions';

type MoneyTransferFormType = {
  loadUsers: (filter: string) => void;
  commitTransaction: (name: string, amount: number) => void;
  isLoadingUsersList: boolean;
  isLoadingTransaction: boolean;
  users: Array<{id: number, name: string}>;
  userBalance?: number;
  enqueueSnackbar: any;
}

export function MoneyTransferFormContainer({
  loadUsers,
  commitTransaction,
  isLoadingUsersList,
  isLoadingTransaction,
  users=[],
  userBalance,
  enqueueSnackbar
}: MoneyTransferFormType) {

  let interval: number;
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const onRecipientChange = (value: string) => {
    // используется от многократной отправки запроса
    if(interval){
      clearTimeout(interval);
    }
    if(!!value){
      interval = window.setTimeout(() => loadUsers(value), 500);
      setRecipient(value);
    }
  };
  const onChangeAmount = (value: number) => setAmount(value || 0);
  const onSubmit = () => {
    if(userBalance && userBalance < amount){
      enqueueSnackbar("Not enough money", {variant: "error"});
      return;
    }

    if(amount === 0){
      enqueueSnackbar("Can't transfer zero", {variant: "error"});
      return;
    }

    if(amount < 0){
      enqueueSnackbar("Can't transfer negative amount", {variant: "error"});
      return;
    }

    if(!recipient){
      enqueueSnackbar("Select user for transfer money", {variant: "error"});
      return;
    }

    commitTransaction(recipient, amount);
  }

  return <MoneyTransferFormView
    users={users}
    isLoading={isLoadingUsersList}
    isLoadingTransaction={isLoadingTransaction}
    amountValue={amount}
    recipient={recipient}
    onRecipientChange={onRecipientChange}
    onChangeAmount={onChangeAmount}
    onSubmit={onSubmit}
  />
}

const mapStateToProps = (state: RootState) => ({
  isLoadingUsersList: isLoadingUsersListSelector(state),
  users: usersListSelector(state),
  userBalance: userBalanceSelector(state),
  isLoadingTransaction: isLoadingTransactionsSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loadUsers: (filter: string) => dispatch(userListFetch(filter)),
  commitTransaction: (name: string, amount: number) => dispatch(commitTransactionFetch(name, amount))
});

export const MoneyTransferForm = withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)
  (MoneyTransferFormContainer)
);