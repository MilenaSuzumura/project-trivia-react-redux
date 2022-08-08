import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newUser, fetchFirstAPI } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nome: '',
      disabled: true,
      token: '',
      // redirect: false,
    };
  }

  handleDisebled = () => {
    const { email, nome } = this.state;
    if (nome.length > 1 && email.length > 1) {
      return false;
    }
    return true;
    // if (
    //   !email.length
    //   || !email.includes('@')
    //   || !email.includes('.')
    //   || email.indexOf('.') === email.length - 1
    // ) {
    //   return true;
    // }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.setState(({
      disabled: this.handleDisebled(),
    }));
  }

  handleLogin = async () => {
    const { saveToken, history } = this.props;
    const callingAPI = await saveToken();
    localStorage.setItem('token', callingAPI.token);
    history.push('/game');
  }

  render() {
    const { email, nome, disabled, token } = this.state;
    return (
      <div>
        {/* {redirect ? <Redirect to="/carteira" /> : ''} */}
        <h1>Login</h1>
        <div className="input-container">
          <div>
            <label htmlFor="input-gravatar-email">
              E-mail:
              {' '}
              <input
                type="email"
                id="input-gravatar-email"
                data-testid="input-gravatar-email"
                value={ email }
                name="email"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="input-player-name">
              Nome:
              {' '}
              <input
                type="name"
                id="input-player-name"
                data-testid="input-player-name"
                value={ nome }
                name="nome"
                required
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <button
            type="button"
            token={ token }
            disabled={ disabled }
            onClick={ this.handleLogin }
            data-testid="btn-play"
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email, nome) => dispatch(newUser(email, nome)),
  saveToken: () => dispatch(fetchFirstAPI()),
});

Login.propTypes = {
  saveUser: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
