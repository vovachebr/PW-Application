import { createSelector } from 'reselect';
import { RootState } from '../reducers';

const applicationErrors = (state: RootState) => state.applicationErrors;

export const applicationMessageSelector = createSelector(
  applicationErrors,
  (errorsState) => errorsState.message
)