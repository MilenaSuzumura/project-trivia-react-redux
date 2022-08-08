import { NEW_USER, FIRST_RESPONSE_API } from '../actions';

const INITIAL_STATE = {
  email: '',
  nome: '',
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_USER:
    return {
      email: action.state.email,
      nome: action.state.nome,
    };
  case FIRST_RESPONSE_API:
    return {
      ...state,
      token: state.token,
    };
  default:
    return state;
  }
};

export default user;
