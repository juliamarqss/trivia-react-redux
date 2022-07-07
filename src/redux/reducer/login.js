import { ADD_USER, SAVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  username: '',
  email: '',
};

const getUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      username: action.username,
      email: action.email,
    };

  case SAVE_TOKEN:
    return {
      ...state,
      token: action.token,
    };

  default:
    return state;
  }
};

export default getUser;
