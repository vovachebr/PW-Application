import { Actions, ApplicationErrorState } from "../../types";

type Action = {
  type: string;
  payload: {
    value: string;
    type: string;
  };
}

export default function(state: ApplicationErrorState = {}, action: Action) {
  switch (action.type) {
    case Actions.APPLICATION_HTTP_MESSAGE:
      return { message: action.payload };
    case Actions.REMOVE_APPLICATION_MESSAGE:
        return {};
    default:
      return state;
  }
}