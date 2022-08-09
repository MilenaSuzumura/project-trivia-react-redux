import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  handlePlayAgain = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { nome, email } = this.props;
    const { redirect } = this.state;
    const hash = md5(email).toString();
    const three = 3;
    const acerto = 3;
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            data-testid="header-profile-picture"
            alt={ nome }
          />
          <h2 data-testid="header-player-name">{ nome }</h2>
          <h3 data-testid="header-score">0</h3>
        </header>
        <div>
          <p data-testid="feedback-text">
            {acerto < three ? 'Could be better...' : 'Well Done!' }
          </p>
          {redirect ? <Redirect to="/" /> : ''}
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgain }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  nome: store.user.nome,
  email: store.user.email,
});
Feedback.propTypes = {
  user: PropTypes.func,
  email: PropTypes.string.isRequired,
}.isRequired;
export default connect(mapStateToProps, null)(Feedback);
