import { TransactionType } from ".";

export type ApplicationErrorState = {
  message?: {
    value: string;
    type: string;
  };
}

export type UserState = {
  userInfo?: {
    id: number;
    name: string;
    email: string;
    balance: number;
  };
  isLoadingUsersList: boolean;
  users: Array<{id: number, name: string}>
}

export type TransactionsState = {
  isLoadingTransaction: boolean;
  transactionsList: Array<TransactionType>
}