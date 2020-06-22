import { Dispatch } from 'react';
import { createAction } from 'redux-actions';
import { Actions, TransactionType } from '../../types';
import { applicationHttpError } from '.';

export const loadingCommitTransaction = createAction<boolean>(Actions.LOADING_COMMIT_TRANSACTION);
export const updateBalance = createAction<boolean>(Actions.UPDATE_BALANCE);
export const setTransactions = createAction<Array<TransactionType>>(Actions.SET_TRANSACTIONS);
export const pushTransaction = createAction<TransactionType>(Actions.PUSH_TRANSACTION);

export const commitTransactionFetch = (name: string, amount: number) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(loadingCommitTransaction(true));
    const response = await fetch('/api/protected/transactions', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({name, amount})
    });
    if(response.ok){
      const result = await response.json();
      dispatch(updateBalance(result.trans_token.balance));
      dispatch(pushTransaction(result.trans_token));
      dispatch(applicationHttpError({value: "Transfered successed", type: "info"}));
    }else{
      const result = await response.text();
      dispatch(applicationHttpError({value: result, type: "error"}));
    }
    dispatch(loadingCommitTransaction(false));
  }
}

export const getTransactionFetch = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(loadingCommitTransaction(true));
    const response = await fetch('/api/protected/transactions', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if(response.ok){
      const result = await response.json();
      dispatch(setTransactions(result.trans_token));
    }else{
      const result = await response.text();
      dispatch(applicationHttpError({value: result, type: "error"}));
    }
    dispatch(loadingCommitTransaction(false));
  }
}
