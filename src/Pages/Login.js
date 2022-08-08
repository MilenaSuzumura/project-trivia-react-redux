import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import newUser from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nome: '',
      disabled: true,
      redirect: false,
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

  handleLogin = () => {
    const { email } = this.state;
    const { saveEmail } = this.props;
    this.setState({
      // redirect: true,
    });
    saveEmail(email);
  }

  pageSettings = () => {
    /* const { history } = this.props;
    history.push('/configuracoes'); */
    this.setState({ redirect: true });
    // <Redirect to="/configuracoes" />
  }

  render() {
    const { email, nome, disabled, redirect } = this.state;
    return (
      <div>
        {redirect ? <Redirect to="/configuracoes" /> : ''}
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
  saveUser: (email, nome) => { dispatch(newUser(email, nome)); },
});

Login.propTypes = {
  saveUser: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
