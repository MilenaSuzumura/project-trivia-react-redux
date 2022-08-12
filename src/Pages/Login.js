import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { newPlayer, fetchFirstAPI } from '../redux/actions';
// import trivia from '../trivia.png';
import '../CSS/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nome: '',
      disabled: true,
      token: '',
      redirect: false,
    };
  }

  handleDisabled = () => {
    const { email, nome } = this.state;
    if (nome.length > 1 && email.length > 1) {
      return false;
    }
    return true;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.setState(({
      disabled: this.handleDisabled(),
    })));
  }

  handleLogin = async () => {
    const { saveUser } = this.props;
    const { email, nome } = this.state;
    saveUser(email, nome);
    this.fecthAPI();
  }

  fecthAPI = async () => {
    const { saveToken, history } = this.props;
    const callingAPI = await saveToken();
    localStorage.setItem('token', callingAPI.token);
    history.push('/game');
  }

  pageSettings = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { email, nome, disabled, redirect, token } = this.state;
    return (
      <div className="login-page">
        {redirect ? <Redirect to="/configuracoes" /> : ''}
        {/* <div className="logo-container">
          <img src={ trivia } alt="logo" className="logo-image" />
        </div> */}
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
                type="text"
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
          <div>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.pageSettings }
            >
              Configurações
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (gravatarEmail, name) => dispatch(newPlayer(gravatarEmail, name)),
  saveToken: () => dispatch(fetchFirstAPI()),
});

Login.propTypes = {
  saveUser: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
