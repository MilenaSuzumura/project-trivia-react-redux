import { NEW_PLAYER, FIRST_RESPONSE_API, SCORE_COUNT, ASSERTION_COUNT } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_PLAYER:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
      name: action.name,
    };
  case FIRST_RESPONSE_API:
    return {
      ...state,
      token: state.token,
    };
  case SCORE_COUNT:
    return {
      ...state,
      score: state.score + action.score,
    };
  case ASSERTION_COUNT:
    return {
      ...state,
      assertions: state.assertions + parseFloat(action.assertions),
    };
  default:
    return state;
  }
};

export default player;
