import { SCORE_VALUE } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE_VALUE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertion,
    };

  default:
    return state;
  }
};

export default player;
