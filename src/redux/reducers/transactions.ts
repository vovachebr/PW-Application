import { Actions, TransactionsState } from "../../types";

type Action = {
  type: string;
  payload: any;
}

const initialState = {
  isLoadingTransaction: false,
  transactionsList: []
};

export default function(state: TransactionsState = initialState, action: Action) {
  switch (action.type) {
    case Actions.LOADING_COMMIT_TRANSACTION:
      return { ...state, isLoadingTransaction: action.payload };
    case Actions.SET_TRANSACTIONS:
      return { ...state, transactionsList: action.payload };
    case Actions.PUSH_TRANSACTION:
      return { ...state, transactionsList: state.transactionsList.concat(action.payload) };
    default:
      return state;
  }
}