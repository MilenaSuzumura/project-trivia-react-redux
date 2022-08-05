const INITIAL_STATE = {
  email: '',
  nome: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'NEW_USER':
    return {
      email: action.state.email,
      nome: action.state.nome,
    };
  default:
    return state;
  }
};

export default user;
