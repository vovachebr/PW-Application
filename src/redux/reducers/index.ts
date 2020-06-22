import { combineReducers } from 'redux';
import applicationErrors from './applicationErrors';
import user from './user';
import transactions from './transactions';

const main = combineReducers({
  applicationErrors,
  user,
  transactions
})

export default main;
export type RootState = ReturnType<typeof main>;