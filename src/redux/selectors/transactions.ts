import { createSelector } from 'reselect';
import { RootState } from '../reducers';

const transactionsState = (state: RootState) => state.transactions;

export const transactionsListSelector = createSelector(
  transactionsState,
  (state) => state.transactionsList
)

export const isLoadingTransactionsSelector = createSelector(
  transactionsState,
  (state) => state.isLoadingTransaction
)