import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect, Link } from 'react-router-dom';

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
    const { nome, email, score, assertions } = this.props;
    const { redirect } = this.state;
    const hash = md5(email).toString();
    const three = 3;
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            data-testid="header-profile-picture"
            alt={ nome }
          />
          <h2 data-testid="header-player-name">{ nome }</h2>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        <div>
          {
            assertions < three ? (
              <p data-testid="feedback-text">Could be better...</p>
            )
              : <p data-testid="feedback-text">Well Done!</p>
          }
          {redirect ? <Redirect to="/" /> : ''}
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgain }
          >
            Play Again
          </button>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
          <div>
            <p data-testid="feedback-total-score">{score}</p>
            <p data-testid="feedback-total-question">{assertions}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  nome: store.player.name,
  email: store.player.gravatarEmail,
  score: store.player.score,
  assertions: store.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  user: PropTypes.func,
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
