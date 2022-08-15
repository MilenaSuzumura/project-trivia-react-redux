import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../CSS/Header.css';
import '../CSS/Feedback.css';
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
      <main>
        <header>
          <div className="info-container">
            <h2 data-testid="header-player-name">{ nome }</h2>
            <h3 data-testid="header-score">{ score }</h3>
          </div>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            data-testid="header-profile-picture"
            alt={ nome }
          />
        </header>
        <div className="feedback-container">
          {
            assertions < three ? (
              <div>
                <p data-testid="feedback-text">Could be better...</p>
                <img src="https://memegenerator.net/img/instances/58442870/what-if-it-could-be-better.jpg" alt="Could be better..." className="feedback-img" />
              </div>
            )
              : (
                <div>
                  <p data-testid="feedback-text">Well Done!</p>
                  <img src="https://www.meme-arsenal.com/memes/671bc62c015e1226e82bffe284688099.jpg" alt="Well Done!" className="feedback-img" />
                </div>
              )
          }
          {redirect ? <Redirect to="/" /> : ''}
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgain }
            className="buttonClass"
          >
            Play Again
          </button>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              className="buttonClass"
            >
              Ranking
            </button>
          </Link>
          <div className="final-info">
            <p data-testid="feedback-total-score">
              Pontuaçã:
              {' '}
              {score}
            </p>
            <p data-testid="feedback-total-question">
              Acertos:
              {' '}
              {assertions}
            </p>
          </div>
        </div>
      </main>
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
