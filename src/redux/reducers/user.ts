import { Actions, UserState } from "../../types";

type Action = {
  type: string;
  payload: any;
}

const InitialState = {
  isLoadingUsersList: false,
  users: []
}

export default function(state: UserState = InitialState, action: Action) {
  switch (action.type) {
    case Actions.SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case Actions.UPDATE_BALANCE:
      return { ...state, userInfo: {...state.userInfo, balance: action.payload} };
    case Actions.LOADING_USERS:
      return { ...state, isLoadingUsersList: action.payload };
    case Actions.LOADED_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}